import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// GET /api/notificaciones?email=...
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    if (!email) {
      return NextResponse.json({ ok: false, error: 'Falta el parámetro email.' }, { status: 400 });
    }
    const usuario = await prisma.usuarios_global.findUnique({ where: { email } });
    if (!usuario) {
      return NextResponse.json({ ok: true, notificaciones: [] });
    }
    const notificaciones = await prisma.notificacion.findMany({
      where: { usuario_id: usuario.id },
      orderBy: { creada_en: 'desc' },
    });
    return NextResponse.json({ ok: true, notificaciones });
  } catch {
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
}

// POST /api/notificaciones
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { email, titulo, mensaje, tipo, referencia } = data;
    if (!email || !titulo || !mensaje || !tipo) {
      return NextResponse.json({ ok: false, error: 'Faltan campos obligatorios.' }, { status: 400 });
    }
    const usuario = await prisma.usuarios_global.findUnique({ where: { email } });
    if (!usuario) {
      return NextResponse.json({ ok: false, error: 'Usuario no encontrado.' }, { status: 404 });
    }
    const notificacion = await prisma.notificacion.create({
      data: {
        usuario_id: usuario.id,
        titulo,
        mensaje,
        tipo,
        referencia,
      },
    });
    return NextResponse.json({ ok: true, notificacion });
  } catch {
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
}

// PATCH /api/notificaciones (marcar como leída)
export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    const { id } = data;
    if (!id) {
      return NextResponse.json({ ok: false, error: 'Falta el id de la notificación.' }, { status: 400 });
    }
    const notificacion = await prisma.notificacion.update({
      where: { id },
      data: { leida: true },
    });
    return NextResponse.json({ ok: true, notificacion });
  } catch {
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
} 