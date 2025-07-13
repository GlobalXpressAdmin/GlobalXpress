import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, actual, nueva } = await req.json();
    if (!email || !actual || !nueva) {
      return NextResponse.json({ ok: false, error: 'Todos los campos son obligatorios.' }, { status: 400 });
    }
    // Buscar usuario
    const usuario = await prisma.usuarios_global.findUnique({ where: { email } });
    if (!usuario || !usuario.password) {
      return NextResponse.json({ ok: false, error: 'Usuario no encontrado.' }, { status: 404 });
    }
    // Verificar contraseña actual
    const passwordOk = await bcrypt.compare(actual, usuario.password);
    if (!passwordOk) {
      return NextResponse.json({ ok: false, error: 'La contraseña actual es incorrecta.' }, { status: 401 });
    }
    // Validar nueva contraseña (mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número)
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(nueva)) {
      return NextResponse.json({ ok: false, error: 'La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.' }, { status: 400 });
    }
    // Hashear nueva contraseña
    const hashedPassword = await bcrypt.hash(nueva, 10);
    await prisma.usuarios_global.update({
      where: { email },
      data: { password: hashedPassword },
    });
    return NextResponse.json({ ok: true, msg: 'Contraseña actualizada exitosamente.' });
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
} 