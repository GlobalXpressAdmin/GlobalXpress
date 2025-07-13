import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';
import { prisma } from '../../../../lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ ok: false, error: 'No autenticado' }, { status: 401 });
    }

    // Obtener los datos actualizados del usuario
    const usuario = await prisma.usuarios_global.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        nombre: true,
        email: true,
        telefono: true,
        nacionalidad: true,
        genero: true,
        fecha_nacimiento: true,
        creado_en: true,
        image: true
      }
    });

    if (!usuario) {
      return NextResponse.json({ ok: false, error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ 
      ok: true, 
      session: {
        user: {
          id: usuario.id,
          email: usuario.email,
          nombre: usuario.nombre
        }
      }
    });
  } catch (error) {
    console.error('Error al actualizar sesión:', error);
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
} 