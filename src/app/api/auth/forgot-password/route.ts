import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { addHours } from 'date-fns';
import { prisma } from '../../../../lib/prisma';
import { sendPasswordResetEmail } from '../../../../lib/sendPasswordResetEmail';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ ok: false, error: 'Email requerido.' }, { status: 400 });
    }
    const user = await prisma.usuarios_global.findUnique({ where: { email } });
    if (user) {
      // Generar token seguro y expiración
      const token = randomUUID();
      const expiresAt = addHours(new Date(), 1);
      // Eliminar tokens previos
      await prisma.passwordReset.deleteMany({ where: { userId: user.id } });
      // Guardar nuevo token
      await prisma.passwordReset.create({
        data: {
          userId: user.id,
          token,
          expiresAt,
        },
      });
      // Enviar correo con enlace seguro
      const nombre = user.nombre || 'Usuario';
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const resetUrl = `${baseUrl}/ingreso-cliente/restablecer?token=${token}`;
      await sendPasswordResetEmail(email, nombre, resetUrl);
    }
    // Siempre responder éxito para no revelar si el usuario existe
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error en forgot-password:', error);
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
} 