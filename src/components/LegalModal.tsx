import React from 'react';

interface LegalModalProps {
  open: boolean;
  onClose: () => void;
}

const textoLegal = (
  <div className="max-h-[60vh] overflow-y-auto px-2">
    <h2 className="text-2xl font-extrabold text-center mb-2">TÉRMINOS Y CONDICIONES DE USO</h2>
    <p className="mb-4 text-sm text-gray-700">
      Bienvenido a <b>Global Express Recruiting LLC</b> (“la Empresa”). Al utilizar nuestros servicios y completar este formulario, usted reconoce y acepta los siguientes términos y condiciones:
      <br /><br />
      <b>1. Veracidad de la Información:</b> El usuario garantiza que toda la información proporcionada es completa, verídica y actualizada. La Empresa no se hace responsable por consecuencias derivadas de información falsa o inexacta.<br />
      <b>2. Uso de los Servicios:</b> El acceso y uso de nuestros servicios está sujeto a la legislación vigente de los Estados Unidos de América y a las políticas internas de la Empresa. Nos reservamos el derecho de rechazar solicitudes que no cumplan con nuestros estándares éticos, legales o de calidad.<br />
      <b>3. Propiedad Intelectual:</b> Todos los contenidos, marcas, logotipos y materiales presentes en este sitio web son propiedad exclusiva de Global Express Recruiting LLC o de sus licenciantes. Queda prohibida su reproducción, distribución o uso no autorizado.<br />
      <b>4. Modificaciones:</b> La Empresa podrá modificar estos términos y condiciones en cualquier momento. Las modificaciones serán publicadas en nuestro sitio web y entrarán en vigor inmediatamente.
    </p>
    <h2 className="text-2xl font-extrabold text-center mb-2 mt-6">POLÍTICA DE PRIVACIDAD Y TRATAMIENTO DE DATOS PERSONALES</h2>
    <p className="mb-4 text-sm text-gray-700">
      <b>1. Compromiso con la Privacidad:</b> Global Express Recruiting LLC se compromete a proteger la privacidad y confidencialidad de los datos personales de sus usuarios, cumpliendo con la legislación de los Estados Unidos (incluyendo CCPA, si aplica) y los más altos estándares internacionales de protección de datos.<br />
      <b>2. Finalidad del Tratamiento:</b> Los datos personales recolectados serán utilizados exclusivamente para la prestación de servicios de asesoría migratoria, gestión de solicitudes, contacto y envío de información relevante sobre nuestros servicios.<br />
      <b>3. Almacenamiento y Seguridad:</b> Sus datos serán almacenados en servidores seguros y sólo tendrán acceso a ellos el personal autorizado de la Empresa, bajo estrictas medidas de confidencialidad y seguridad.<br />
      <b>4. Divulgación a Terceros:</b> No compartiremos su información personal con terceros no autorizados. Únicamente podrá ser compartida con autoridades gubernamentales, aliados estratégicos o proveedores de servicios, cuando sea estrictamente necesario para la ejecución de los servicios contratados o por requerimiento legal.<br />
      <b>5. Derechos del Titular:</b> Usted tiene derecho a acceder, rectificar, actualizar o solicitar la eliminación de sus datos personales en cualquier momento, enviando una solicitud formal a info@globalexpresscol.com.<br />
      <b>6. Transferencias Internacionales:</b> En caso de transferencias internacionales de datos, garantizamos que se realizarán bajo los mecanismos legales y contractuales adecuados para proteger su información.
    </p>
    <h2 className="text-2xl font-extrabold text-center mb-2 mt-6">AVISO DE EMPRESA REAL Y CONTACTO CORPORATIVO</h2>
    <p className="mb-4 text-sm text-gray-700">
      <b>Global Express Recruiting LLC</b><br />
      Empresa legalmente constituida en los Estados Unidos de América<br />
      Dirección: 1146 E. Green St. Pasadena, CA 91106, Estados Unidos<br />
      Email: info@globalexpresscol.com<br />
      Teléfono: +1 (949) 594-7776<br />
      Sitio web: www.globalexpresscol.com<br /><br />
      Global Express Recruiting LLC es una firma de consultoría migratoria reconocida, con amplia experiencia y trayectoria internacional. Nos regimos por los más altos estándares de ética, transparencia y cumplimiento normativo, garantizando la protección de los derechos e intereses de nuestros clientes.<br /><br />
      <b>Al continuar, usted declara haber leído, entendido y aceptado estos términos y condiciones, así como nuestra política de privacidad.</b>
    </p>
  </div>
);

export default function LegalModal({ open, onClose }: LegalModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full relative p-6 animate-fade-in pointer-events-auto">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <div className="flex flex-col items-center mb-4">
          <img src="/logo_negro.png" alt="Logo Global Express Recruiting" className="h-12 mb-2" />
          <h1 className="text-3xl font-extrabold text-[#222] text-center mb-2">Información Legal y Términos</h1>
        </div>
        {textoLegal}
      </div>
    </div>
  );
} 