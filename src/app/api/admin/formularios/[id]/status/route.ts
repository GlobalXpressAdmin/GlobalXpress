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

    const formularioActualizado = await prisma.formulario_programa.update({
      where: { id: params.id },
      data: {
        estado: status,
      },
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
      }
    });

    return NextResponse.json({ 
      ok: true, 
      formulario: {
        ...formularioActualizado,
        nombre: `${formularioActualizado.nombre} ${formularioActualizado.apellido}`.trim(),
      }
    });

  } catch (error) {
    console.error('Error updating formulario status:', error);
    return NextResponse.json({ 
      ok: false, 
      error: 'Error interno del servidor' 
    }, { status: 500 });
  }
}