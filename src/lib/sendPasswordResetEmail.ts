import * as React from "react";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { PasswordResetEmail } from "../emails/PasswordResetEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(email: string, token: string, nombre: string) {
  const resetUrl = `https://globalxpresscol.com/restablecer-contraseña?token=${token}`;
  const html = await render(React.createElement(PasswordResetEmail, { nombre, resetUrl }));
  await resend.emails.send({
    from: "no-reply@globalxpresscol.com",
    to: email,
    subject: "Restablece tu contraseña en GlobalXpress",
    html,
  });
} 