import { render } from '@react-email/render';
import { PostulacionConfirmacionEmail } from '../emails/PostulacionConfirmacionEmail';

interface SendPostulacionConfirmacionEmailProps {
  to: string;
  nombre: string;
  apellido: string;
  empresa: string;
  cargo: string;
  salario?: string;
  fechaPostulacion: string;
}

export async function sendPostulacionConfirmacionEmail({
  to,
  nombre,
  apellido,
  empresa,
  cargo,
  salario,
  fechaPostulacion
}: SendPostulacionConfirmacionEmailProps) {
  try {
    const emailHtml = render(
      PostulacionConfirmacionEmail({
        nombre,
        apellido,
        empresa,
        cargo,
        salario,
        fechaPostulacion
      })
    );

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject: `¡Postulación Confirmada - ${empresa}`,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al enviar email');
    }

    return { success: true };
  } catch (error) {
    console.error('Error enviando email de confirmación de postulación:', error);
    return { success: false, error };
  }
} 