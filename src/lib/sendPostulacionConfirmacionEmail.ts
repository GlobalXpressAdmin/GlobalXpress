import { Resend } from "resend";
import { PostulacionConfirmacionEmail } from '../emails/PostulacionConfirmacionEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    await resend.emails.send({
      from: "GlobalXpress <no-reply@globalxpresscol.com>",
      to: to,
      subject: `¡Postulación Confirmada - ${empresa}`,
      react: PostulacionConfirmacionEmail({
        nombre,
        apellido,
        empresa,
        cargo,
        salario,
        fechaPostulacion
      }),
    });

    return { success: true };
  } catch (error) {
    console.error('Error enviando email de confirmación de postulación:', error);
    return { success: false, error };
  }
} 