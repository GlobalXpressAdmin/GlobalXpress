import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const formularios = await prisma.formulario_programa.findMany({
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        programa: true,
        visa: true,
        estado: true,
        fecha_envio: true,
        creado_en: true,
      },
      orderBy: {
        creado_en: 'desc'
      }
    });

    return NextResponse.json({ 
      ok: true, 
      formularios: formularios.map(form => ({
        ...form,
        nombre: `${form.nombre} ${form.apellido}`.trim(),
      }))
    });

  } catch (error) {
    console.error('Error fetching formularios:', error);
    return NextResponse.json({ 
      ok: false, 
      error: 'Error interno del servidor',
      formularios: []
    }, { status: 500 });
  }
}