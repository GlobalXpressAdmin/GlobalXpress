import React from 'react';
import { Section, Text, Heading } from '@react-email/components';
import EmailTemplateBase, { greeting, text, highlightBlue, detailsCard, cardTitle, detailText, closing } from './EmailTemplateBase';

interface FormularioEnRevisionEmailProps {
  nombre: string;
  apellido: string;
  programa: string;
  tipoFormulario: string;
}

export const FormularioEnRevisionEmail: React.FC<FormularioEnRevisionEmailProps> = ({
  nombre,
  apellido,
  programa,
  tipoFormulario,
}) => {
  const previewText = `Tu solicitud está siendo revisada`;

  return (
    <EmailTemplateBase
      previewText={previewText}
      title="Solicitud en Revisión"
    >
      <Text style={greeting}>
        Estimado/a <strong>{nombre} {apellido}</strong>,
      </Text>
      
      <Text style={text}>
        Le informamos que su solicitud se encuentra actualmente en estado <strong style={highlightBlue}>EN REVISIÓN</strong>.
      </Text>

      <Text style={text}>
        Nuestro equipo especializado está evaluando cuidadosamente su información, documentación y elegibilidad para el programa solicitado.
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

      <Text style={text}>
        Durante esta fase de revisión, nuestro equipo evaluará su compatibilidad con los requisitos del programa, verificará la documentación presentada y realizará las validaciones necesarias.
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

export default FormularioEnRevisionEmail; 