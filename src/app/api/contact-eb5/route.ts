export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { nombre, apellido, email, telefono, visa, mensaje, terminos } = data;

  // Configura el transporte de Nodemailer con Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // tu correo
      pass: process.env.EMAIL_PASS, // tu contraseña o app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'formularioscolombo@gmail.com',
    subject: 'Nuevo formulario EB-5',
    text: `
      Nombre: ${nombre} ${apellido}
      Email: ${email}
      Teléfono: ${telefono}
      ¿Dispone de visa?: ${visa}
      Mensaje: ${mensaje}
      Acepta términos: ${terminos ? 'Sí' : 'No'}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'No se pudo enviar el correo.' }, { status: 500 });
  }
} 