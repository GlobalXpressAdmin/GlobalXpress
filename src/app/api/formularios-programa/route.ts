import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

const PROGRAMAS_VALIDOS = [
  'EB5',
  'E2',
  'SKY_MASTERS',
  'EB2_NIW',
  'GLOBAL_ACADEMIC',
  'DUAL_PLACEMENT',
];

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { nombre, apellido, email, telefono, visa, mensaje, terminos, programa } = data;

    // Validación básica
    if (!nombre || !apellido || !email || !telefono || !visa || !terminos || !programa) {
      return NextResponse.json({ ok: false, error: 'Faltan campos obligatorios.' }, { status: 400 });
    }
    if (visa !== 'SI' && visa !== 'NO') {
      return NextResponse.json({ ok: false, error: 'El campo visa debe ser SI o NO.' }, { status: 400 });
    }
    if (!PROGRAMAS_VALIDOS.includes(programa)) {
      return NextResponse.json({ ok: false, error: 'Programa no válido.' }, { status: 400 });
    }

    // Guardar en la base de datos
    const formulario = await prisma.formularioPrograma.create({
      data: {
        nombre,
        apellido,
        email,
        telefono,
        visa,
        mensaje,
        terminos,
        programa,
      },
    });

    // Crear notificación automática de formulario recibido
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/notificaciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          titulo: 'Solicitud de programa recibida',
          mensaje: `Tu solicitud para el programa ${programa} ha sido recibida exitosamente. Nos pondremos en contacto contigo pronto.`,
          tipo: 'FORMULARIO_PROGRAMA_ESTADO',
          referencia: formulario.id.toString(),
        }),
      });
    } catch {
      // Error al crear notificación
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
}

// PATCH /api/formularios-programa - Actualizar estado y crear notificación
export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, estado, email } = data;

    if (!id || !estado || !email) {
      return NextResponse.json({ ok: false, error: 'Faltan campos obligatorios (id, estado, email).' }, { status: 400 });
    }

    // Estados válidos
    const estadosValidos = ['RECIBIDO', 'EN_REVISION', 'EN_PROCESO', 'APROBADO', 'RECHAZADO', 'FALTAN_DOCUMENTOS', 'CONTACTADO', 'COMPLETADO'];
    if (!estadosValidos.includes(estado)) {
      return NextResponse.json({ ok: false, error: 'Estado no válido.' }, { status: 400 });
    }

    // Actualizar el formulario
    const formulario = await prisma.formularioPrograma.update({
      where: { id: parseInt(id) },
      data: { estado },
    });

    // Crear notificación automática profesional
    const mensajesNotificacion = {
      'EN_REVISION': 'Tu solicitud está siendo revisada por nuestro equipo.',
      'EN_PROCESO': 'Tu solicitud está en proceso de evaluación.',
      'APROBADO': '¡Felicidades! Tu solicitud ha sido aprobada. Pronto nos pondremos en contacto contigo para los siguientes pasos.',
      'RECHAZADO': 'Lamentablemente, tu solicitud no ha sido aprobada en esta ocasión. Puedes consultar otros programas o contactar a soporte para más información.',
      'FALTAN_DOCUMENTOS': 'Se requieren documentos adicionales para continuar con tu solicitud. Por favor, revisa tu correo o tu área personal.',
      'CONTACTADO': 'Un asesor se pondrá en contacto contigo pronto.',
      'COMPLETADO': 'Tu proceso ha sido completado exitosamente. ¡Gracias por confiar en nosotros!'
    };
    const mensaje = mensajesNotificacion[estado as keyof typeof mensajesNotificacion] || `El estado de tu solicitud ha cambiado a: ${estado}`;
    const titulo = `Actualización en tu solicitud - ${estado}`;

    // Evitar duplicados: si ya existe una notificación FORMULARIO_PROGRAMA_ESTADO para este id y estado, actualizarla; si no, crearla
    try {
      const notiExistente = await prisma.notificacion.findFirst({
        where: {
          referencia: id.toString(),
          tipo: 'FORMULARIO_PROGRAMA_ESTADO',
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
              tipo: 'FORMULARIO_PROGRAMA_ESTADO',
              referencia: id.toString()
            }
          });
        }
      }
    } catch {
      // Error al crear notificación
    }

    return NextResponse.json({ ok: true, formulario });
  } catch {
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    if (!email) {
      return NextResponse.json({ ok: false, error: 'Falta el parámetro email.' }, { status: 400 });
    }
    // Buscar todos los formularios de programa/visa del usuario por email
    const formularios = await prisma.formularioPrograma.findMany({
      where: { email },
      orderBy: { fechaEnvio: 'desc' },
    });
    if (!formularios || formularios.length === 0) {
      return NextResponse.json({ ok: true, formularios: [] });
    }
    return NextResponse.json({ ok: true, formularios });
  } catch {
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
} 