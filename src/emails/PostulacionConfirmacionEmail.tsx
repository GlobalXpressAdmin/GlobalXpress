import * as React from "react";

interface PostulacionConfirmacionEmailProps {
  nombre: string;
  apellido: string;
  empresa: string;
  cargo: string;
  salario?: string;
  fechaPostulacion: string;
}

export const PostulacionConfirmacionEmail = ({ 
  nombre, 
  apellido, 
  empresa, 
  cargo, 
  salario, 
  fechaPostulacion 
}: PostulacionConfirmacionEmailProps) => (
  <div style={{ fontFamily: 'Segoe UI, Arial, sans-serif', background: '#f4f6f8', padding: '40px 0' }}>
    <table width="100%" cellPadding="0" cellSpacing="0" style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 8, boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
      <tbody>
        <tr>
          <td style={{ textAlign: 'center', padding: '32px 0 0 0' }}>
            <img src="https://globalxpresscol.com/logo_negro.png" alt="GlobalXpress Logo" width="120" style={{ display: 'block', margin: '0 auto 12px auto' }} />
          </td>
        </tr>
        <tr>
          <td style={{ height: '4px', background: '#1e3a8a', borderRadius: '4px 4px 0 0', padding: 0 }}></td>
        </tr>
        <tr>
          <td style={{ padding: '32px 40px 0 40px', textAlign: 'center' }}>
            <h1 style={{ color: '#1e3a8a', fontSize: 26, margin: 0, fontWeight: 700, letterSpacing: 0.5 }}>¡Postulación Confirmada!</h1>
            <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Confirmación" width="48" style={{ margin: '18px auto 0 auto', display: 'block' }} />
          </td>
        </tr>
        <tr>
          <td style={{ padding: '24px 40px 0 40px', color: '#222', fontSize: 17, lineHeight: 1.6 }}>
            <p>Estimado/a <b>{nombre} {apellido}</b>,</p>
            <p>
              Hemos recibido exitosamente tu postulación para la vacante de <b>{cargo}</b> en <b>{empresa}</b>.
            </p>
            <p>
              Tu solicitud ha sido registrada en nuestro sistema y será revisada por nuestro equipo de reclutamiento en los próximos días.
            </p>
          </td>
        </tr>
        
        {/* Detalles de la postulación */}
        <tr>
          <td style={{ padding: '24px 40px 0 40px' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '20px', margin: '16px 0' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: 18, margin: '0 0 16px 0', fontWeight: 600 }}>Detalles de tu postulación:</h3>
              <table width="100%" cellPadding="8" cellSpacing="0" style={{ fontSize: 15 }}>
                <tr>
                  <td style={{ fontWeight: 600, color: '#374151', width: '40%' }}>Empresa:</td>
                  <td style={{ color: '#6b7280' }}>{empresa}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#374151' }}>Cargo:</td>
                  <td style={{ color: '#6b7280' }}>{cargo}</td>
                </tr>
                {salario && (
                  <tr>
                    <td style={{ fontWeight: 600, color: '#374151' }}>Salario:</td>
                    <td style={{ color: '#6b7280' }}>{salario}</td>
                  </tr>
                )}
                <tr>
                  <td style={{ fontWeight: 600, color: '#374151' }}>Fecha de postulación:</td>
                  <td style={{ color: '#6b7280' }}>{new Date(fechaPostulacion).toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</td>
                </tr>
              </table>
            </div>
          </td>
        </tr>

        <tr>
          <td style={{ padding: '24px 40px 0 40px', color: '#222', fontSize: 17, lineHeight: 1.6 }}>
            <p>
              <b>Próximos pasos:</b>
            </p>
            <ul style={{ margin: '12px 0', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Nuestro equipo revisará tu perfil y experiencia</li>
              <li style={{ marginBottom: '8px' }}>Te contactaremos si tu perfil coincide con la vacante</li>
              <li style={{ marginBottom: '8px' }}>Puedes revisar el estado de tu postulación en tu área personal</li>
            </ul>
          </td>
        </tr>

        <tr>
          <td style={{ padding: '28px 40px 0 40px', textAlign: 'center' }}>
            <a href="https://globalxpresscol.com/area-personal/postulaciones" style={{ background: '#1e3a8a', color: '#fff', textDecoration: 'none', padding: '14px 32px', borderRadius: 6, fontWeight: 600, fontSize: 16, display: 'inline-block', letterSpacing: 1 }}>
              Ver mis postulaciones
            </a>
          </td>
        </tr>
        
        <tr>
          <td style={{ padding: '32px 40px 0 40px', color: '#555', fontSize: 15, textAlign: 'center' }}>
            <p style={{ margin: 0 }}>
              ¿Tienes preguntas? <a href="mailto:atencion.cliente@globalxpresscol.com" style={{ color: '#1e3a8a', textDecoration: 'underline', fontWeight: 600 }}>atencion.cliente@globalxpresscol.com</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style={{ background: '#f4f6f8', borderRadius: '0 0 8px 8px', color: '#888', fontSize: 12, textAlign: 'center', padding: '16px 40px 12px 40px' }}>
            <img src="https://globalxpresscol.com/logo_negro.png" alt="GlobalXpress Logo" width="40" style={{ display: 'block', margin: '0 auto 8px auto', opacity: 0.7 }} />
            <div>© {new Date().getFullYear()} GlobalXpress Colombia<br />
            <span style={{ opacity: 0.7 }}>Correo automático, no responder.</span></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
); 