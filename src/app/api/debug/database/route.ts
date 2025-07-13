import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Verificar conexión a la base de datos
    await prisma.$connect();
    
    // Obtener información de la tabla usuarios_global
    const totalUsuarios = await prisma.usuarios_global.count();
    
    // Obtener algunos usuarios de ejemplo
    const usuarios = await prisma.usuarios_global.findMany({
      take: 5,
      select: {
        id: true,
        email: true,
        nombre: true,
        creado_en: true
      }
    });
    
    // Verificar la estructura de la tabla
    const estructura = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'usuarios_global'
      ORDER BY ordinal_position;
    `;
    
    return NextResponse.json({
      ok: true,
      database: {
        connected: true,
        table: 'usuarios_global',
        totalUsuarios,
        estructura,
        usuarios
      }
    });
  } catch (error) {
    console.error('Error al verificar base de datos:', error);
    return NextResponse.json({
      ok: false,
      error: 'Error al conectar con la base de datos',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 