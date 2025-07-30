import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/authOptions';
import { prisma } from '@/lib/prisma';

// GET - Obtener una vacante específica
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    // Verificar autenticación y permisos
    if (!session || (session.user?.rol !== 'ADMIN' && session.user?.rol !== 'SUPER_ADMIN')) {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    const { id } = params;

    // Validar UUID
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
    }

    // Obtener la vacante con sus postulaciones
    const vacante = await prisma.vacante.findUnique({
      where: { id },
      include: {
        postulaciones: {
          include: {
            usuario: {
              select: {
                id: true,
                nombre: true,
                email: true,
              }
            }
          },
          orderBy: { creado_en: 'desc' }
        },
        _count: {
          select: { postulaciones: true }
        }
      }
    });

    if (!vacante) {
      return NextResponse.json({ message: 'Vacante no encontrada' }, { status: 404 });
    }

    return NextResponse.json(vacante);
  } catch (error) {
    console.error('Error al obtener vacante:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar vacante completa
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    // Verificar autenticación y permisos
    if (!session || (session.user?.rol !== 'ADMIN' && session.user?.rol !== 'SUPER_ADMIN')) {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { empresa, cargo, salario, descripcion, email, workers, link, activa } = body;

    // Validar UUID
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
    }

    // Validar campos requeridos
    if (!empresa || !cargo) {
      return NextResponse.json(
        { message: 'Empresa y cargo son campos requeridos' },
        { status: 400 }
      );
    }

    // Verificar que la vacante existe
    const existingVacante = await prisma.vacante.findUnique({
      where: { id }
    });

    if (!existingVacante) {
      return NextResponse.json({ message: 'Vacante no encontrada' }, { status: 404 });
    }

    // Actualizar la vacante
    const vacante = await prisma.vacante.update({
      where: { id },
      data: {
        empresa: empresa.trim(),
        cargo: cargo.trim(),
        salario: salario?.trim() || null,
        descripcion: descripcion?.trim() || null,
        email: email?.trim() || null,
        workers: workers?.trim() || null,
        link: link?.trim() || null,
        activa: activa !== undefined ? activa : existingVacante.activa,
        actualizado_en: new Date(),
      },
    });

    return NextResponse.json(vacante);
  } catch (error) {
    console.error('Error al actualizar vacante:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// PATCH - Actualizar parcialmente (principalmente para cambiar estado)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    // Verificar autenticación y permisos
    if (!session || (session.user?.rol !== 'ADMIN' && session.user?.rol !== 'SUPER_ADMIN')) {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();

    // Validar UUID
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
    }

    // Verificar que la vacante existe
    const existingVacante = await prisma.vacante.findUnique({
      where: { id }
    });

    if (!existingVacante) {
      return NextResponse.json({ message: 'Vacante no encontrada' }, { status: 404 });
    }

    // Preparar datos para actualización
    const updateData: any = {
      actualizado_en: new Date(),
    };

    // Solo actualizar campos que se envían
    if (body.empresa !== undefined) updateData.empresa = body.empresa.trim();
    if (body.cargo !== undefined) updateData.cargo = body.cargo.trim();
    if (body.salario !== undefined) updateData.salario = body.salario?.trim() || null;
    if (body.descripcion !== undefined) updateData.descripcion = body.descripcion?.trim() || null;
    if (body.email !== undefined) updateData.email = body.email?.trim() || null;
    if (body.workers !== undefined) updateData.workers = body.workers?.trim() || null;
    if (body.link !== undefined) updateData.link = body.link?.trim() || null;
    if (body.activa !== undefined) updateData.activa = body.activa;

    // Actualizar la vacante
    const vacante = await prisma.vacante.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(vacante);
  } catch (error) {
    console.error('Error al actualizar vacante:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar vacante
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    // Verificar autenticación y permisos
    if (!session || (session.user?.rol !== 'ADMIN' && session.user?.rol !== 'SUPER_ADMIN')) {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    const { id } = params;

    // Validar UUID
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
    }

    // Verificar que la vacante existe
    const existingVacante = await prisma.vacante.findUnique({
      where: { id },
      include: {
        _count: {
          select: { postulaciones: true }
        }
      }
    });

    if (!existingVacante) {
      return NextResponse.json({ message: 'Vacante no encontrada' }, { status: 404 });
    }

    // Verificar si tiene postulaciones asociadas
    if (existingVacante._count.postulaciones > 0) {
      return NextResponse.json(
        { 
          message: 'No se puede eliminar la vacante porque tiene postulaciones asociadas. Considere desactivarla en lugar de eliminarla.' 
        },
        { status: 400 }
      );
    }

    // Eliminar la vacante
    await prisma.vacante.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Vacante eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar vacante:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 