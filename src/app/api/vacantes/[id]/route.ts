import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Obtener una vacante específica por ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const vacante = await prisma.vacante.findUnique({
      where: { id },
      select: {
        id: true,
        empresa: true,
        cargo: true,
        salario: true,
        descripcion: true,
        email: true,
        workers: true,
        link: true,
        creado_en: true,
      }
    });

    if (!vacante) {
      return NextResponse.json(
        { message: 'Vacante no encontrada' },
        { status: 404 }
      );
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