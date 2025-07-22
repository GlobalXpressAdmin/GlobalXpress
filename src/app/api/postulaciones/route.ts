import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// Definir el tipo de entrada esperado según el modelo de Prisma
interface PostulacionInput {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  pais: string;
  ciudad: string;
  direccion: string;
  visa: string;
  empresa: string;
  cargo: string;
  conoceEEUU: string;
  trabajoSinAutorizacion: string;
  antecedentesMigratorios: string;
  arrestado: string;
  saldoMinimo: string;
  quiereFinanciamiento: string;
  confirmaRecursos: string;
  aceptaTerminos: boolean;
  aceptaComunicaciones: boolean;
  aceptaDatos: boolean;
  estado_postulacion: string;
  programa: string;
  salario?: string;
  descripcion?: string;
  emailVacante?: string;
  workers?: string;
  link?: string;
  notas_admin?: string;
  usuario_id?: string;
}

export async function POST(req: NextRequest) {
  try {
    const rawData: unknown = await req.json();
    // Validación manual de los campos requeridos
    function isPostulacionInput(data: unknown): data is PostulacionInput {
      if (typeof data !== 'object' || data === null) return false;
      const d = data as Record<string, unknown>;
      return (
        typeof d.nombre === 'string' &&
        typeof d.apellido === 'string' &&
        typeof d.email === 'string' &&
        typeof d.telefono === 'string' &&
        typeof d.pais === 'string' &&
        typeof d.ciudad === 'string' &&
        typeof d.direccion === 'string' &&
        typeof d.visa === 'string' &&
        typeof d.empresa === 'string' &&
        typeof d.cargo === 'string' &&
        typeof d.conoceEEUU === 'string' &&
        typeof d.trabajoSinAutorizacion === 'string' &&
        typeof d.antecedentesMigratorios === 'string' &&
        typeof d.arrestado === 'string' &&
        typeof d.saldoMinimo === 'string' &&
        typeof d.quiereFinanciamiento === 'string' &&
        typeof d.confirmaRecursos === 'string' &&
        typeof d.aceptaTerminos === 'boolean' &&
        typeof d.aceptaComunicaciones === 'boolean' &&
        typeof d.aceptaDatos === 'boolean' &&
        typeof d.estado_postulacion === 'string' &&
        typeof d.programa === 'string'
      );
    }
    if (!isPostulacionInput(rawData)) {
      return NextResponse.json({ ok: false, error: 'Datos de postulación inválidos o incompletos.' }, { status: 400 });
    }
    const postulacionData = rawData as PostulacionInput;
    
    // Validar que los datos de la vacante estén presentes
    if (!postulacionData.empresa || !postulacionData.cargo) {
      return NextResponse.json({ ok: false, error: 'Faltan datos de la vacante (empresa o cargo).' }, { status: 400 });
    }

    // Verificar si existe un usuario registrado con el mismo email
    let usuario_id = null;
    
    if (postulacionData.email) {
      const usuarioExistente = await prisma.usuarios_global.findUnique({
        where: { email: postulacionData.email }
      });
      
      if (usuarioExistente) {
        usuario_id = usuarioExistente.id;
      }
    }

    // Validación básica de campos obligatorios
    if (!postulacionData.nombre || !postulacionData.apellido || !postulacionData.email || !postulacionData.telefono || !postulacionData.pais || !postulacionData.ciudad || !postulacionData.direccion) {
      return NextResponse.json({ 
        ok: false, 
        error: 'Faltan campos obligatorios.' 
      }, { status: 400 });
    }

    // Validar que los campos booleanos estén presentes
    const camposBooleanos = [
      'aceptaTerminos', 'aceptaComunicaciones', 'aceptaDatos'
    ];

    for (const campo of camposBooleanos) {
      if (typeof ((postulacionData as unknown) as Record<string, unknown>)[campo] === 'undefined') {
        return NextResponse.json({ 
          ok: false, 
          error: `Campo ${campo} es obligatorio.` 
        }, { status: 400 });
      }
    }

    // Validar programa
    const programasValidos = ['EB3', 'DUAL_PLACEMENT', 'SKY_MASTERS', 'GLOBAL_ACADEMIC'];
    if (!programasValidos.includes(postulacionData.programa)) {
      return NextResponse.json({ 
        ok: false, 
        error: 'Programa no válido.' 
      }, { status: 400 });
    }

    // Preparar datos para la base de datos
    const postulacion = await prisma.postulacionTrabajo.create({
      data: {
        nombre: postulacionData.nombre,
        apellido: postulacionData.apellido, // Mapear apellidos -> apellido
        email: postulacionData.email, // Mapear correo -> email
        telefono: postulacionData.telefono,
        pais: postulacionData.pais,
        ciudad: postulacionData.ciudad,
        direccion: postulacionData.direccion,
        visa: postulacionData.visa,
        empresa: postulacionData.empresa,
        cargo: postulacionData.cargo,
        salario: postulacionData.salario,
        descripcion: postulacionData.descripcion,
        emailVacante: postulacionData.emailVacante,
        workers: postulacionData.workers,
        link: postulacionData.link,
        conoceEEUU: postulacionData.conoceEEUU,
        trabajoSinAutorizacion: postulacionData.trabajoSinAutorizacion,
        antecedentesMigratorios: postulacionData.antecedentesMigratorios,
        arrestado: postulacionData.arrestado,
        saldoMinimo: postulacionData.saldoMinimo,
        quiereFinanciamiento: postulacionData.quiereFinanciamiento,
        confirmaRecursos: postulacionData.confirmaRecursos,
        aceptaTerminos: postulacionData.aceptaTerminos,
        aceptaComunicaciones: postulacionData.aceptaComunicaciones,
        aceptaDatos: postulacionData.aceptaDatos,
        programa: postulacionData.programa as string, // Cast seguro
        estado_postulacion: 'PENDIENTE' as const,
        ...(usuario_id && { usuario_id }) // Solo incluir usuario_id si existe
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