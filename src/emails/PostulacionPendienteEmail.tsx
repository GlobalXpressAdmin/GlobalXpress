import React from 'react';
import { Section, Text, Heading } from '@react-email/components';
import EmailTemplateBase, { greeting, text, highlightBlue, detailsCard, cardTitle, detailText, closing } from './EmailTemplateBase';

interface PostulacionPendienteEmailProps {
  nombre: string;
  apellido: string;
  empresa: string;
  cargo: string;
  programa: string;
}

export const PostulacionPendienteEmail: React.FC<PostulacionPendienteEmailProps> = ({
  nombre,
  apellido,
  empresa,
  cargo,
  programa,
}) => {
  const previewText = `Tu postulación está pendiente de revisión`;

  return (
    <EmailTemplateBase
      previewText={previewText}
      title="Postulación Pendiente"
    >
      <Text style={greeting}>
        Estimado/a <strong>{nombre} {apellido}</strong>,
      </Text>
      
      <Text style={text}>
        Le informamos que su postulación se encuentra actualmente en estado <strong style={highlightBlue}>PENDIENTE</strong> de revisión.
      </Text>

      <Text style={text}>
        Nuestro equipo está evaluando cuidadosamente su solicitud junto con todas las demás aplicaciones recibidas. Este proceso puede tomar algunos días hábiles.
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
        Una vez que se complete la revisión inicial, recibirá una notificación con el siguiente paso en el proceso. Le pedimos que tenga paciencia durante este período.
      </Text>

      <Text style={text}>
        Si tiene alguna pregunta sobre el estado de su postulación, puede contactarnos a través de nuestros canales oficiales.
      </Text>

      <Text style={closing}>
        Gracias por su interés en <strong>GlobalXpress</strong>.
      </Text>
    </EmailTemplateBase>
  );
};

export default PostulacionPendienteEmail; 