import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/authOptions';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import FormularioDenegadoEmail from '../../../../../emails/FormularioDenegadoEmail';
import FormularioAprobadoEmail from '../../../../../emails/FormularioAprobadoEmail';
import FormularioRechazadoEmail from '../../../../../emails/FormularioRechazadoEmail';
import FormularioRecibidoEmail from '../../../../../emails/FormularioRecibidoEmail';
import FormularioEnRevisionEmail from '../../../../../emails/FormularioEnRevisionEmail';
import FormularioEnProcesoEmail from '../../../../../emails/FormularioEnProcesoEmail';
import FormularioFaltanDocumentosEmail from '../../../../../emails/FormularioFaltanDocumentosEmail';
import FormularioContactadoEmail from '../../../../../emails/FormularioContactadoEmail';
import FormularioCompletadoEmail from '../../../../../emails/FormularioCompletadoEmail';
import React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

// PUT - Actualizar estado de formulario
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    console.log('🔄 Iniciando actualización de formulario ID:', id);
    
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
    console.log('🎯 Estado a cambiar:', data.estado);

    // Validar que el formulario existe
    const existingFormulario = await prisma.formularioPrograma.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingFormulario) {
      return NextResponse.json({ ok: false, error: 'Formulario no encontrado' }, { status: 404 });
    }

    console.log('📋 Formulario encontrado:', {
      id: existingFormulario.id,
      nombre: existingFormulario.nombre,
      email: existingFormulario.email,
      estado_actual: existingFormulario.estado,
      nuevo_estado: data.estado
    });

    // Actualizar el estado del formulario
    const updatedFormulario = await prisma.formularioPrograma.update({
      where: { id: parseInt(id) },
      data: {
        estado: data.estado,
      },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        programa: true,
        estado: true,
        fechaEnvio: true,
      }
    });

    // Enviar email según el estado
    try {
      console.log('🔍 Iniciando envío de email para formulario estado:', data.estado);
      console.log('📧 Email del usuario:', existingFormulario.email);
      console.log('🔑 RESEND_API_KEY presente:', !!process.env.RESEND_API_KEY);

      const emailData = {
        nombre: existingFormulario.nombre,
        apellido: existingFormulario.apellido,
        programa: existingFormulario.programa,
        tipoFormulario: existingFormulario.visa === 'SI' ? 'Con Visa' : 'Sin Visa',
      };

      console.log('📋 Datos del email:', emailData);

      let emailComponent;
      let subject;

      switch (data.estado) {
        case 'RECIBIDO':
          emailComponent = React.createElement(FormularioRecibidoEmail, emailData);
          subject = 'Tu solicitud ha sido recibida exitosamente';
          console.log('✅ Email RECIBIDO configurado');
          break;
        case 'EN_REVISION':
          emailComponent = React.createElement(FormularioEnRevisionEmail, emailData);
          subject = 'Tu solicitud está siendo revisada';
          console.log('✅ Email EN_REVISION configurado');
          break;
        case 'EN_PROCESO':
          emailComponent = React.createElement(FormularioEnProcesoEmail, emailData);
          subject = 'Tu solicitud está siendo procesada';
          console.log('✅ Email EN_PROCESO configurado');
          break;
        case 'FALTAN_DOCUMENTOS':
          emailComponent = React.createElement(FormularioFaltanDocumentosEmail, emailData);
          subject = 'Necesitamos documentación adicional';
          console.log('✅ Email FALTAN_DOCUMENTOS configurado');
          break;
        case 'CONTACTADO':
          emailComponent = React.createElement(FormularioContactadoEmail, emailData);
          subject = 'Hemos intentado contactarte';
          console.log('✅ Email CONTACTADO configurado');
          break;
        case 'COMPLETADO':
          emailComponent = React.createElement(FormularioCompletadoEmail, emailData);
          subject = '¡Felicitaciones! Tu solicitud ha sido completada';
          console.log('✅ Email COMPLETADO configurado');
          break;
        case 'DENEGADO':
          emailComponent = React.createElement(FormularioDenegadoEmail, emailData);
          subject = 'Actualización sobre su solicitud de programa';
          console.log('✅ Email DENEGADO configurado');
          break;
        case 'APROBADO':
          emailComponent = React.createElement(FormularioAprobadoEmail, emailData);
          subject = '¡Excelente noticia! Su solicitud ha sido aprobada';
          console.log('✅ Email APROBADO configurado');
          break;
        case 'RECHAZADO':
          emailComponent = React.createElement(FormularioRechazadoEmail, emailData);
          subject = 'Actualización sobre su solicitud de programa';
          console.log('✅ Email RECHAZADO configurado');
          break;
        default:
          console.log('❌ Estado no configurado para email:', data.estado);
          break;
      }

      if (emailComponent && process.env.RESEND_API_KEY && subject) {
        console.log('🚀 Enviando email...');
        console.log('📤 From: GlobalXpress <no-reply@globalxpresscol.com>');
        console.log('📥 To:', existingFormulario.email);
        console.log('📝 Subject:', subject);

        const result = await resend.emails.send({
          from: 'no-reply@globalxpresscol.com',
          to: existingFormulario.email,
          subject: subject,
          react: emailComponent,
        });

        console.log('✅ Email enviado exitosamente:', result);
      } else {
        console.log('❌ No se envió email porque:');
        console.log('  - emailComponent:', !!emailComponent);
        console.log('  - RESEND_API_KEY:', !!process.env.RESEND_API_KEY);
        console.log('  - subject:', !!subject);
        console.log('  - estado recibido:', data.estado);
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
      formulario: updatedFormulario
    });

  } catch (error) {
    console.error('Error al actualizar formulario:', error);
    return NextResponse.json({ 
      ok: false, 
      error: 'Error interno del servidor' 
    }, { status: 500 });
  }
} 