import React from 'react';
import { Section, Text, Heading } from '@react-email/components';
import EmailTemplateBase, { greeting, text, highlight, detailsCard, successCard, cardTitle, detailText, closing } from './EmailTemplateBase';

interface FormularioCompletadoEmailProps {
  nombre: string;
  apellido: string;
  programa: string;
  tipoFormulario: string;
}

export const FormularioCompletadoEmail: React.FC<FormularioCompletadoEmailProps> = ({
  nombre,
  apellido,
  programa,
  tipoFormulario,
}) => {
  const previewText = `¡Felicitaciones! Tu solicitud ha sido completada`;

  return (
    <EmailTemplateBase
      previewText={previewText}
      title="¡Felicitaciones! 🎉"
    >
      <Text style={greeting}>
        Estimado/a <strong>{nombre} {apellido}</strong>,
      </Text>
      
      <Text style={text}>
        Nos complace informarle que su solicitud ha sido <strong style={highlight}>COMPLETADA</strong> exitosamente.
      </Text>

      <Text style={text}>
        Este es un momento muy importante. Su proceso ha sido finalizado y todos los trámites han sido completados satisfactoriamente.
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

      {/* Información de Completado */}
      <Section style={successCard}>
        <Heading style={cardTitle}>Proceso completado</Heading>
        <Text style={detailText}>
          • Todos los documentos han sido procesados
        </Text>
        <Text style={detailText}>
          • La documentación ha sido verificada y aprobada
        </Text>
        <Text style={detailText}>
          • Los trámites correspondientes han sido finalizados
        </Text>
        <Text style={detailText}>
          • Su caso ha sido cerrado exitosamente
        </Text>
      </Section>

      <Text style={text}>
        Nuestro equipo se pondrá en contacto con usted en los próximos días para coordinar la entrega de la documentación final o cualquier información adicional que pueda necesitar.
      </Text>

      <Text style={text}>
        Si tiene alguna pregunta sobre el proceso completado o necesita información adicional, puede contactarnos a través de nuestros canales oficiales.
      </Text>

      <Text style={closing}>
        ¡Gracias por confiar en <strong>GlobalXpress</strong> para su desarrollo profesional!
      </Text>
    </EmailTemplateBase>
  );
};

export default FormularioCompletadoEmail; 