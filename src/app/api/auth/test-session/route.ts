import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Obtener todas las cookies para debug
    const cookieHeader = req.headers.get('cookie');
    const cookies = cookieHeader ? cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>) : {};
    
    return NextResponse.json({ 
      ok: true, 
      session: session,
      hasSession: !!session,
      hasUser: !!session?.user,
      hasEmail: !!session?.user?.email,
      cookies: Object.keys(cookies),
      sessionToken: cookies['next-auth.session-token'] || cookies['__Secure-next-auth.session-token'] || 'No encontrado'
    });
  } catch (error) {
    console.error('Error al verificar sesión:', error);
    return NextResponse.json({ 
      ok: false, 
      error: 'Error al verificar sesión',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
} 