import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { to, subject, html } = await req.json();

    if (!to || !subject || !html) {
      return NextResponse.json({ 
        error: 'Faltan campos requeridos: to, subject, html' 
      }, { status: 400 });
    }

    // Configurar el transporter de nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Enviar el email
    const info = await transporter.sendMail({
      from: `"GlobalXpress" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    console.log('Email enviado:', info.messageId);

    return NextResponse.json({ 
      success: true, 
      messageId: info.messageId 
    });

  } catch (error) {
    console.error('Error enviando email:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor al enviar email' 
    }, { status: 500 });
  }
} 