import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { sendBienvenidaEmail } from '../../../../lib/sendBienvenidaEmail';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { nombre, email, password, indicativo, telefono, genero, fecha_nacimiento, nacionalidad } = data;
    if (!nombre || !email || !password || !telefono) {
      return NextResponse.json({ ok: false, error: 'Faltan campos obligatorios.' }, { status: 400 });
    }
    // Validar requisitos de contraseña
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      return NextResponse.json({ ok: false, error: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.' }, { status: 400 });
    }
    // Verifica que el email no exista
    const existing = await prisma.usuarios_global.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ ok: false, error: 'El correo ya está registrado.' }, { status: 400 });
    }
    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    // Crea el usuario
    await prisma.usuarios_global.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        indicativo, // Nuevo campo para el indicativo
        telefono,
        genero,
        fecha_nacimiento: fecha_nacimiento ? new Date(fecha_nacimiento) : undefined,
        nacionalidad,
      },
    });
    // Enviar correo de bienvenida
    await sendBienvenidaEmail(email, nombre);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error en registro:', error);
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
} 