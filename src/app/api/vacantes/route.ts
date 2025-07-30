import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Obtener vacantes activas para el sitio web público
export async function GET(request: NextRequest) {
  try {
    // Obtener parámetros de consulta
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const search = searchParams.get('search');

    // Construir filtros - solo vacantes activas
               const where: {
             activa: boolean;
             OR?: Array<{
               empresa?: { contains: string; mode: 'insensitive' };
               cargo?: { contains: string; mode: 'insensitive' };
               descripcion?: { contains: string; mode: 'insensitive' };
             }>;
           } = {
      activa: true
    };
    
    if (search) {
      where.OR = [
        { empresa: { contains: search, mode: 'insensitive' } },
        { cargo: { contains: search, mode: 'insensitive' } },
        { descripcion: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Obtener vacantes activas
    const vacantes = await prisma.vacante.findMany({
      where,
      orderBy: { creado_en: 'desc' },
      take: limit ? parseInt(limit) : undefined,
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

    return NextResponse.json(vacantes);
  } catch (error) {
    console.error('Error al obtener vacantes públicas:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 