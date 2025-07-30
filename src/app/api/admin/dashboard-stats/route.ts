import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
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

    // Obtener fecha de hoy para calcular usuarios nuevos
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Obtener todas las estadísticas en paralelo
    const [
      totalUsuarios,
      usuariosNuevosHoy,
      totalPostulaciones,
      postulacionesPendientes,
      totalFormularios,
      formulariosPendientes,
      totalComunicaciones,
      comunicacionesPendientes,
      totalVacantes,
      vacantesActivas
    ] = await Promise.all([
      prisma.usuarios_global.count(),
      prisma.usuarios_global.count({
        where: {
          creado_en: {
            gte: today
          }
        }
      }),
      prisma.postulacionTrabajo.count(),
      prisma.postulacionTrabajo.count({
        where: {
          estado_postulacion: 'PENDIENTE'
        }
      }),
      prisma.formularioPrograma.count(),
      prisma.formularioPrograma.count({
        where: {
          estado: 'RECIBIDO'
        }
      }),
      prisma.comunicacion.count(),
      prisma.comunicacion.count({
        where: {
          estado: 'PENDIENTE'
        }
      }),
      prisma.vacante.count(),
      prisma.vacante.count({
        where: {
          activa: true
        }
      })
    ]);

    return NextResponse.json({
      ok: true,
      totalUsuarios,
      usuariosNuevosHoy,
      totalPostulaciones,
      postulacionesPendientes,
      totalFormularios,
      formulariosPendientes,
      totalComunicaciones,
      comunicacionesPendientes,
      totalVacantes,
      vacantesActivas
    });

  } catch (error) {
    console.error('Error al obtener estadísticas del dashboard:', error);
    return NextResponse.json({ 
      ok: false, 
      error: 'Error interno del servidor' 
    }, { status: 500 });
  }
} 