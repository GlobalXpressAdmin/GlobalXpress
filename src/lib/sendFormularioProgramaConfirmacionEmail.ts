import { Resend } from "resend";
import { FormularioProgramaConfirmacionEmail } from '../emails/FormularioProgramaConfirmacionEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    await resend.emails.send({
      from: "GlobalXpress <no-reply@globalxpresscol.com>",
      to: to,
      subject: `¡Solicitud Recibida - ${getProgramaLabel(programa)}`,
      react: FormularioProgramaConfirmacionEmail({
        nombre,
        apellido,
        programa,
        visa,
        fechaEnvio
      }),
    });

    return { success: true };
  } catch (error) {
    console.error('Error enviando email de confirmación de formulario:', error);
    return { success: false, error };
  }
} 