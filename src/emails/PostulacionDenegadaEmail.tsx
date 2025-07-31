import React from 'react';
import { Section, Text, Heading } from '@react-email/components';
import EmailTemplateBase, { greeting, text, highlightRed, detailsCard, cardTitle, detailText, closing } from './EmailTemplateBase';

interface PostulacionDenegadaEmailProps {
  nombre: string;
  apellido: string;
  empresa: string;
  cargo: string;
  programa: string;
}

export const PostulacionDenegadaEmail: React.FC<PostulacionDenegadaEmailProps> = ({
  nombre,
  apellido,
  empresa,
  cargo,
  programa,
}) => {
  const previewText = `Información sobre su postulación`;

  return (
    <EmailTemplateBase
      previewText={previewText}
      title="Información sobre su postulación"
    >
      <Text style={greeting}>
        Estimado/a <strong>{nombre} {apellido}</strong>,
      </Text>
      
      <Text style={text}>
        Después de una cuidadosa revisión de su postulación, lamentamos informarle que su solicitud ha sido <strong style={highlightRed}>DENEGADA</strong> en esta oportunidad.
      </Text>

      <Text style={text}>
        Queremos agradecerle por su interés en nuestra empresa y por el tiempo que dedicó a completar su postulación. Valoramos mucho su interés en formar parte de nuestro equipo.
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
        Esta decisión no refleja necesariamente sus capacidades o experiencia profesional. Nuestro proceso de selección es muy competitivo y consideramos múltiples factores al evaluar cada candidato.
      </Text>

      <Text style={text}>
        Le recomendamos que continúe explorando otras oportunidades que se ajusten mejor a su perfil profesional. Le invitamos a estar atento a futuras convocatorias que puedan ser de su interés.
      </Text>

      <Text style={text}>
        Si tiene alguna pregunta sobre esta decisión o desea retroalimentación específica, puede contactarnos a través de nuestros canales oficiales.
      </Text>

      <Text style={closing}>
        Le deseamos mucho éxito en sus futuras oportunidades profesionales.
      </Text>
    </EmailTemplateBase>
  );
};

export default PostulacionDenegadaEmail; 