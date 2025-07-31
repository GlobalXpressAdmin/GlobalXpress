import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/authOptions';
import { prisma } from '../../../../../lib/prisma';
import { Resend } from 'resend';
import PostulacionAdmitidaEmail from '../../../../../emails/PostulacionAdmitidaEmail';
import PostulacionDenegadaEmail from '../../../../../emails/PostulacionDenegadaEmail';
import PostulacionAprobadaEmail from '../../../../../emails/PostulacionAprobadaEmail';
import PostulacionRechazadaEmail from '../../../../../emails/PostulacionRechazadaEmail';
import PostulacionPendienteEmail from '../../../../../emails/PostulacionPendienteEmail';
import PostulacionEnRevisionEmail from '../../../../../emails/PostulacionEnRevisionEmail';
import PostulacionEnProcesoEmail from '../../../../../emails/PostulacionEnProcesoEmail';
import React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    console.log('🔄 Iniciando actualización de postulación ID:', id);
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ ok: false, error: 'No autenticado' }, { status: 401 });
    }

    // Verificar que el usuario sea admin
    const adminUser = await prisma.usuarios_global.findUnique({
      where: { email: session.user.email },
      select: { rol: true }
    });

    if (adminUser?.rol !== 'ADMIN' && adminUser?.rol !== 'SUPER_ADMIN') {
      return NextResponse.json({ ok: false, error: 'Acceso denegado' }, { status: 403 });
    }

    const data = await req.json();
    console.log('📥 Datos recibidos:', data);
    console.log('🎯 Estado a cambiar:', data.estado_postulacion);

    // Validar que la postulación existe
    const existingPostulacion = await prisma.postulacionTrabajo.findUnique({
      where: { id }
    });

    if (!existingPostulacion) {
      return NextResponse.json({ ok: false, error: 'Postulación no encontrada' }, { status: 404 });
    }

    console.log('📋 Postulación encontrada:', {
      id: existingPostulacion.id,
      nombre: existingPostulacion.nombre,
      email: existingPostulacion.email,
      estado_actual: existingPostulacion.estado_postulacion,
      nuevo_estado: data.estado_postulacion
    });

    // Actualizar el estado de la postulación
    const updatedPostulacion = await prisma.postulacionTrabajo.update({
      where: { id },
      data: {
        estado_postulacion: data.estado_postulacion,
        actualizado_en: new Date(),
      },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        empresa: true,
        cargo: true,
        estado_postulacion: true,
        creado_en: true,
      }
    });

    // Crear notificación para el usuario
    if (existingPostulacion.usuario_id) {
      await prisma.notificacion.create({
        data: {
          usuario_id: existingPostulacion.usuario_id,
          titulo: 'Estado de Postulación Actualizado',
          mensaje: `Tu postulación para ${existingPostulacion.empresa} ha sido ${data.estado_postulacion.toLowerCase()}.`,
          tipo: 'POSTULACION_ESTADO',
          referencia: id,
        }
      });
    }

    // Enviar email según el estado
    try {
      console.log('🔍 Iniciando envío de email para estado:', data.estado_postulacion);
      console.log('📧 Email del usuario:', existingPostulacion.email);
      console.log('🔑 RESEND_API_KEY presente:', !!process.env.RESEND_API_KEY);

      const emailData = {
        nombre: existingPostulacion.nombre,
        apellido: existingPostulacion.apellido,
        empresa: existingPostulacion.empresa,
        cargo: existingPostulacion.cargo,
        programa: existingPostulacion.programa || 'Programa General',
      };

      console.log('📋 Datos del email:', emailData);

      let emailComponent;
      let subject;

      switch (data.estado_postulacion) {
        case 'ADMITIDA':
          emailComponent = React.createElement(PostulacionAdmitidaEmail, emailData);
          subject = '¡Felicitaciones! Tu postulación ha sido admitida';
          console.log('✅ Email ADMITIDA configurado');
          break;
        case 'DENEGADA':
          emailComponent = React.createElement(PostulacionDenegadaEmail, emailData);
          subject = 'Actualización sobre su postulación';
          console.log('✅ Email DENEGADA configurado');
          break;
        case 'APROBADA':
          emailComponent = React.createElement(PostulacionAprobadaEmail, emailData);
          subject = '¡Excelente noticia! Tu postulación ha sido aprobada';
          console.log('✅ Email APROBADA configurado');
          break;
        case 'RECHAZADA':
          emailComponent = React.createElement(PostulacionRechazadaEmail, emailData);
          subject = 'Actualización sobre su postulación';
          console.log('✅ Email RECHAZADA configurado');
          break;
        case 'PENDIENTE':
          emailComponent = React.createElement(PostulacionPendienteEmail, emailData);
          subject = 'Tu postulación está pendiente de revisión';
          console.log('✅ Email PENDIENTE configurado');
          break;
        case 'EN_REVISION':
          emailComponent = React.createElement(PostulacionEnRevisionEmail, emailData);
          subject = 'Tu postulación está en revisión';
          console.log('✅ Email EN_REVISION configurado');
          break;
        case 'EN_PROCESO':
          emailComponent = React.createElement(PostulacionEnProcesoEmail, emailData);
          subject = 'Tu postulación está en proceso';
          console.log('✅ Email EN_PROCESO configurado');
          break;
        default:
          console.log('❌ Estado no configurado para email:', data.estado_postulacion);
          break;
      }

      if (emailComponent && process.env.RESEND_API_KEY && subject) {
        console.log('🚀 Enviando email...');
        console.log('📤 From: GlobalXpress <no-reply@globalxpresscol.com>');
        console.log('📥 To:', existingPostulacion.email);
        console.log('📝 Subject:', subject);

        const result = await resend.emails.send({
          from: 'no-reply@globalxpresscol.com',
          to: existingPostulacion.email,
          subject: subject,
          react: emailComponent,
        });

        console.log('✅ Email enviado exitosamente:', result);
      } else {
        console.log('❌ No se envió email porque:');
        console.log('  - emailComponent:', !!emailComponent);
        console.log('  - RESEND_API_KEY:', !!process.env.RESEND_API_KEY);
        console.log('  - subject:', !!subject);
      }
    } catch (emailError) {
      console.error('❌ Error enviando email:', emailError);
      console.error('❌ Detalles del error:', {
        message: emailError instanceof Error ? emailError.message : 'Error desconocido',
        stack: emailError instanceof Error ? emailError.stack : undefined,
        name: emailError instanceof Error ? emailError.name : 'Unknown'
      });
      // No fallar la operación si el email falla
    }

    return NextResponse.json({
      ok: true,
      postulacion: updatedPostulacion
    });

  } catch (error) {
    console.error('Error al actualizar postulación:', error);
    return NextResponse.json({ 
      ok: false, 
      error: 'Error interno del servidor' 
    }, { status: 500 });
  }
} 