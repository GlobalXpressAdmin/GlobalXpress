import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const postulaciones = await prisma.postulacion.findMany({
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        empresa: true,
        cargo: true,
        estado_postulacion: true,
        creado_en: true,
        programa: true,
      },
      orderBy: {
        creado_en: 'desc'
      }
    });

    return NextResponse.json({ 
      ok: true, 
      postulaciones: postulaciones.map(post => ({
        ...post,
        nombre: `${post.nombre} ${post.apellido}`.trim(),
      }))
    });

  } catch (error) {
    console.error('Error fetching postulaciones:', error);
    return NextResponse.json({ 
      ok: false, 
      error: 'Error interno del servidor',
      postulaciones: []
    }, { status: 500 });
  }
}