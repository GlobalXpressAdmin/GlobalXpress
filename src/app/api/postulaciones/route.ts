import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const rawData = await req.json() as Record<string, unknown>;

    // Lista de campos según el modelo Prisma
    const campos = [
      'nombre', 'apellido', 'email', 'telefono', 'pais', 'ciudad', 'direccion', 'visa',
      'empresa', 'cargo', 'salario', 'descripcion', 'emailVacante', 'workers', 'link',
      'conoceEEUU', 'trabajoSinAutorizacion', 'antecedentesMigratorios', 'arrestado',
      'saldoMinimo', 'quiereFinanciamiento', 'confirmaRecursos',
      'aceptaTerminos', 'aceptaComunicaciones', 'aceptaDatos',
      'programa', 'estado_postulacion', 'notas_admin', 'usuario_id'
    ];

    // Normalizar: si un campo viene vacío, null o undefined, poner 'FALTA DATO' (excepto programa y estado_postulacion)
    const datos: Record<string, any> = {};
    for (const campo of campos) {
      if (campo === 'programa' || campo === 'estado_postulacion') {
        datos[campo] = rawData[campo] ?? 'FALTA DATO';
      } else if (typeof rawData[campo] === 'boolean') {
        datos[campo] = String(rawData[campo]);
      } else if (rawData[campo] === undefined || rawData[campo] === null || rawData[campo] === '') {
        datos[campo] = 'FALTA DATO';
      } else {
        datos[campo] = rawData[campo];
      }
    }

    // Validar programa
    const programasValidos = ['EB3', 'DUAL_PLACEMENT', 'SKY_MASTERS', 'GLOBAL_ACADEMIC'];
    if (!programasValidos.includes(datos.programa)) {
      return NextResponse.json({ 
        ok: false, 
        error: 'Programa no válido.' 
      }, { status: 400 });
    }

    // Estado por defecto
    if (!datos.estado_postulacion || datos.estado_postulacion === 'FALTA DATO') {
      datos.estado_postulacion = 'PENDIENTE';
    }

    // Buscar usuario_id si hay email
    let usuario_id = null;
    if (datos.email && datos.email !== 'FALTA DATO') {
      const usuarioExistente = await prisma.usuarios_global.findUnique({
        where: { email: datos.email }
      });
      if (usuarioExistente) {
        usuario_id = usuarioExistente.id;
      }
    }
    if (usuario_id) {
      datos.usuario_id = usuario_id;
    }

    // Crear postulación
    const postulacion = await prisma.postulacionTrabajo.create({
      data: {
        nombre: datos.nombre,
        apellido: datos.apellido,
        email: datos.email,
        telefono: datos.telefono,
        pais: datos.pais,
        ciudad: datos.ciudad,
        direccion: datos.direccion,
        visa: datos.visa,
        empresa: datos.empresa,
        cargo: datos.cargo,
        salario: datos.salario,
        descripcion: datos.descripcion,
        emailVacante: datos.emailVacante,
        workers: datos.workers,
        link: datos.link,
        conoceEEUU: datos.conoceEEUU,
        trabajoSinAutorizacion: datos.trabajoSinAutorizacion,
        antecedentesMigratorios: datos.antecedentesMigratorios,
        arrestado: datos.arrestado,
        saldoMinimo: datos.saldoMinimo,
        quiereFinanciamiento: datos.quiereFinanciamiento,
        confirmaRecursos: datos.confirmaRecursos,
        aceptaTerminos: datos.aceptaTerminos,
        aceptaComunicaciones: datos.aceptaComunicaciones,
        aceptaDatos: datos.aceptaDatos,
        programa: datos.programa,
        estado_postulacion: datos.estado_postulacion,
        notas_admin: datos.notas_admin,
        ...(usuario_id && { usuario_id })
      },
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
    console.error('Error en POST /api/postulaciones:', error);
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
    console.error('Error en GET /api/postulaciones:', error);
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
      console.error('Error al crear notificación en PATCH /api/postulaciones:', error);
    }

    return NextResponse.json({ ok: true, postulacion });
  } catch (error) {
    console.error('Error en PATCH /api/postulaciones:', error);
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
} 