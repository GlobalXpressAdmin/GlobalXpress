import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';

interface EmailTemplateBaseProps {
  previewText: string;
  title: string;
  children: React.ReactNode;
  showLogo?: boolean;
}

export const EmailTemplateBase: React.FC<EmailTemplateBaseProps> = ({
  previewText,
  title,
  children,
  showLogo = true,
}) => {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header con Logo */}
          {showLogo && (
            <Section style={header}>
              <Img
                src="https://globalxpresscol.com/logo_negro.png"
                width="200"
                height="60"
                alt="GlobalXpress"
                style={logo}
              />
            </Section>
          )}

          {/* Contenido Principal */}
          <Section style={content}>
            <Heading style={h1}>{title}</Heading>
            {children}
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Este es un mensaje automático. Por favor, no responda a este correo.
            </Text>
            <Text style={footerText}>
              © 2024 GlobalXpress. Todos los derechos reservados.
            </Text>
            <Text style={footerText}>
              <Link href="https://globalxpresscol.com" style={footerLink}>
                globalxpresscol.com
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Estilos base reutilizables
export const main = {
  backgroundColor: '#f8fafc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

export const container = {
  margin: '0 auto',
  padding: '20px',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
};

export const header = {
  textAlign: 'center' as const,
  padding: '20px 0',
  borderBottom: '2px solid #f1f5f9',
  marginBottom: '30px',
};

export const logo = {
  margin: '0 auto',
};

export const content = {
  padding: '0 20px',
};

export const h1 = {
  color: '#1e293b',
  fontSize: '28px',
  fontWeight: '700',
  textAlign: 'center' as const,
  margin: '0 0 30px 0',
  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

export const greeting = {
  color: '#334155',
  fontSize: '18px',
  lineHeight: '28px',
  margin: '0 0 20px 0',
  fontWeight: '500',
};

export const text = {
  color: '#475569',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 20px 0',
};

export const highlight = {
  color: '#059669',
  fontWeight: '600',
};

export const highlightRed = {
  color: '#dc2626',
  fontWeight: '600',
};

export const highlightOrange = {
  color: '#ea580c',
  fontWeight: '600',
};

export const highlightBlue = {
  color: '#2563eb',
  fontWeight: '600',
};

export const detailsCard = {
  backgroundColor: '#f8fafc',
  padding: '24px',
  borderRadius: '12px',
  margin: '30px 0',
  border: '1px solid #e2e8f0',
};

export const stepsCard = {
  backgroundColor: '#eff6ff',
  padding: '24px',
  borderRadius: '12px',
  margin: '30px 0',
  border: '1px solid #dbeafe',
  borderLeft: '4px solid #3b82f6',
};

export const warningCard = {
  backgroundColor: '#fef3c7',
  padding: '24px',
  borderRadius: '12px',
  margin: '30px 0',
  border: '1px solid #fde68a',
  borderLeft: '4px solid #f59e0b',
};

export const successCard = {
  backgroundColor: '#ecfdf5',
  padding: '24px',
  borderRadius: '12px',
  margin: '30px 0',
  border: '1px solid #d1fae5',
  borderLeft: '4px solid #10b981',
};

export const errorCard = {
  backgroundColor: '#fef2f2',
  padding: '24px',
  borderRadius: '12px',
  margin: '30px 0',
  border: '1px solid #fecaca',
  borderLeft: '4px solid #ef4444',
};

export const cardTitle = {
  color: '#1e293b',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 16px 0',
};

export const detailText = {
  color: '#475569',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '8px 0',
};

export const stepText = {
  color: '#374151',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '8px 0',
  paddingLeft: '8px',
};

export const closing = {
  color: '#1e293b',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '30px 0 20px 0',
  textAlign: 'center' as const,
  fontWeight: '500',
};

export const divider = {
  borderColor: '#e2e8f0',
  margin: '40px 0',
};

export const footer = {
  textAlign: 'center' as const,
  padding: '20px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  marginTop: '30px',
};

export const footerText = {
  color: '#64748b',
  fontSize: '13px',
  lineHeight: '20px',
  margin: '4px 0',
};

export const footerLink = {
  color: '#3b82f6',
  textDecoration: 'none',
};

export default EmailTemplateBase; 