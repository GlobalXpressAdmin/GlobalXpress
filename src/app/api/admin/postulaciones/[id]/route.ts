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

    // Validar que la postulación existe
    const existingPostulacion = await prisma.postulacionTrabajo.findUnique({
      where: { id }
    });

    if (!existingPostulacion) {
      return NextResponse.json({ ok: false, error: 'Postulación no encontrada' }, { status: 404 });
    }

    // Actualizar el estado de la postulación
    const updatedPostulacion = await prisma.postulacionTrabajo.update({
      where: { id },
      data: {
        estado_postulacion: data.estado_postulacion,
        actualizado_en: new Date(),
      },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        empresa: true,
        cargo: true,
        estado_postulacion: true,
        creado_en: true,
      }
    });

    // Crear notificación para el usuario
    await prisma.notificacion.create({
      data: {
        usuario_id: existingPostulacion.usuario_id,
        titulo: 'Estado de Postulación Actualizado',
        mensaje: `Tu postulación para ${existingPostulacion.empresa} ha sido ${data.estado_postulacion.toLowerCase()}.`,
        tipo: 'POSTULACION_ESTADO',
        referencia: id,
      }
    });

    return NextResponse.json({
      ok: true,
      postulacion: updatedPostulacion
    });

  } catch (error) {
    console.error('Error al actualizar postulación:', error);
    return NextResponse.json({ 
      ok: false, 
      error: 'Error interno del servidor' 
    }, { status: 500 });
  }
} 