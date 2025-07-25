import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { nombre, telefono, nacionalidad, rol } = await req.json();
    
    const usuarioActualizado = await prisma.usuarios_global.update({
      where: { id: params.id },
      data: {
        nombre: nombre || undefined,
        telefono: telefono || undefined,
        nacionalidad: nacionalidad || undefined,
        rol: rol || undefined,
        actualizado_en: new Date(),
      },
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
        rol: true,
      }
    });

    return NextResponse.json({ 
      ok: true, 
      usuario: {
        ...usuarioActualizado,
        fecha_nacimiento: usuarioActualizado.fecha_nacimiento ? usuarioActualizado.fecha_nacimiento.toISOString().split('T')[0] : null,
        rol: usuarioActualizado.rol || 'USER'
      }
    });

  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ 
      ok: false, 
      error: 'Error interno del servidor' 
    }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Primero verificar si el usuario existe
    const usuario = await prisma.usuarios_global.findUnique({
      where: { id: params.id },
      select: { id: true, email: true }
    });

    if (!usuario) {
      return NextResponse.json({ 
        ok: false, 
        error: 'Usuario no encontrado' 
      }, { status: 404 });
    }

    // Eliminar el usuario
    await prisma.usuarios_global.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ 
      ok: true, 
      message: 'Usuario eliminado correctamente' 
    });

  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ 
      ok: false, 
      error: 'Error interno del servidor' 
    }, { status: 500 });
  }
}