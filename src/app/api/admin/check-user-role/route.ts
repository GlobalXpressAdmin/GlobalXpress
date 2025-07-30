import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: 'Email es requerido' },
        { status: 400 }
      );
    }

    // Buscar el usuario en la base de datos
    const user = await prisma.usuarios_global.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        nombre: true,
        rol: true,
      }
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      rol: user.rol,
    });

  } catch (error) {
    console.error('Error al verificar rol de usuario:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 