import React from 'react';
import { Section, Text, Heading } from '@react-email/components';
import EmailTemplateBase, { greeting, text, highlightOrange, detailsCard, stepsCard, cardTitle, detailText, stepText, closing } from './EmailTemplateBase';

interface PostulacionEnProcesoEmailProps {
  nombre: string;
  apellido: string;
  empresa: string;
  cargo: string;
  programa: string;
}

export const PostulacionEnProcesoEmail: React.FC<PostulacionEnProcesoEmailProps> = ({
  nombre,
  apellido,
  empresa,
  cargo,
  programa,
}) => {
  const previewText = `Tu postulación está en proceso`;

  return (
    <EmailTemplateBase
      previewText={previewText}
      title="Postulación en Proceso"
    >
      <Text style={greeting}>
        Estimado/a <strong>{nombre} {apellido}</strong>,
      </Text>
      
      <Text style={text}>
        Le informamos que su postulación se encuentra actualmente en estado <strong style={highlightOrange}>EN PROCESO</strong>.
      </Text>

      <Text style={text}>
        Su aplicación ha superado la fase inicial de revisión y ahora se encuentra en la etapa de procesamiento activo. Nuestro equipo está trabajando en los siguientes pasos de su candidatura.
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

      {/* Próximos Pasos */}
      <Section style={stepsCard}>
        <Heading style={cardTitle}>Próximos pasos en el proceso</Heading>
        <Text style={stepText}>1. Verificación de documentación y antecedentes</Text>
        <Text style={stepText}>2. Evaluación técnica y de competencias</Text>
        <Text style={stepText}>3. Entrevista con el equipo de selección</Text>
        <Text style={stepText}>4. Evaluación final y toma de decisión</Text>
      </Section>

      <Text style={text}>
        Durante esta fase, nuestro equipo puede contactarlo para solicitar información adicional, programar entrevistas o realizar verificaciones necesarias para completar el proceso de selección.
      </Text>

      <Text style={text}>
        Le recomendamos estar atento a las comunicaciones de nuestro equipo y responder oportunamente a cualquier solicitud de información o entrevista.
      </Text>

      <Text style={text}>
        Si tiene alguna pregunta sobre el proceso o necesita información adicional, puede contactarnos a través de nuestros canales oficiales.
      </Text>

      <Text style={closing}>
        Gracias por su interés en <strong>GlobalXpress</strong>.
      </Text>
    </EmailTemplateBase>
  );
};

export default PostulacionEnProcesoEmail; 