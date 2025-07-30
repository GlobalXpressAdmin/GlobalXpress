import * as React from "react";

interface FormularioProgramaConfirmacionEmailProps {
  nombre: string;
  apellido: string;
  programa: string;
  visa: string;
  fechaEnvio: string;
}

export const FormularioProgramaConfirmacionEmail = ({ 
  nombre, 
  apellido, 
  programa, 
  visa, 
  fechaEnvio 
}: FormularioProgramaConfirmacionEmailProps) => {
  
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

  const getVisaLabel = (visa: string) => {
    return visa === 'SI' ? 'Sí' : 'No';
  };

  return (
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
              <h1 style={{ color: '#1e3a8a', fontSize: 26, margin: 0, fontWeight: 700, letterSpacing: 0.5 }}>¡Solicitud Recibida!</h1>
              <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Confirmación" width="48" style={{ margin: '18px auto 0 auto', display: 'block' }} />
            </td>
          </tr>
          <tr>
            <td style={{ padding: '24px 40px 0 40px', color: '#222', fontSize: 17, lineHeight: 1.6 }}>
              <p>Estimado/a <b>{nombre} {apellido}</b>,</p>
              <p>
                Hemos recibido exitosamente tu solicitud para el programa <b>{getProgramaLabel(programa)}</b>.
              </p>
              <p>
                Tu información ha sido registrada en nuestro sistema y será revisada por nuestro equipo especializado en los próximos días.
              </p>
            </td>
          </tr>
          
          {/* Detalles de la solicitud */}
          <tr>
            <td style={{ padding: '24px 40px 0 40px' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '20px', margin: '16px 0' }}>
                <h3 style={{ color: '#1e3a8a', fontSize: 18, margin: '0 0 16px 0', fontWeight: 600 }}>Detalles de tu solicitud:</h3>
                <table width="100%" cellPadding="8" cellSpacing="0" style={{ fontSize: 15 }}>
                  <tr>
                    <td style={{ fontWeight: 600, color: '#374151', width: '40%' }}>Programa:</td>
                    <td style={{ color: '#6b7280' }}>{getProgramaLabel(programa)}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: '#374151' }}>¿Tiene visa actual?</td>
                    <td style={{ color: '#6b7280' }}>{getVisaLabel(visa)}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: '#374151' }}>Fecha de solicitud:</td>
                    <td style={{ color: '#6b7280' }}>{new Date(fechaEnvio).toLocaleDateString('es-ES', { 
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
                <li style={{ marginBottom: '8px' }}>Nuestro equipo evaluará tu elegibilidad para el programa</li>
                <li style={{ marginBottom: '8px' }}>Te contactaremos para programar una consulta personalizada</li>
                <li style={{ marginBottom: '8px' }}>Recibirás información detallada sobre el proceso y requisitos</li>
                <li style={{ marginBottom: '8px' }}>Puedes revisar el estado de tu solicitud en tu área personal</li>
              </ul>
            </td>
          </tr>

          <tr>
            <td style={{ padding: '28px 40px 0 40px', textAlign: 'center' }}>
              <a href="https://globalxpresscol.com/area-personal" style={{ background: '#1e3a8a', color: '#fff', textDecoration: 'none', padding: '14px 32px', borderRadius: 6, fontWeight: 600, fontSize: 16, display: 'inline-block', letterSpacing: 1 }}>
                Acceder a mi área personal
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
}; 