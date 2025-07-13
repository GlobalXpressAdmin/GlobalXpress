import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import path from 'path';
import { writeFile } from 'fs/promises';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = formData.get('email');
    const file = formData.get('file');

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ ok: false, error: 'Email requerido' }, { status: 400 });
    }
    if (!file || typeof file === 'string') {
      return NextResponse.json({ ok: false, error: 'Archivo de imagen requerido' }, { status: 400 });
    }

    // Guardar archivo en /public/profile-images
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split('.').pop();
    const fileName = `${email.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.${ext}`;
    const filePath = path.join(process.cwd(), 'public', 'profile-images', fileName);
    await writeFile(filePath, buffer);

    // URL pública
    const imageUrl = `/profile-images/${fileName}`;

    // Guardar la URL en la base de datos
    await prisma.usuarios_global.update({
      where: { email },
      data: { image: imageUrl }
    });

    return NextResponse.json({ ok: true, imageUrl });
  } catch (error) {
    console.error('Error al subir imagen de perfil:', error);
    return NextResponse.json({ ok: false, error: 'Error interno al subir imagen.' }, { status: 500 });
  }
} 