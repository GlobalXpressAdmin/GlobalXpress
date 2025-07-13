import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Obtener el email de los headers o cookies como fallback
    const cookieHeader = req.headers.get('cookie');
    const cookies = cookieHeader ? cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>) : {};

    // Buscar el token de sesión
    const sessionToken = cookies['next-auth.session-token'] || cookies['__Secure-next-auth.session-token'];
    
    if (!sessionToken) {
      return NextResponse.json({ ok: false, error: 'No hay token de sesión' }, { status: 401 });
    }

    // Por ahora, vamos a obtener todos los usuarios para debug
    const usuarios = await prisma.usuarios_global.findMany({
      select: {
        id: true,
        nombre: true,
        email: true,
        indicativo: true,
        telefono: true,
        nacionalidad: true,
        genero: true,
        fecha_nacimiento: true,
        creado_en: true,
        image: true
      }
    });

    // Si hay usuarios, devolver el primero como prueba
    if (usuarios.length > 0) {
      const usuario = usuarios[0];
      return NextResponse.json({ 
        ok: true, 
        usuario: {
          ...usuario,
          fechaNacimiento: usuario.fecha_nacimiento ? usuario.fecha_nacimiento.toISOString().split('T')[0] : ''
        }
      });
    }

    return NextResponse.json({ ok: false, error: 'No hay usuarios en la tabla' }, { status: 404 });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let { email } = await req.json();
    
    console.log('[API perfil] Email recibido:', email);
    if (!email) {
      return NextResponse.json({ ok: false, error: 'Email requerido' }, { status: 400 });
    }
    email = email.trim().toLowerCase(); // Normaliza el email

    const usuario = await prisma.usuarios_global.findUnique({
      where: { email },
      select: {
        id: true,
        nombre: true,
        email: true,
        indicativo: true,
        telefono: true,
        nacionalidad: true,
        genero: true,
        fecha_nacimiento: true,
        creado_en: true,
        image: true
      }
    });

    console.log('[API perfil] Usuario encontrado:', usuario);

    if (!usuario) {
      // Listar todos los usuarios para debug
      const todosUsuarios = await prisma.usuarios_global.findMany({
        select: { email: true, nombre: true }
      });
      console.log('Email buscado:', email);
      console.log('Usuarios disponibles:', todosUsuarios);
      return NextResponse.json({ 
        ok: false, 
        error: 'Usuario no encontrado',
        debug: {
          emailBuscado: email,
          usuariosDisponibles: todosUsuarios
        }
      }, { status: 404 });
    }

    return NextResponse.json({ 
      ok: true, 
      usuario: {
        ...usuario,
        fechaNacimiento: usuario.fecha_nacimiento ? usuario.fecha_nacimiento.toISOString().split('T')[0] : ''
      }
    });
  } catch (error) {
    console.error('Error al obtener perfil por email:', error);
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    let { email, nombre, indicativo, telefono, nacionalidad, genero, fechaNacimiento, image } = await req.json();
    console.log('PATCH recibido:', { email, indicativo });
    if (!email) {
      return NextResponse.json({ ok: false, error: 'Email requerido' }, { status: 400 });
    }
    email = email.trim().toLowerCase(); // Normaliza el email
    // Lista de indicativos válidos
    const INDICATIVOS_CODES = ['+1','+34','+52','+57','+51','+54','+56','+593','+55','+507'];
    // Limpiar indicativo si viene con texto adicional
    let indicativoLimpio = indicativo;
    if (typeof indicativoLimpio === 'string' && !INDICATIVOS_CODES.includes(indicativoLimpio)) {
      // Extraer solo el código (ej: '+57' de '+57 (Colombia)')
      const match = indicativoLimpio.match(/^\+\d+/);
      if (match) indicativoLimpio = match[0];
    }
    // Validaciones robustas
    if (!nombre || typeof nombre !== 'string' || !nombre.trim()) {
      return NextResponse.json({ ok: false, error: 'El nombre es obligatorio.' }, { status: 400 });
    }
    if (telefono && (!/^[0-9]{6,15}$/.test(telefono))) {
      return NextResponse.json({ ok: false, error: 'El número debe tener solo dígitos y entre 6 y 15 caracteres.' }, { status: 400 });
    }
    if (telefono && (!indicativoLimpio || typeof indicativoLimpio !== 'string' || !INDICATIVOS_CODES.includes(indicativoLimpio))) {
      return NextResponse.json({ ok: false, error: 'Selecciona un indicativo válido.' }, { status: 400 });
    }
    // Actualizar usuario
    const usuarioActualizado = await prisma.usuarios_global.update({
      where: { email },
      data: {
        nombre,
        indicativo: indicativoLimpio,
        telefono,
        nacionalidad,
        genero,
        fecha_nacimiento: fechaNacimiento ? new Date(fechaNacimiento) : undefined,
        image,
        actualizado_en: new Date(),
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        indicativo: true,
        telefono: true,
        nacionalidad: true,
        genero: true,
        fecha_nacimiento: true,
        creado_en: true,
        actualizado_en: true,
        image: true
      }
    });
    return NextResponse.json({ 
      ok: true, 
      usuario: {
        ...usuarioActualizado,
        fechaNacimiento: usuarioActualizado.fecha_nacimiento ? usuarioActualizado.fecha_nacimiento.toISOString().split('T')[0] : ''
      }
    });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
} 