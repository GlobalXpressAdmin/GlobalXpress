import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json({ ok: false, error: 'Email requerido' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Buscar usuario en la base de datos
    const usuario = await prisma.usuarios_global.findUnique({
      where: { email: normalizedEmail },
      select: {
        id: true,
        email: true,
        rol: true, // Asumiendo que agregaremos este campo
      }
    });

    if (!usuario) {
      return NextResponse.json({ ok: false, error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Por ahora, consideramos admin a cualquier usuario (para desarrollo)
    // En producción, esto debería verificar el campo 'rol'
    const isAdmin = true; // usuario.rol === 'ADMIN';

    return NextResponse.json({ 
      ok: true, 
      isAdmin,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol || 'USER'
      }
    });

  } catch (error) {
    console.error('Error checking admin role:', error);
    return NextResponse.json({ ok: false, error: 'Error interno del servidor' }, { status: 500 });
  }
}