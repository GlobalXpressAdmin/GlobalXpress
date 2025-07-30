import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/authOptions';
import { prisma } from '../../../../../lib/prisma';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ ok: false, error: 'No autenticado' }, { status: 401 });
    }

    // Verificar que el usuario sea admin
    const adminUser = await prisma.usuarios_global.findUnique({
      where: { email: session.user.email },
      select: { rol: true }
    });

    if (adminUser?.rol !== 'ADMIN' && adminUser?.rol !== 'SUPER_ADMIN') {
      return NextResponse.json({ ok: false, error: 'Acceso denegado' }, { status: 403 });
    }

    const { id } = params;
    const data = await req.json();

    // Validar que el usuario existe
    const existingUser = await prisma.usuarios_global.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return NextResponse.json({ ok: false, error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Actualizar el usuario
    const updatedUser = await prisma.usuarios_global.update({
      where: { id },
      data: {
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono,
        nacionalidad: data.nacionalidad,
        rol: data.rol,
        actualizado_en: new Date(),
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        telefono: true,
        nacionalidad: true,
        rol: true,
        creado_en: true,
      }
    });

    return NextResponse.json({
      ok: true,
      usuario: updatedUser
    });

  } catch (error) {
    console.error('Error al actualizar usuario:', error);
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
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ ok: false, error: 'No autenticado' }, { status: 401 });
    }

    // Verificar que el usuario sea admin
    const adminUser = await prisma.usuarios_global.findUnique({
      where: { email: session.user.email },
      select: { rol: true }
    });

    if (adminUser?.rol !== 'ADMIN' && adminUser?.rol !== 'SUPER_ADMIN') {
      return NextResponse.json({ ok: false, error: 'Acceso denegado' }, { status: 403 });
    }

    const { id } = params;

    // Verificar que el usuario existe
    const existingUser = await prisma.usuarios_global.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return NextResponse.json({ ok: false, error: 'Usuario no encontrado' }, { status: 404 });
    }

    // No permitir eliminar super admins a menos que sea otro super admin
    if (existingUser.rol === 'SUPER_ADMIN' && adminUser.rol !== 'SUPER_ADMIN') {
      return NextResponse.json({ 
        ok: false, 
        error: 'No tienes permisos para eliminar super administradores' 
      }, { status: 403 });
    }

    // Eliminar el usuario y todos sus datos relacionados
    await prisma.$transaction([
      // Eliminar notificaciones
      prisma.notificacion.deleteMany({
        where: { usuario_id: id }
      }),
      // Eliminar comunicaciones
      prisma.comunicacion.deleteMany({
        where: { usuario_id: id }
      }),
      // Eliminar postulaciones
      prisma.postulacionTrabajo.deleteMany({
        where: { usuario_id: id }
      }),
      // Eliminar resets de contraseña
      prisma.passwordReset.deleteMany({
        where: { userId: id }
      }),
      // Finalmente eliminar el usuario
      prisma.usuarios_global.delete({
        where: { id }
      })
    ]);

    return NextResponse.json({
      ok: true,
      message: 'Usuario eliminado correctamente'
    });

  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return NextResponse.json({ 
      ok: false, 
      error: 'Error interno del servidor' 
    }, { status: 500 });
  }
} 