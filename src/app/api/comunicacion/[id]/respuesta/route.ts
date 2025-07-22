// Mejorada: usa 'Request' estándar y validaciones robustas
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

// Cambia 'context: any' por un tipo más específico si es posible, o 'unknown'. Usa 'const' en vez de 'let' si no se reasigna. Elimina variables/imports no usados.

// Restaurar la definición de RolAutorEnum para que el código compile y funcione correctamente.
const getRolAutorEnum = () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports -- Necesario para compatibilidad con Prisma Enum en SSR
    return require('@prisma/client').Prisma?.RolAutor || require('@prisma/client').Prisma?.$Enums?.RolAutor;
  } catch {
    // Fallback manual si no existe
    return { USUARIO: 'USUARIO', ADMIN: 'ADMIN' };
  }
};

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const RolAutorEnum = getRolAutorEnum();
  try {
    if (!id) {
      return NextResponse.json({ ok: false, error: 'Falta el ID de la comunicación.' }, { status: 400 });
    }
    let data: { mensaje?: string; autor?: string };
    try {
      data = await request.json();
    } catch {
      return NextResponse.json({ ok: false, error: 'El cuerpo de la petición no es JSON válido.' }, { status: 400 });
    }
    const { mensaje, autor = 'ADMIN' } = data || {};
    if (!mensaje) {
      return NextResponse.json({ ok: false, error: 'Falta el mensaje de respuesta.' }, { status: 400 });
    }
    // Validar el autor contra el enum de Prisma o fallback
    const autorValido = Object.values(RolAutorEnum).includes(autor) ? autor : RolAutorEnum.ADMIN;
    // Crear la respuesta
    const respuesta = await prisma.respuestaComunicacion.create({
      data: {
        comunicacion_id: id,
        autor: autorValido,
        mensaje,
      },
    });
    // Actualizar estado de la comunicación
    await prisma.comunicacion.update({
      where: { id },
      data: { estado: 'RESPONDIDO' },
    });
    // Obtener la comunicación para acceder al usuario
    const comunicacion = await prisma.comunicacion.findUnique({
      where: { id },
      include: { usuario: true },
    });
    if (comunicacion && autorValido === RolAutorEnum.ADMIN) {
      // Crear notificación automática profesional de respuesta de soporte
      const titulo = 'Respuesta de soporte';
      const mensajeNotif = 'El equipo de soporte ha respondido a tu mensaje. Revisa tu conversación para ver la respuesta.';
      try {
        const notiExistente = await prisma.notificacion.findFirst({
          where: {
            referencia: id,
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
              referencia: id
            }
          });
        }
      } catch (error) {
        console.error('Error al crear notificación:', error);
      }
    }
    return NextResponse.json({ ok: true, respuesta }, { status: 200 });
  } catch (error) {
    console.error('Error al crear respuesta:', error);
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
} 