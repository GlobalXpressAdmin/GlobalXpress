import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    console.log('🧪 Iniciando prueba de email...');
    console.log('🔑 RESEND_API_KEY presente:', !!process.env.RESEND_API_KEY);

    const data = await req.json();
    const { to } = data;

    if (!to) {
      return NextResponse.json({ error: 'Email requerido' }, { status: 400 });
    }

    console.log('📧 Enviando email de prueba a:', to);

    // Para pruebas, usar la dirección permitida por Resend
    const fromEmail = 'onboarding@resend.dev';
    
    const result = await resend.emails.send({
      from: 'no-reply@globalxpresscol.com',
      to: 'test@example.com',
      subject: 'Prueba de Email - GlobalXpress',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Prueba de Email</h2>
          <p>Este es un email de prueba para verificar que el sistema de envío de emails está funcionando correctamente.</p>
          <p><strong>GlobalXpress</strong></p>
        </div>
      `,
    });

    console.log('✅ Email de prueba enviado exitosamente:', result);

    return NextResponse.json({
      success: true,
      message: 'Email de prueba enviado correctamente',
      result: result
    });

  } catch (error) {
    console.error('❌ Error en prueba de email:', error);
    console.error('❌ Detalles del error:', {
      message: error instanceof Error ? error.message : 'Error desconocido',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'Unknown'
    });

    return NextResponse.json({
      success: false,
      error: 'Error enviando email de prueba',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
} 