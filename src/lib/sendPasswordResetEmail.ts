import { Resend } from "resend";
import { PasswordResetEmail } from "../emails/PasswordResetEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(email: string, token: string, nombre: string) {
  const resetUrl = `https://globalxpresscol.com/restablecer-contraseña?token=${token}`;
  await resend.emails.send({
    from: "GlobalXpress <no-reply@globalxpresscol.com>",
    to: email,
    subject: "Restablece tu contraseña en GlobalXpress",
    react: PasswordResetEmail({ nombre, resetUrl }),
  });
} 