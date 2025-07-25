import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/prisma';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json();
    
    if (!status) {
      return NextResponse.json({ 
        ok: false, 
        error: 'Estado requerido' 
      }, { status: 400 });
    }

    const postulacionActualizada = await prisma.postulacion.update({
      where: { id: params.id },
      data: {
        estado_postulacion: status,
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

    return NextResponse.json({ 
      ok: true, 
      postulacion: {
        ...postulacionActualizada,
        nombre: `${postulacionActualizada.nombre} ${postulacionActualizada.apellido}`.trim(),
      }
    });

  } catch (error) {
    console.error('Error updating postulacion status:', error);
    return NextResponse.json({ 
      ok: false, 
      error: 'Error interno del servidor' 
    }, { status: 500 });
  }
}