import React from 'react';
import { Section, Text, Heading } from '@react-email/components';
import EmailTemplateBase, { greeting, text, highlightBlue, detailsCard, cardTitle, detailText, closing } from './EmailTemplateBase';

interface FormularioRecibidoEmailProps {
  nombre: string;
  apellido: string;
  programa: string;
  tipoFormulario: string;
}

export const FormularioRecibidoEmail: React.FC<FormularioRecibidoEmailProps> = ({
  nombre,
  apellido,
  programa,
  tipoFormulario,
}) => {
  const previewText = `Tu solicitud ha sido recibida exitosamente`;

  return (
    <EmailTemplateBase
      previewText={previewText}
      title="Solicitud Recibida"
    >
      <Text style={greeting}>
        Estimado/a <strong>{nombre} {apellido}</strong>,
      </Text>
      
      <Text style={text}>
        Le confirmamos que su solicitud ha sido <strong style={highlightBlue}>RECIBIDA</strong> exitosamente en nuestro sistema.
      </Text>

      <Text style={text}>
        Hemos registrado su información y nuestro equipo comenzará a procesar su solicitud en los próximos días hábiles.
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
        Nuestro equipo revisará cuidadosamente su solicitud y le enviará una notificación con el siguiente paso en el proceso una vez que se complete la evaluación inicial.
      </Text>

      <Text style={text}>
        Si tiene alguna pregunta sobre su solicitud o necesita enviar información adicional, puede contactarnos a través de nuestros canales oficiales.
      </Text>

      <Text style={closing}>
        Gracias por su interés en <strong>GlobalXpress</strong>.
      </Text>
    </EmailTemplateBase>
  );
};

export default FormularioRecibidoEmail; 