import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();
    if (!token || !password) {
      return NextResponse.json({ ok: false, error: 'Token y nueva contraseña requeridos.' }, { status: 400 });
    }
    // Validar requisitos de contraseña
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      return NextResponse.json({ ok: false, error: 'La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.' }, { status: 400 });
    }
    // Buscar el registro de PasswordReset
    const reset = await prisma.passwordReset.findUnique({ where: { token } });
    if (!reset || reset.expiresAt < new Date()) {
      return NextResponse.json({ ok: false, error: 'El enlace de restablecimiento es inválido o ha expirado.' }, { status: 400 });
    }
    // Actualizar la contraseña del usuario (hasheada)
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.usuarios_global.update({
      where: { id: reset.userId },
      data: { password: hashedPassword },
    });
    // Eliminar el registro de PasswordReset
    await prisma.passwordReset.delete({ where: { token } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error en reset-password:', error);
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
} 