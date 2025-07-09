import { Resend } from "resend";
import { BienvenidaEmail } from "../emails/BienvenidaEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBienvenidaEmail(email: string, nombre: string) {
  await resend.emails.send({
    from: "GlobalXpress <no-reply@globalxpresscol.com>", // Ahora usando el dominio verificado
    to: email,
    subject: "¡Bienvenido/a a GlobalXpress!",
    react: BienvenidaEmail({ nombre }),
  });
} 