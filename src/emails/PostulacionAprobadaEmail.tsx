import React from 'react';
import { Section, Text, Heading } from '@react-email/components';
import EmailTemplateBase, { greeting, text, highlight, detailsCard, stepsCard, cardTitle, detailText, stepText, closing } from './EmailTemplateBase';

interface PostulacionAprobadaEmailProps {
  nombre: string;
  apellido: string;
  empresa: string;
  cargo: string;
  programa: string;
}

export const PostulacionAprobadaEmail: React.FC<PostulacionAprobadaEmailProps> = ({
  nombre,
  apellido,
  empresa,
  cargo,
  programa,
}) => {
  const previewText = `¡Felicitaciones! Tu postulación ha sido aprobada`;

  return (
    <EmailTemplateBase
      previewText={previewText}
      title="¡Felicitaciones! 🎉"
    >
      <Text style={greeting}>
        Estimado/a <strong>{nombre} {apellido}</strong>,
      </Text>
      
      <Text style={text}>
        Nos complace informarle que su postulación ha sido <strong style={highlight}>APROBADA</strong> exitosamente.
      </Text>

      <Text style={text}>
        Este es un momento muy importante en su proceso de aplicación. Nuestro equipo se pondrá en contacto con usted en los próximos días para coordinar los siguientes pasos.
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
        <Heading style={cardTitle}>Próximos pasos</Heading>
        <Text style={stepText}>1. Recibirá una llamada de nuestro equipo de coordinación</Text>
        <Text style={stepText}>2. Se programará una entrevista final</Text>
        <Text style={stepText}>3. Se le proporcionará información sobre documentación requerida</Text>
        <Text style={stepText}>4. Se establecerá la fecha de inicio</Text>
        <Text style={stepText}>5. Se realizará la inducción al programa</Text>
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

export default PostulacionAprobadaEmail; 