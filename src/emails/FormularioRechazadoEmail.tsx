import React from 'react';
import { Section, Text, Heading } from '@react-email/components';
import EmailTemplateBase, { greeting, text, highlightRed, detailsCard, cardTitle, detailText, closing } from './EmailTemplateBase';

interface FormularioRechazadoEmailProps {
  nombre: string;
  apellido: string;
  programa: string;
  tipoFormulario: string;
}

export const FormularioRechazadoEmail: React.FC<FormularioRechazadoEmailProps> = ({
  nombre,
  apellido,
  programa,
  tipoFormulario,
}) => {
  const previewText = `Información sobre su solicitud`;

  return (
    <EmailTemplateBase
      previewText={previewText}
      title="Información sobre su solicitud"
    >
      <Text style={greeting}>
        Estimado/a <strong>{nombre} {apellido}</strong>,
      </Text>
      
      <Text style={text}>
        Después de una cuidadosa revisión de su solicitud, lamentamos informarle que su formulario ha sido <strong style={highlightRed}>RECHAZADO</strong> en esta oportunidad.
      </Text>

      <Text style={text}>
        Queremos agradecerle por su interés en nuestros programas y por el tiempo que dedicó a completar su solicitud. Valoramos mucho su interés en nuestros servicios.
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
        Esta decisión no refleja necesariamente sus capacidades o elegibilidad. Nuestros programas tienen requisitos específicos y consideramos múltiples factores al evaluar cada solicitud.
      </Text>

      <Text style={text}>
        Le recomendamos que explore otras opciones disponibles o considere aplicar a futuras convocatorias que puedan ser de su interés. Nuestros programas se actualizan regularmente.
      </Text>

      <Text style={text}>
        Si tiene alguna pregunta sobre esta decisión o desea retroalimentación específica, puede contactarnos a través de nuestros canales oficiales.
      </Text>

      <Text style={closing}>
        Le deseamos mucho éxito en sus futuras oportunidades.
      </Text>
    </EmailTemplateBase>
  );
};

export default FormularioRechazadoEmail; 