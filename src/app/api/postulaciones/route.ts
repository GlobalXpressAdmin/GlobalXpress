import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Extraer los datos del formulario
    const {
      nombre,
      apellidos, // En el form es "apellidos", en la DB es "apellido"
      correo, // En el form es "correo", en la DB es "email"
      telefono,
      pais,
      ciudad,
      direccion,
      visa,
      conoceEEUU,
      trabajoSinAutorizacion,
      antecedentesMigratorios,
      arrestado,
      saldoMinimo,
      quiereFinanciamiento,
      confirmaRecursos,
      aceptaTerminos,
      aceptaComunicaciones,
      aceptaDatos,
      programa = 'EB3' // Por defecto EB3, pero se puede cambiar
    } = data;

    // Verificar si existe un usuario registrado con el mismo email
    let usuario_id = null;
    
    if (correo) {
      const usuarioExistente = await prisma.usuarios_global.findUnique({
        where: { email: correo }
      });
      
      if (usuarioExistente) {
        usuario_id = usuarioExistente.id;
      }
    }

    // Validación básica de campos obligatorios
    if (!nombre || !apellidos || !correo || !telefono || !pais || !ciudad || !direccion) {
      return NextResponse.json({ 
        ok: false, 
        error: 'Faltan campos obligatorios.' 
      }, { status: 400 });
    }

    // Validar que los campos booleanos estén presentes
    const camposBooleanos = [
      'conoceEEUU', 'trabajoSinAutorizacion', 'antecedentesMigratorios', 
      'arrestado', 'saldoMinimo', 'quiereFinanciamiento', 'confirmaRecursos',
      'aceptaTerminos', 'aceptaComunicaciones', 'aceptaDatos'
    ];

    for (const campo of camposBooleanos) {
      if (data[campo] === undefined) {
        return NextResponse.json({ 
          ok: false, 
          error: `Campo ${campo} es obligatorio.` 
        }, { status: 400 });
      }
    }

    // Validar programa
    const programasValidos = ['EB3', 'DUAL_PLACEMENT', 'SKY_MASTERS', 'GLOBAL_ACADEMIC'];
    if (!programasValidos.includes(programa)) {
      return NextResponse.json({ 
        ok: false, 
        error: 'Programa no válido.' 
      }, { status: 400 });
    }

    // Preparar datos para la base de datos
    const postulacionData = {
      nombre,
      apellido: apellidos, // Mapear apellidos -> apellido
      email: correo, // Mapear correo -> email
      telefono,
      pais,
      ciudad,
      direccion,
      visa,
      conoceEEUU,
      trabajoSinAutorizacion,
      antecedentesMigratorios,
      arrestado,
      saldoMinimo,
      quiereFinanciamiento,
      confirmaRecursos,
      aceptaTerminos,
      aceptaComunicaciones,
      aceptaDatos,
      programa: programa as any, // Cast al enum
      estado_postulacion: 'PENDIENTE' as const,
      ...(usuario_id && { usuario_id }) // Solo incluir usuario_id si existe
    };

    // Guardar en la base de datos
    const postulacion = await prisma.postulacionTrabajo.create({
      data: postulacionData,
    });

    return NextResponse.json({ 
      ok: true, 
      message: 'Postulación enviada correctamente',
      id: postulacion.id,
      usuario_vinculado: !!usuario_id,
      mensaje_usuario: usuario_id 
        ? 'Tu postulación ha sido vinculada a tu cuenta registrada' 
        : 'Tu postulación ha sido enviada como visitante'
    });

  } catch (error) {
    console.error('Error al guardar postulación:', error);
    return NextResponse.json({ 
      ok: false, 
      error: 'Error interno del servidor.' 
    }, { status: 500 });
  }
} 

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    if (!email) {
      return NextResponse.json({ ok: false, error: 'Falta el parámetro email.' }, { status: 400 });
    }
    const postulacion = await prisma.postulacionTrabajo.findFirst({
      where: { email },
      orderBy: { creado_en: 'desc' },
    });
    if (!postulacion) {
      return NextResponse.json({ ok: false, error: 'No se encontró postulación para ese email.' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, postulacion });
  } catch (error) {
    console.error('Error al buscar postulación:', error);
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
} 