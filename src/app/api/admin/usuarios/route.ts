import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import { prisma } from '../../../../lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ ok: false, error: 'No autenticado' }, { status: 401 });
    }

    // Verificar que el usuario sea admin
    const user = await prisma.usuarios_global.findUnique({
      where: { email: session.user.email },
      select: { rol: true }
    });

    if (user?.rol !== 'ADMIN' && user?.rol !== 'SUPER_ADMIN') {
      return NextResponse.json({ ok: false, error: 'Acceso denegado' }, { status: 403 });
    }

    // Obtener todos los usuarios con sus estadísticas
    const usuarios = await prisma.usuarios_global.findMany({
      select: {
        id: true,
        nombre: true,
        email: true,
        telefono: true,
        nacionalidad: true,
        rol: true,
        creado_en: true,
        _count: {
          select: {
            postulaciones: true,
            comunicaciones: true,
          }
        }
      },
      orderBy: {
        creado_en: 'desc'
      }
    });

    // Transformar los datos para incluir las estadísticas
    const usuariosConStats = usuarios.map(usuario => ({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      telefono: usuario.telefono,
      nacionalidad: usuario.nacionalidad,
      rol: usuario.rol,
      creado_en: usuario.creado_en,
      postulaciones: usuario._count.postulaciones,
      comunicaciones: usuario._count.comunicaciones,
    }));

    return NextResponse.json({
      ok: true,
      usuarios: usuariosConStats
    });

  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return NextResponse.json({ 
      ok: false, 
      error: 'Error interno del servidor' 
    }, { status: 500 });
  }
} 