import React from 'react';
import { Section, Text, Heading } from '@react-email/components';
import EmailTemplateBase, { greeting, text, highlightBlue, detailsCard, cardTitle, detailText, closing } from './EmailTemplateBase';

interface PostulacionEnRevisionEmailProps {
  nombre: string;
  apellido: string;
  empresa: string;
  cargo: string;
  programa: string;
}

export const PostulacionEnRevisionEmail: React.FC<PostulacionEnRevisionEmailProps> = ({
  nombre,
  apellido,
  empresa,
  cargo,
  programa,
}) => {
  const previewText = `Tu postulación está en revisión`;

  return (
    <EmailTemplateBase
      previewText={previewText}
      title="Postulación en Revisión"
    >
      <Text style={greeting}>
        Estimado/a <strong>{nombre} {apellido}</strong>,
      </Text>
      
      <Text style={text}>
        Le informamos que su postulación se encuentra actualmente en estado <strong style={highlightBlue}>EN REVISIÓN</strong>.
      </Text>

      <Text style={text}>
        Nuestro equipo de reclutamiento está evaluando cuidadosamente su perfil, experiencia y documentación presentada. Este proceso incluye una revisión detallada de todos los aspectos de su aplicación.
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

      <Text style={text}>
        Durante esta fase de revisión, nuestro equipo evaluará su compatibilidad con los requisitos del puesto, su experiencia profesional y su potencial para contribuir al éxito de la empresa.
      </Text>

      <Text style={text}>
        Una vez completada la revisión, recibirá una notificación con el resultado y los siguientes pasos en el proceso. Le pedimos que tenga paciencia durante este período de evaluación.
      </Text>

      <Text style={text}>
        Si tiene alguna pregunta sobre el proceso de revisión, puede contactarnos a través de nuestros canales oficiales.
      </Text>

      <Text style={closing}>
        Gracias por su interés en <strong>GlobalXpress</strong>.
      </Text>
    </EmailTemplateBase>
  );
};

export default PostulacionEnRevisionEmail; 