import { render } from '@react-email/render';
import { FormularioProgramaConfirmacionEmail } from '../emails/FormularioProgramaConfirmacionEmail';

interface SendFormularioProgramaConfirmacionEmailProps {
  to: string;
  nombre: string;
  apellido: string;
  programa: string;
  visa: string;
  fechaEnvio: string;
}

export async function sendFormularioProgramaConfirmacionEmail({
  to,
  nombre,
  apellido,
  programa,
  visa,
  fechaEnvio
}: SendFormularioProgramaConfirmacionEmailProps) {
  try {
    const emailHtml = render(
      FormularioProgramaConfirmacionEmail({
        nombre,
        apellido,
        programa,
        visa,
        fechaEnvio
      })
    );

    const getProgramaLabel = (programa: string) => {
      switch (programa) {
        case 'EB5':
          return 'Visa EB-5';
        case 'E2':
          return 'Visa E-2';
        case 'SKY_MASTERS':
          return 'Sky Masters';
        case 'EB2_NIW':
          return 'Visa EB-2 NIW';
        case 'GLOBAL_ACADEMIC':
          return 'Global Academic';
        case 'DUAL_PLACEMENT':
          return 'Dual Placement';
        default:
          return programa;
      }
    };

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject: `¡Solicitud Recibida - ${getProgramaLabel(programa)}`,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al enviar email');
    }

    return { success: true };
  } catch (error) {
    console.error('Error enviando email de confirmación de formulario:', error);
    return { success: false, error };
  }
} 