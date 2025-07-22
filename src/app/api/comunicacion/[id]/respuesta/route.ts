// Mejorada: usa 'Request' estándar y validaciones robustas
import { prisma } from '../../../../../lib/prisma';

export async function POST(request: Request, context?: any) {
  const params = context?.params;
  try {
    if (!params?.id) {
      return new Response(JSON.stringify({ ok: false, error: 'Falta el ID de la comunicación.' }), { status: 400 });
    }
    let data;
    try {
      data = await request.json();
    } catch {
      return new Response(JSON.stringify({ ok: false, error: 'El cuerpo de la petición no es JSON válido.' }), { status: 400 });
    }
    const { mensaje, autor = 'ADMIN' } = data || {};
    if (!mensaje) {
      return new Response(JSON.stringify({ ok: false, error: 'Falta el mensaje de respuesta.' }), { status: 400 });
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
    return new Response(JSON.stringify({ ok: true, respuesta }), { status: 200 });
  } catch (error) {
    console.error('Error al crear respuesta:', error);
    return new Response(JSON.stringify({ ok: false, error: 'Error interno del servidor.' }), { status: 500 });
  }
} 