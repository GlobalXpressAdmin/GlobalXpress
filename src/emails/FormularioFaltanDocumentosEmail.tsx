import React from 'react';
import { Section, Text, Heading } from '@react-email/components';
import EmailTemplateBase, { greeting, text, highlightOrange, detailsCard, warningCard, cardTitle, detailText, closing } from './EmailTemplateBase';

interface FormularioFaltanDocumentosEmailProps {
  nombre: string;
  apellido: string;
  programa: string;
  tipoFormulario: string;
}

export const FormularioFaltanDocumentosEmail: React.FC<FormularioFaltanDocumentosEmailProps> = ({
  nombre,
  apellido,
  programa,
  tipoFormulario,
}) => {
  const previewText = `Necesitamos documentación adicional`;

  return (
    <EmailTemplateBase
      previewText={previewText}
      title="Documentación Adicional Requerida"
    >
      <Text style={greeting}>
        Estimado/a <strong>{nombre} {apellido}</strong>,
      </Text>
      
      <Text style={text}>
        Le informamos que su solicitud requiere <strong style={highlightOrange}>DOCUMENTACIÓN ADICIONAL</strong> para continuar con el proceso.
      </Text>

      <Text style={text}>
        Durante la revisión de su solicitud, hemos identificado que necesitamos información adicional para completar la evaluación de su caso.
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

      {/* Documentación Requerida */}
      <Section style={warningCard}>
        <Heading style={cardTitle}>Documentación requerida</Heading>
        <Text style={detailText}>
          • Documentos de identificación actualizados
        </Text>
        <Text style={detailText}>
          • Certificados académicos o profesionales
        </Text>
        <Text style={detailText}>
          • Documentación financiera (si aplica)
        </Text>
        <Text style={detailText}>
          • Cualquier documentación específica del programa
        </Text>
      </Section>

      <Text style={text}>
        Por favor, proporcione la documentación solicitada lo antes posible para evitar retrasos en el procesamiento de su solicitud.
      </Text>

      <Text style={text}>
        Puede enviar la documentación adicional a través de nuestros canales oficiales o contactarnos para coordinar la entrega de la información requerida.
      </Text>

      <Text style={text}>
        Si tiene alguna pregunta sobre los documentos requeridos, puede contactarnos a través de nuestros canales oficiales.
      </Text>

      <Text style={closing}>
        Gracias por su cooperación y paciencia.
      </Text>
    </EmailTemplateBase>
  );
};

export default FormularioFaltanDocumentosEmail; 