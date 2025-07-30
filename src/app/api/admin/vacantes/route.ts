import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import { prisma } from '@/lib/prisma';

// GET - Obtener todas las vacantes
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Verificar autenticación y permisos
    if (!session || (session.user?.rol !== 'ADMIN' && session.user?.rol !== 'SUPER_ADMIN')) {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    // Obtener parámetros de consulta
    const { searchParams } = new URL(request.url);
    const activa = searchParams.get('activa');
    const search = searchParams.get('search');

    // Construir filtros
           const where: {
             activa?: boolean;
             OR?: Array<{
               empresa?: { contains: string; mode: 'insensitive' };
               cargo?: { contains: string; mode: 'insensitive' };
               descripcion?: { contains: string; mode: 'insensitive' };
             }>;
           } = {};
    
    if (activa !== null) {
      where.activa = activa === 'true';
    }
    
    if (search) {
      where.OR = [
        { empresa: { contains: search, mode: 'insensitive' } },
        { cargo: { contains: search, mode: 'insensitive' } },
        { descripcion: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Obtener vacantes con conteo de postulaciones
    const vacantes = await prisma.vacante.findMany({
      where,
      orderBy: { creado_en: 'desc' },
      include: {
        _count: {
          select: { postulaciones: true }
        }
      }
    });

    return NextResponse.json(vacantes);
  } catch (error) {
    console.error('Error al obtener vacantes:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// POST - Crear nueva vacante
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Verificar autenticación y permisos
    if (!session || (session.user?.rol !== 'ADMIN' && session.user?.rol !== 'SUPER_ADMIN')) {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { empresa, cargo, salario, descripcion, email, workers, link, activa } = body;

    // Validar campos requeridos
    if (!empresa || !cargo) {
      return NextResponse.json(
        { message: 'Empresa y cargo son campos requeridos' },
        { status: 400 }
      );
    }

    // Crear la vacante
    const vacante = await prisma.vacante.create({
      data: {
        empresa: empresa.trim(),
        cargo: cargo.trim(),
        salario: salario?.trim() || null,
        descripcion: descripcion?.trim() || null,
        email: email?.trim() || null,
        workers: workers?.trim() || null,
        link: link?.trim() || null,
        activa: activa !== undefined ? activa : true,
      },
    });

    return NextResponse.json(vacante, { status: 201 });
  } catch (error) {
    console.error('Error al crear vacante:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 