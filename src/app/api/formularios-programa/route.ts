import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PROGRAMAS_VALIDOS = [
  'EB5',
  'E2',
  'SKY_MASTERS',
  'EB2_NIW',
  'GLOBAL_ACADEMIC',
  'DUAL_PLACEMENT',
];

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { nombre, apellido, email, telefono, visa, mensaje, terminos, programa } = data;

    // Validación básica
    if (!nombre || !apellido || !email || !telefono || !visa || !terminos || !programa) {
      return NextResponse.json({ ok: false, error: 'Faltan campos obligatorios.' }, { status: 400 });
    }
    if (visa !== 'SI' && visa !== 'NO') {
      return NextResponse.json({ ok: false, error: 'El campo visa debe ser SI o NO.' }, { status: 400 });
    }
    if (!PROGRAMAS_VALIDOS.includes(programa)) {
      return NextResponse.json({ ok: false, error: 'Programa no válido.' }, { status: 400 });
    }

    // Guardar en la base de datos
    await prisma.formularioPrograma.create({
      data: {
        nombre,
        apellido,
        email,
        telefono,
        visa,
        mensaje,
        terminos,
        programa,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
} 