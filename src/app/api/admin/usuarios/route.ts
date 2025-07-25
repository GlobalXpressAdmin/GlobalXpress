import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const usuarios = await prisma.usuarios_global.findMany({
      select: {
        id: true,
        nombre: true,
        email: true,
        telefono: true,
        nacionalidad: true,
        genero: true,
        fecha_nacimiento: true,
        creado_en: true,
        actualizado_en: true,
        rol: true, // Asumiendo que agregaremos este campo
      },
      orderBy: {
        creado_en: 'desc'
      }
    });

    return NextResponse.json({ 
      ok: true, 
      usuarios: usuarios.map(usuario => ({
        ...usuario,
        fecha_nacimiento: usuario.fecha_nacimiento ? usuario.fecha_nacimiento.toISOString().split('T')[0] : null,
        rol: usuario.rol || 'USER'
      }))
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ 
      ok: false, 
      error: 'Error interno del servidor',
      usuarios: []
    }, { status: 500 });
  }
}