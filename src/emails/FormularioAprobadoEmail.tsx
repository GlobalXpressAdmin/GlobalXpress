import React from 'react';
import { Section, Text, Heading } from '@react-email/components';
import EmailTemplateBase, { greeting, text, highlight, detailsCard, stepsCard, cardTitle, detailText, stepText, closing } from './EmailTemplateBase';

interface FormularioAprobadoEmailProps {
  nombre: string;
  apellido: string;
  programa: string;
  tipoFormulario: string;
}

export const FormularioAprobadoEmail: React.FC<FormularioAprobadoEmailProps> = ({
  nombre,
  apellido,
  programa,
  tipoFormulario,
}) => {
  const previewText = `¡Felicitaciones! Tu solicitud ha sido aprobada`;

  return (
    <EmailTemplateBase
      previewText={previewText}
      title="¡Felicitaciones! 🎉"
    >
      <Text style={greeting}>
        Estimado/a <strong>{nombre} {apellido}</strong>,
      </Text>
      
      <Text style={text}>
        Nos complace informarle que su solicitud ha sido <strong style={highlight}>APROBADA</strong> exitosamente.
      </Text>

      <Text style={text}>
        Este es un momento muy importante en su proceso. Nuestro equipo se pondrá en contacto con usted en los próximos días para coordinar los siguientes pasos.
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
        <Heading style={cardTitle}>Próximos pasos</Heading>
        <Text style={stepText}>1. Recibirá una llamada de nuestro equipo de coordinación</Text>
        <Text style={stepText}>2. Se programará una reunión informativa detallada</Text>
        <Text style={stepText}>3. Se le proporcionará información sobre documentación requerida</Text>
        <Text style={stepText}>4. Se establecerá un cronograma de seguimiento</Text>
        <Text style={stepText}>5. Se iniciará el proceso de implementación</Text>
      </Section>

      <Text style={text}>
        Si tiene alguna pregunta o necesita información adicional, no dude en contactarnos a través de nuestros canales oficiales.
      </Text>

      <Text style={closing}>
        ¡Gracias por confiar en <strong>GlobalXpress</strong> para su desarrollo profesional!
      </Text>
    </EmailTemplateBase>
  );
};

export default FormularioAprobadoEmail; 