import React from 'react';
import { Section, Text, Heading } from '@react-email/components';
import EmailTemplateBase, { greeting, text, highlight, detailsCard, stepsCard, cardTitle, detailText, stepText, closing } from './EmailTemplateBase';

interface PostulacionAdmitidaEmailProps {
  nombre: string;
  apellido: string;
  empresa: string;
  cargo: string;
  programa: string;
}

export const PostulacionAdmitidaEmail: React.FC<PostulacionAdmitidaEmailProps> = ({
  nombre,
  apellido,
  empresa,
  cargo,
  programa,
}) => {
  const previewText = `¡Felicitaciones! Tu postulación ha sido admitida`;

  return (
    <EmailTemplateBase
      previewText={previewText}
      title="¡Felicitaciones! 🎉"
    >
      <Text style={greeting}>
        Estimado/a <strong>{nombre} {apellido}</strong>,
      </Text>
      
      <Text style={text}>
        Nos complace informarle que su postulación ha sido <strong style={highlight}>ADMITIDA</strong> exitosamente.
      </Text>

      <Text style={text}>
        Le informamos que, para continuar con su proceso de selección, deberá remitir en un plazo máximo de tres (3) días hábiles los siguientes documentos:
      </Text>

      {/* Detalles de la Postulación */}
      <Section style={detailsCard}>
        <Heading style={cardTitle}>Detalles de su postulación</Heading>
        <Text style={detailText}>
          <strong>Empresa:</strong> {empresa}
        </Text>
        <Text style={detailText}>
          <strong>Cargo:</strong> {cargo}
        </Text>
        <Text style={detailText}>
          <strong>Programa:</strong> {programa}
        </Text>
      </Section>

      {/* Documentos Requeridos */}
      <Section style={stepsCard}>
        <Heading style={cardTitle}>Documentos requeridos</Heading>
        <Text style={stepText}>1. Fotocopia del pasaporte o documento nacional de identidad.</Text>
        <Text style={stepText}>2. Certificados laborales que acrediten la experiencia relacionada con el cargo o vacante a la que aspira.</Text>
        <Text style={stepText}>3. Formulario de hoja de vida, diligenciado a través de su abogado asignado.</Text>
        <Text style={stepText}>4. Certificado de antecedentes penales o documento equivalente, según la legislación de su país de origen.</Text>
        <Text style={stepText}>5. Comprobante de pago de la tasa de servicio outsourcing de Colombo & Hurd, Immigration Attorneys.</Text>
      </Section>

      <Text style={text}>
        <strong>📧 Todos los documentos deberán ser enviados al correo electrónico:</strong><br />
        <strong style={highlight}>jobs@globalxpresscol.com</strong>
      </Text>

      <Text style={text}>
        Una vez verificados los documentos, le informaremos si han sido aprobados o si es necesario realizar ajustes para continuar con su proceso.
      </Text>

      <Text style={text}>
        Nuestro abogado asignado se pondrá en contacto con usted en los próximos días para coordinar los siguientes pasos y brindarle toda la asistencia necesaria.
      </Text>

      <Text style={closing}>
        ¡Gracias por confiar en <strong>GlobalXpress</strong> para su desarrollo profesional!
      </Text>
    </EmailTemplateBase>
  );
};

export default PostulacionAdmitidaEmail; 