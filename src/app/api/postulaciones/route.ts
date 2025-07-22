import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Extraer los datos del formulario y de la vacante
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
      programa = 'EB3', // Por defecto EB3, pero se puede cambiar
      // Datos de la vacante
      empresa,
      cargo,
      salario,
      descripcion,
      emailVacante,
      workers,
      link
    } = data;

    // Validar que los datos de la vacante estén presentes
    if (!empresa || !cargo) {
      return NextResponse.json({ ok: false, error: 'Faltan datos de la vacante (empresa o cargo).' }, { status: 400 });
    }

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
      empresa,
      cargo,
      salario,
      descripcion,
      emailVacante,
      workers,
      link,
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
      programa: programa as string, // Cast seguro
      estado_postulacion: 'PENDIENTE' as const,
      ...(usuario_id && { usuario_id }) // Solo incluir usuario_id si existe
    };

    // Guardar en la base de datos
    // Elimina usuario_id si es undefined para evitar errores de tipado de Prisma
    if (typeof postulacionData.usuario_id === 'undefined') {
      delete postulacionData.usuario_id;
    }
    // Si hay otros campos opcionales que pueden ser undefined, aplica la misma lógica aquí
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
    // Buscar TODAS las postulaciones del usuario por email
    const postulaciones = await prisma.postulacionTrabajo.findMany({
      where: { email },
      orderBy: { creado_en: 'desc' },
    });
    if (!postulaciones || postulaciones.length === 0) {
      return NextResponse.json({ ok: false, error: 'No se encontró postulación para ese email.' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, postulaciones });
  } catch (error) {
    console.error('Error al buscar postulaciones:', error);
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
}

// PATCH /api/postulaciones - Actualizar estado y crear notificación
export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, estado_postulacion, email } = data;

    if (!id || !estado_postulacion || !email) {
      return NextResponse.json({ ok: false, error: 'Faltan campos obligatorios (id, estado_postulacion, email).' }, { status: 400 });
    }

    // Estados válidos
    const estadosValidos = ['PENDIENTE', 'EN_REVISION', 'APROBADA', 'RECHAZADA', 'EN_PROCESO'];
    if (!estadosValidos.includes(estado_postulacion)) {
      return NextResponse.json({ ok: false, error: 'Estado no válido.' }, { status: 400 });
    }

    // Actualizar la postulación
    const postulacion = await prisma.postulacionTrabajo.update({
      where: { id },
      data: { estado_postulacion },
    });

    // Crear notificación automática profesional
    const mensajesNotificacion = {
      'EN_REVISION': 'Tu postulación está siendo revisada por nuestro equipo.',
      'EN_PROCESO': 'Tu postulación está en proceso de evaluación.',
      'APROBADA': '¡Felicidades! Tu postulación ha sido aprobada. Pronto nos pondremos en contacto contigo para los siguientes pasos.',
      'RECHAZADA': 'Lamentablemente, tu postulación no ha sido aprobada en esta ocasión. Puedes consultar otras vacantes o contactar a soporte para más información.',
      'PENDIENTE': 'Tu postulación ha sido recibida y está pendiente de revisión.'
    };
    const mensaje = mensajesNotificacion[estado_postulacion as keyof typeof mensajesNotificacion] || `El estado de tu postulación ha cambiado a: ${estado_postulacion}`;
    const titulo = `Actualización en tu postulación - ${estado_postulacion}`;

    // Evitar duplicados: si ya existe una notificación POSTULACION_ESTADO para este id y estado, actualizarla; si no, crearla
    try {
      const notiExistente = await prisma.notificacion.findFirst({
        where: {
          referencia: id,
          tipo: 'POSTULACION_ESTADO',
          mensaje,
        }
      });
      if (notiExistente) {
        await prisma.notificacion.update({
          where: { id: notiExistente.id },
          data: {
            leida: false,
            creada_en: new Date(),
            titulo,
            mensaje
          }
        });
      } else {
        // Buscar usuario_id por email
        const usuario = await prisma.usuarios_global.findUnique({ where: { email } });
        if (usuario) {
          await prisma.notificacion.create({
            data: {
              usuario_id: usuario.id,
              titulo,
              mensaje,
              tipo: 'POSTULACION_ESTADO',
              referencia: id
            }
          });
        }
      }
    } catch (error) {
      console.error('Error al crear notificación:', error);
    }

    return NextResponse.json({ ok: true, postulacion });
  } catch (error) {
    console.error('Error al actualizar postulación:', error);
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
} 