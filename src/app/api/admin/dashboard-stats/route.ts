import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Obtener estadísticas básicas
    const [
      totalUsers,
      totalPostulaciones,
      totalFormularios,
      totalMensajes,
      postulacionesRecientes,
      usuariosRecientes
    ] = await Promise.all([
      // Total de usuarios
      prisma.usuarios_global.count(),
      
      // Total de postulaciones
      prisma.postulacion.count(),
      
      // Total de formularios de programa
      prisma.formulario_programa.count(),
      
      // Total de mensajes pendientes
      prisma.comunicacion.count({
        where: {
          estado: 'PENDIENTE'
        }
      }),
      
      // Postulaciones de los últimos 7 días
      prisma.postulacion.count({
        where: {
          creado_en: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      }),
      
      // Usuarios de los últimos 7 días
      prisma.usuarios_global.count({
        where: {
          creado_en: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      })
    ]);

    // Por ahora, las vacantes están en archivo estático
    // En el futuro, esto vendría de la base de datos
    const totalVacantes = 20; // Número aproximado de vacantes en vacantesData.ts

    const stats = {
      totalUsers,
      totalVacantes,
      totalPostulaciones: totalPostulaciones + totalFormularios,
      totalMensajes,
      postulacionesRecientes,
      usuariosRecientes,
    };

    return NextResponse.json({ 
      ok: true, 
      stats 
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ 
      ok: false, 
      error: 'Error interno del servidor',
      stats: {
        totalUsers: 0,
        totalVacantes: 0,
        totalPostulaciones: 0,
        totalMensajes: 0,
        postulacionesRecientes: 0,
        usuariosRecientes: 0,
      }
    }, { status: 500 });
  }
}