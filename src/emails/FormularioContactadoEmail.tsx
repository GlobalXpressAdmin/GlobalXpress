import React from 'react';
import { Section, Text, Heading } from '@react-email/components';
import EmailTemplateBase, { greeting, text, highlightBlue, detailsCard, cardTitle, detailText, closing } from './EmailTemplateBase';

interface FormularioContactadoEmailProps {
  nombre: string;
  apellido: string;
  programa: string;
  tipoFormulario: string;
}

export const FormularioContactadoEmail: React.FC<FormularioContactadoEmailProps> = ({
  nombre,
  apellido,
  programa,
  tipoFormulario,
}) => {
  const previewText = `Hemos intentado contactarte`;

  return (
    <EmailTemplateBase
      previewText={previewText}
      title="Intento de Contacto"
    >
      <Text style={greeting}>
        Estimado/a <strong>{nombre} {apellido}</strong>,
      </Text>
      
      <Text style={text}>
        Le informamos que hemos intentado contactarlo sin éxito. Su solicitud se encuentra en estado <strong style={highlightBlue}>CONTACTADO</strong>.
      </Text>

      <Text style={text}>
        Nuestro equipo ha intentado comunicarse con usted para discutir aspectos importantes de su solicitud o para solicitar información adicional necesaria para continuar con el proceso.
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
        Para continuar con el procesamiento de su solicitud, le pedimos que se ponga en contacto con nuestro equipo a través de nuestros canales oficiales lo antes posible.
      </Text>

      <Text style={text}>
        Puede contactarnos por teléfono, email o a través de nuestra plataforma web. Nuestro equipo estará disponible para atender sus consultas y coordinar los siguientes pasos.
      </Text>

      <Text style={text}>
        Si ya ha sido contactado por nuestro equipo, por favor ignore este mensaje.
      </Text>

      <Text style={closing}>
        Gracias por su atención y esperamos su contacto pronto.
      </Text>
    </EmailTemplateBase>
  );
};

export default FormularioContactadoEmail; 