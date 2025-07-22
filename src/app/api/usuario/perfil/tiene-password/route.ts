import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ tienePassword: false }, { status: 200 });
    }
    const usuario = await prisma.usuarios_global.findUnique({ where: { email } });
    if (!usuario || !usuario.password) {
      return NextResponse.json({ tienePassword: false }, { status: 200 });
    }
    return NextResponse.json({ tienePassword: true }, { status: 200 });
  } catch {
    return NextResponse.json({ tienePassword: false }, { status: 200 });
  }
} 