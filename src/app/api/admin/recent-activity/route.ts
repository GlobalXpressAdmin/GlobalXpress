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

    // Obtener actividad reciente de los últimos 7 días
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Obtener usuarios nuevos
    const usuariosNuevos = await prisma.usuarios_global.findMany({
      where: {
        creado_en: {
          gte: sevenDaysAgo
        }
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        creado_en: true
      },
      orderBy: {
        creado_en: 'desc'
      },
      take: 5
    });

    // Obtener postulaciones recientes
    const postulacionesRecientes = await prisma.postulacionTrabajo.findMany({
      where: {
        creado_en: {
          gte: sevenDaysAgo
        }
      },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        empresa: true,
        estado_postulacion: true,
        creado_en: true
      },
      orderBy: {
        creado_en: 'desc'
      },
      take: 5
    });

    // Obtener formularios recientes
    const formulariosRecientes = await prisma.formularioPrograma.findMany({
      where: {
        fechaEnvio: {
          gte: sevenDaysAgo
        }
      },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        programa: true,
        estado: true,
        fechaEnvio: true
      },
      orderBy: {
        fechaEnvio: 'desc'
      },
      take: 5
    });

    // Obtener comunicaciones recientes
    const comunicacionesRecientes = await prisma.comunicacion.findMany({
      where: {
        creado_en: {
          gte: sevenDaysAgo
        }
      },
      select: {
        id: true,
        asunto: true,
        estado: true,
        creado_en: true,
        usuario: {
          select: {
            nombre: true,
            email: true
          }
        }
      },
      orderBy: {
        creado_en: 'desc'
      },
      take: 5
    });

    // Combinar y ordenar toda la actividad
    const allActivity = [
      ...usuariosNuevos.map(user => ({
        id: user.id,
        tipo: 'USUARIO',
        descripcion: `Nuevo usuario registrado: ${user.nombre || user.email}`,
        fecha: user.creado_en?.toISOString() || '',
        estado: 'NUEVO'
      })),
      ...postulacionesRecientes.map(post => ({
        id: post.id,
        tipo: 'POSTULACION',
        descripcion: `Nueva postulación de ${post.nombre} ${post.apellido} para ${post.empresa}`,
        fecha: post.creado_en?.toISOString() || '',
        estado: post.estado_postulacion || 'PENDIENTE'
      })),
      ...formulariosRecientes.map(form => ({
        id: form.id.toString(),
        tipo: 'FORMULARIO',
        descripcion: `Nuevo formulario de ${form.nombre} ${form.apellido} para programa ${form.programa}`,
        fecha: form.fechaEnvio?.toISOString() || '',
        estado: form.estado || 'RECIBIDO'
      })),
      ...comunicacionesRecientes.map(com => ({
        id: com.id,
        tipo: 'COMUNICACION',
        descripcion: `Nueva comunicación de ${com.usuario.nombre || com.usuario.email}: ${com.asunto}`,
        fecha: com.creado_en?.toISOString() || '',
        estado: com.estado || 'PENDIENTE'
      }))
    ].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, 10);

    return NextResponse.json({
      ok: true,
      activity: allActivity
    });

  } catch (error) {
    console.error('Error al obtener actividad reciente:', error);
    return NextResponse.json({ 
      ok: false, 
      error: 'Error interno del servidor' 
    }, { status: 500 });
  }
} 