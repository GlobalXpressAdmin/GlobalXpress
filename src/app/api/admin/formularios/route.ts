import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import { prisma } from '@/lib/prisma';

// GET - Obtener todos los formularios de programa
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Verificar autenticación y permisos
    if (!session || (session.user?.rol !== 'ADMIN' && session.user?.rol !== 'SUPER_ADMIN')) {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    // Obtener parámetros de consulta
    const { searchParams } = new URL(request.url);
    const estado = searchParams.get('estado');
    const programa = searchParams.get('programa');
    const search = searchParams.get('search');

    // Construir filtros
    const where: {
      estado?: string;
      programa?: string;
      OR?: Array<{
        nombre?: { contains: string; mode: 'insensitive' };
        apellido?: { contains: string; mode: 'insensitive' };
        email?: { contains: string; mode: 'insensitive' };
        programa?: { contains: string; mode: 'insensitive' };
      }>;
    } = {};
    
    if (estado && estado !== 'todos') {
      where.estado = estado;
    }
    
    if (programa && programa !== 'todos') {
      where.programa = programa;
    }
    
    if (search) {
      where.OR = [
        { nombre: { contains: search, mode: 'insensitive' } },
        { apellido: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { programa: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Obtener formularios
    const formularios = await prisma.formularioPrograma.findMany({
      where,
      orderBy: { fechaEnvio: 'desc' },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        telefono: true,
        visa: true,
        mensaje: true,
        terminos: true,
        programa: true,
        fechaEnvio: true,
        estado: true,
      }
    });

    return NextResponse.json(formularios);
  } catch (error) {
    console.error('Error al obtener formularios:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 