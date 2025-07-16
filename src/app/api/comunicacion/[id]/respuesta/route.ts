import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const { mensaje, autor = 'ADMIN' } = data;

    if (!mensaje) {
      return NextResponse.json({ ok: false, error: 'Falta el mensaje de respuesta.' }, { status: 400 });
    }

    // Crear la respuesta
    const respuesta = await prisma.respuestaComunicacion.create({
      data: {
        comunicacion_id: params.id,
        autor: autor as any,
        mensaje,
      },
    });

    // Actualizar estado de la comunicación
    await prisma.comunicacion.update({
      where: { id: params.id },
      data: { estado: 'RESPONDIDO' },
    });

    // Obtener la comunicación para acceder al usuario
    const comunicacion = await prisma.comunicacion.findUnique({
      where: { id: params.id },
      include: { usuario: true },
    });

    if (comunicacion && autor === 'ADMIN') {
      // Crear notificación automática profesional de respuesta de soporte
      const titulo = 'Respuesta de soporte';
      const mensajeNotif = 'El equipo de soporte ha respondido a tu mensaje. Revisa tu conversación para ver la respuesta.';
      try {
        const notiExistente = await prisma.notificacion.findFirst({
          where: {
            referencia: params.id,
            tipo: 'RESPUESTA_SOPORTE',
            mensaje: mensajeNotif,
          }
        });
        if (notiExistente) {
          await prisma.notificacion.update({
            where: { id: notiExistente.id },
            data: {
              leida: false,
              creada_en: new Date(),
              titulo,
              mensaje: mensajeNotif
            }
          });
        } else {
          await prisma.notificacion.create({
            data: {
              usuario_id: comunicacion.usuario.id,
              titulo,
              mensaje: mensajeNotif,
              tipo: 'RESPUESTA_SOPORTE',
              referencia: params.id
            }
          });
        }
      } catch (error) {
        console.error('Error al crear notificación:', error);
      }
    }

    return NextResponse.json({ ok: true, respuesta });
  } catch (error) {
    console.error('Error al crear respuesta:', error);
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
} 