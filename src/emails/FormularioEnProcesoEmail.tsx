import React from 'react';
import { Section, Text, Heading } from '@react-email/components';
import EmailTemplateBase, { greeting, text, highlightOrange, detailsCard, stepsCard, cardTitle, detailText, stepText, closing } from './EmailTemplateBase';

interface FormularioEnProcesoEmailProps {
  nombre: string;
  apellido: string;
  programa: string;
  tipoFormulario: string;
}

export const FormularioEnProcesoEmail: React.FC<FormularioEnProcesoEmailProps> = ({
  nombre,
  apellido,
  programa,
  tipoFormulario,
}) => {
  const previewText = `Tu solicitud está siendo procesada`;

  return (
    <EmailTemplateBase
      previewText={previewText}
      title="Solicitud en Proceso"
    >
      <Text style={greeting}>
        Estimado/a <strong>{nombre} {apellido}</strong>,
      </Text>
      
      <Text style={text}>
        Le informamos que su solicitud se encuentra actualmente en estado <strong style={highlightOrange}>EN PROCESO</strong>.
      </Text>

      <Text style={text}>
        Su aplicación ha superado la fase inicial de revisión y ahora se encuentra en la etapa de procesamiento activo. Nuestro equipo está trabajando en los siguientes pasos de su solicitud.
      </Text>

      {/* Detalles de la Solicitud */}
      <Section style={detailsCard}>
        <Heading style={cardTitle}>Detalles de su solicitud</Heading>
        <Text style={detailText}>
          <strong>Programa:</strong> {programa}
        </Text>
        <Text style={detailText}>
          <strong>Tipo de formulario:</strong> {tipoFormulario}
        </Text>
      </Section>

      {/* Próximos Pasos */}
      <Section style={stepsCard}>
        <Heading style={cardTitle}>Próximos pasos en el proceso</Heading>
        <Text style={stepText}>1. Verificación de documentación y requisitos</Text>
        <Text style={stepText}>2. Evaluación de elegibilidad del programa</Text>
        <Text style={stepText}>3. Coordinación con entidades correspondientes</Text>
        <Text style={stepText}>4. Preparación de documentación final</Text>
      </Section>

      <Text style={text}>
        Durante esta fase, nuestro equipo puede contactarlo para solicitar información adicional, programar reuniones o realizar verificaciones necesarias para completar el proceso.
      </Text>

      <Text style={text}>
        Le recomendamos estar atento a las comunicaciones de nuestro equipo y responder oportunamente a cualquier solicitud de información o documentación.
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

export default FormularioEnProcesoEmail; 