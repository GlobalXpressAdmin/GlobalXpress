import { Resend } from "resend";
import * as React from "react";
import Image from "next/image";

interface PasswordResetEmailProps {
  nombre: string;
  resetUrl: string;
}

const PasswordResetEmail = ({ nombre, resetUrl }: PasswordResetEmailProps) => (
  <div style={{ fontFamily: 'Segoe UI, Arial, sans-serif', background: '#f4f6f8', padding: '40px 0' }}>
    <table width="100%" cellPadding="0" cellSpacing="0" style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 8, boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
      <tbody>
        <tr>
          <td style={{ textAlign: 'center', padding: '32px 0 0 0' }}>
            <Image src="https://globalxpresscol.com/logo_negro.png" alt="GlobalXpress Logo" width={120} height={40} style={{ display: 'block', margin: '0 auto 12px auto' }} />
          </td>
        </tr>
        <tr>
          <td style={{ height: '4px', background: '#1e3a8a', borderRadius: '4px 4px 0 0', padding: 0 }}></td>
        </tr>
        <tr>
          <td style={{ padding: '32px 40px 0 40px', textAlign: 'center' }}>
            <h1 style={{ color: '#1e3a8a', fontSize: 24, margin: 0, fontWeight: 700, letterSpacing: 0.5 }}>Solicitud de restablecimiento de contraseña</h1>
            <Image src="https://cdn-icons-png.flaticon.com/512/2919/2919600.png" alt="Recuperar contraseña" width={48} height={48} style={{ margin: '18px auto 0 auto', display: 'block' }} />
          </td>
        </tr>
        <tr>
          <td style={{ padding: '24px 40px 0 40px', color: '#222', fontSize: 17, lineHeight: 1.6 }}>
            <p>Hola <b>{nombre}</b>,</p>
            <p>
              Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en <b>GlobalXpress</b>.
            </p>
            <p>
              Si no has solicitado este cambio, puedes ignorar este correo. De lo contrario, haz clic en el siguiente botón para crear una nueva contraseña:
            </p>
          </td>
        </tr>
        <tr>
          <td style={{ padding: '28px 40px 0 40px', textAlign: 'center' }}>
            <a href={resetUrl} style={{ background: '#1e3a8a', color: '#fff', textDecoration: 'none', padding: '14px 32px', borderRadius: 6, fontWeight: 600, fontSize: 16, display: 'inline-block', letterSpacing: 1 }}>
              Restablecer contraseña
            </a>
          </td>
        </tr>
        <tr>
          <td style={{ padding: '32px 40px 0 40px', color: '#555', fontSize: 15, textAlign: 'center' }}>
            <p style={{ margin: 0 }}>
              Si el botón no funciona, copia y pega el siguiente enlace en tu navegador:<br />
              <span style={{ color: '#1e3a8a', wordBreak: 'break-all' }}>{resetUrl}</span>
            </p>
          </td>
        </tr>
        <tr>
          <td style={{ background: '#f4f6f8', borderRadius: '0 0 8px 8px', color: '#888', fontSize: 12, textAlign: 'center', padding: '16px 40px 12px 40px' }}>
            <Image src="https://globalxpresscol.com/logo_negro.png" alt="GlobalXpress Logo" width={40} height={40} style={{ display: 'block', margin: '0 auto 8px auto', opacity: 0.7 }} />
            <div>© {new Date().getFullYear()} GlobalXpress Colombia<br />
            <span style={{ opacity: 0.7 }}>Correo automático, no responder.</span></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(email: string, nombre: string, resetUrl: string) {
  await resend.emails.send({
    from: "GlobalXpress <no-reply@globalxpresscol.com>",
    to: email,
    subject: "Restablece tu contraseña en GlobalXpress",
    react: PasswordResetEmail({ nombre, resetUrl }),
  });
} 