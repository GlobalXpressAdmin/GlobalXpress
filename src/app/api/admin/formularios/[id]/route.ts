import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/authOptions';
import { prisma } from '@/lib/prisma';

// PUT - Actualizar estado de formulario
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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

    const data = await req.json();

    // Validar que el formulario existe
    const existingFormulario = await prisma.formularioPrograma.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingFormulario) {
      return NextResponse.json({ ok: false, error: 'Formulario no encontrado' }, { status: 404 });
    }

    // Actualizar el estado del formulario
    const updatedFormulario = await prisma.formularioPrograma.update({
      where: { id: parseInt(id) },
      data: {
        estado: data.estado,
      },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        programa: true,
        estado: true,
        fechaEnvio: true,
      }
    });

    return NextResponse.json({
      ok: true,
      formulario: updatedFormulario
    });

  } catch (error) {
    console.error('Error al actualizar formulario:', error);
    return NextResponse.json({ 
      ok: false, 
      error: 'Error interno del servidor' 
    }, { status: 500 });
  }
} 