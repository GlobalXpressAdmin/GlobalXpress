import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { validate as validateUUID } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { asunto, mensaje, email } = data;

    // Validación básica
    if (!asunto || !mensaje || !email) {
      return NextResponse.json({ ok: false, error: 'Faltan campos obligatorios.' }, { status: 400 });
    }
    // Buscar usuario por email
    const usuario = await prisma.usuarios_global.findUnique({ where: { email } });
    if (!usuario) {
      return NextResponse.json({ ok: false, error: 'Usuario no encontrado.' }, { status: 404 });
    }
    // Crear la comunicación
    const comunicacion = await prisma.comunicacion.create({
      data: {
        usuario_id: usuario.id,
        asunto,
        mensaje,
        estado: 'PENDIENTE',
      },
    });

    // Crear notificación automática de mensaje enviado
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/notificaciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          titulo: 'Mensaje enviado a soporte',
          mensaje: 'Tu mensaje ha sido enviado exitosamente. El equipo de soporte te responderá pronto.',
          tipo: 'RESPUESTA_SOPORTE',
          referencia: comunicacion.id,
        }),
      });
    } catch (error) {
      console.error('Error al crear notificación:', error);
    }

    return NextResponse.json({ ok: true, message: 'Mensaje enviado correctamente.', comunicacion });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    if (!email) {
      return NextResponse.json({ ok: false, error: 'Falta el parámetro email.' }, { status: 400 });
    }
    // Buscar usuario por email
    const usuario = await prisma.usuarios_global.findUnique({ where: { email } });
    if (!usuario) {
      return NextResponse.json({ ok: true, comunicaciones: [] });
    }
    // Buscar todas las comunicaciones del usuario, con sus respuestas
    const comunicaciones = await prisma.comunicacion.findMany({
      where: { usuario_id: usuario.id },
      orderBy: { creado_en: 'desc' },
      include: {
        respuestas: {
          orderBy: { creado_en: 'asc' },
        },
      },
    });
    return NextResponse.json({ ok: true, comunicaciones });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
} 