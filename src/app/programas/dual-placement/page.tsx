'use client';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Slider from 'react-slick';
import { FaBriefcase, FaHandshake, FaEnvelopeOpenText, FaExchangeAlt } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react'; // Added missing import for React
import PhoneInputPro from '@/components/PhoneInputPro';
import FamiliasMigrantesSection from '@/components/FamiliasMigrantesSection';
import LegalModal from '@/components/LegalModal';

export default function DualPlacement() {
  const [showLegal, setShowLegal] = React.useState(false);
  return (
    <>
      <Navbar />
      <div style={{ height: '60px' }} />
      <section className="w-full flex flex-col lg:flex-row bg-white min-h-[480px] items-stretch justify-center p-0">
        {/* Imagen a la izquierda, sin borde ni recuadro, con overlay */}
        <div className="relative w-full lg:w-[40%] min-h-[340px] lg:min-h-[480px] h-[340px] lg:h-auto">
          <Image
            src="/dual_placement.png"
            alt="Dual Placement"
            fill
            className="object-cover object-center w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        {/* Contenido a la derecha */}
        <div className="w-full lg:w-[60%] flex flex-col justify-center px-8 py-12 lg:py-0 lg:pl-16 lg:pr-24 bg-white">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#005c82] mb-2" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
            Programa Dual Placement
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-black mb-4" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
            Prepare el camino laboral de su pareja antes de llegar a EE. UU.
          </h2>
          <p className="text-base md:text-lg text-gray-800 mb-6 max-w-2xl" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
            El programa Dual Placement permite a los cónyuges o parejas de aplicantes a la visa EB-3 acceder a entrevistas laborales previamente agendadas antes de su llegada a Estados Unidos. Facilitamos su integración profesional desde el primer día, con el respaldo de nuestro equipo de reclutamiento.
          </p>
          <button
            className="bg-[#005c82] text-white font-bold px-8 py-3 rounded-lg text-lg shadow hover:bg-[#003b5c] transition-all w-fit mb-8"
            onClick={() => {
              const formSection = document.getElementById('formulario-dual-placement');
              if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Postúlese ahora
          </button>
          <div className="w-full h-1 bg-cyan-300 rounded mb-8" />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 w-full">
            <div className="flex-1" />
            <div className="flex flex-col items-end">
              <span className="text-base md:text-lg text-black mb-1 text-right" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
                Solicite <span className="font-bold">información personalizada</span>
              </span>
              <Image
                src="/logo_dual.png"
                alt="Logo Dual Placement"
                width={180}
                height={60}
                className="object-contain mt-2"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      {/* Sección de integración laboral anticipada */}
      <section className="w-full bg-[#03608c] py-16 px-2 md:px-0">
        <div className="max-w-7xl mx-auto flex flex-col">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-2 text-left" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
            <span className="text-cyan-300">Integración laboral anticipada</span> <span className="text-white font-bold">con respaldo profesional</span>
          </h2>
          <div className="w-48 h-2 bg-cyan-300 rounded mb-10" />
          {/* Slider funcional */}
          <Slider
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={3}
            slidesToScroll={1}
            arrows={true}
            responsive={[
              { breakpoint: 1024, settings: { slidesToShow: 2 } },
              { breakpoint: 640, settings: { slidesToShow: 1 } },
            ]}
            className="w-full"
          >
            <div className="px-4">
              <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center w-full min-h-[260px]">
                <FaBriefcase className="text-cyan-400 text-5xl mb-4" />
                <p className="text-center text-lg text-black font-medium">Acceso a entrevistas laborales antes de llegar a EE. UU.</p>
              </div>
            </div>
            <div className="px-4">
              <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center w-full min-h-[260px]">
                <FaEnvelopeOpenText className="text-cyan-400 text-5xl mb-4" />
                <p className="text-center text-lg text-black font-medium">Oportunidad real de obtener una oferta de empleo desde el país de origen.</p>
              </div>
            </div>
            <div className="px-4">
              <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center w-full min-h-[260px]">
                <FaHandshake className="text-cyan-400 text-5xl mb-4" />
                <p className="text-center text-lg text-black font-medium">Acompañamiento personalizado en la búsqueda laboral de la pareja.</p>
              </div>
            </div>
            <div className="px-4">
              <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center w-full min-h-[260px]">
                <FaExchangeAlt className="text-cyan-400 text-5xl mb-4" />
                <p className="text-center text-lg text-black font-medium">Proceso estructurado que optimiza la adaptación e independencia económica en EE. UU.</p>
              </div>
            </div>
          </Slider>
        </div>
      </section>
      {/* Sección de formulario profesional tipo EB-5 adaptado a Dual Placement */}
      <section id="formulario-dual-placement" className="w-full bg-[#ededed] py-16 px-4 flex flex-col md:flex-row justify-center items-center gap-12">
        {/* Texto informativo */}
        <div className="max-w-md text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1161A9] mb-4 leading-tight">
            Cuéntenos sobre su <span className="text-[#0074a6]">perfil<br />y necesidades laborales.</span>
          </h2>
          <p className="text-lg text-black mb-4">
            Queremos conocer su experiencia, expectativas y situación migratoria para brindarle la mejor asesoría y acompañamiento en su proceso Dual Placement.
          </p>
        </div>
        {/* Formulario controlado */}
        <DualPlacementForm showLegal={showLegal} setShowLegal={setShowLegal} />
      </section>
      {/* Sección de mensaje de adaptación y línea divisoria */}
      <section className="w-full bg-white py-16 flex flex-col items-center justify-center">
        <h2 className="text-[#03608c] text-4xl md:text-5xl font-bold text-center mb-4" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
          La adaptación comienza con una buena planificación.
        </h2>
        <p className="text-[#03608c] text-2xl md:text-3xl font-normal text-center mb-8 max-w-4xl" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
          Facilite el ingreso laboral de su pareja desde el inicio y asegure una transición<br />
          más estable para toda su familia en Estados Unidos.
        </p>
        <hr className="w-3/4 border-t border-gray-500" />
      </section>
      {/* Sección de acompañamiento continuo con fondo de imagen */}
      <section
        className="w-full relative flex items-center justify-center min-h-[380px] md:min-h-[420px]"
        style={{
          backgroundImage: "url('/recepcionista.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Contenido centrado */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-4 py-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
            <span className="text-cyan-300">ACOMPAÑAMIENTO</span> <span className="text-white">CONTINUO:</span>
          </h2>
          <p className="text-white text-xl md:text-2xl font-normal leading-snug" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
            Recuerde que durante todo el proceso, recibirá acompañamiento periódico<br />
            de nuestros especialistas, quienes se asegurarán de mantenerlo informado<br />
            sobre el progreso de su solicitud y de las novedades relevantes.
          </p>
        </div>
      </section>
      <FamiliasMigrantesSection />
      <LegalModal open={showLegal} onClose={() => setShowLegal(false)} />
    </>
  );
}

function DualPlacementForm({ showLegal, setShowLegal }: { showLegal: boolean; setShowLegal: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [form, setForm] = React.useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    visa: '',
    mensaje: '',
    terminos: false,
  });
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [intentoEnvio, setIntentoEnvio] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let fieldValue: string | boolean = value;
    if (type === 'checkbox' && 'checked' in e.target) {
      fieldValue = (e.target as HTMLInputElement).checked;
    }
    setForm((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  const handleVisa = (valor: string) => {
    setForm((prev) => ({ ...prev, visa: valor }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIntentoEnvio(true);
    if (!form.nombre || !form.apellido || !form.email || !form.telefono || !form.visa || !form.terminos) {
      setError('Por favor complete todos los campos y acepte los términos.');
      return;
    }
    try {
      const res = await fetch('/api/formularios-programa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, programa: 'DUAL_PLACEMENT' }),
      });
      const data = await res.json();
      if (data.ok) {
        setSuccess('¡Formulario enviado correctamente!');
        setForm({ nombre: '', apellido: '', email: '', telefono: '', visa: '', mensaje: '', terminos: false });
        setIntentoEnvio(false);
      } else {
        setError(data.error || 'Error al enviar el formulario.');
      }
    } catch (err) {
      setError('Error de conexión.');
    }
  };

  return (
    <>
      <form className="bg-[#ededed] rounded-lg flex-1 max-w-xl flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            className="flex-1 p-3 rounded-lg bg-white border-none outline-none text-black"
            value={form.nombre}
            onChange={handleChange}
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            className="flex-1 p-3 rounded-lg bg-white border-none outline-none text-black"
            value={form.apellido}
            onChange={handleChange}
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="p-3 rounded-lg bg-white border-none outline-none text-black"
          value={form.email}
          onChange={handleChange}
        />
        <div className="flex items-center bg-white rounded p-3 gap-2">
          <PhoneInputPro
            value={form.telefono}
            onChange={(telefono: string) => setForm(prev => ({ ...prev, telefono }))}
            required
            bgClass="!bg-white"
            labelClass="block text-gray-500 text-sm mb-1 ml-1 font-semibold"
            helpTextClass="block text-xs text-gray-400 mt-2 ml-1"
            showAsterisk={false}
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-black bg-[#f5f5f5] px-3 py-2 rounded-lg">¿Dispone de visa?</span>
          <button
            type="button"
            className={`w-12 h-12 rounded-full border-2 font-bold flex items-center justify-center focus:outline-none ${form.visa === 'SI' ? 'bg-[#1161A9] text-white border-[#1161A9]' : 'border-[#1161A9] text-[#1161A9]'}`}
            onClick={() => handleVisa('SI')}
          >
            SI
          </button>
          <button
            type="button"
            className={`w-12 h-12 rounded-full border-2 font-bold flex items-center justify-center focus:outline-none ${form.visa === 'NO' ? 'bg-[#1161A9] text-white border-[#1161A9]' : 'border-[#1161A9] text-[#1161A9]'}`}
            onClick={() => handleVisa('NO')}
          >
            NO
          </button>
        </div>
        <textarea
          name="mensaje"
          placeholder="Escriba su mensaje"
          className="p-3 rounded-lg bg-white border-none outline-none text-black min-h-[80px]"
          value={form.mensaje}
          onChange={handleChange}
        />
        <div className="flex items-center gap-2 mt-2">
          <a href="#" className="text-[#1161A9] font-semibold underline" onClick={e => { e.preventDefault(); setShowLegal(true); }}>Términos y Condiciones</a>
          <input
            type="checkbox"
            name="terminos"
            className={`w-5 h-5 rounded-full border-2 ${intentoEnvio && !form.terminos ? 'border-red-500' : 'border-[#222]'}`}
            checked={form.terminos}
            onChange={handleChange}
          />
          <span className="text-black">Confirmo que he leído y acepto los términos del proceso Dual Placement</span>
          {intentoEnvio && !form.terminos && (
            <span className="text-red-600 text-xs font-bold ml-2">* Obligatorio para enviar</span>
          )}
        </div>
        {error && <div className="text-red-600 text-sm font-bold mt-1">{error}</div>}
        {success && <div className="text-green-600 text-sm font-bold mt-1">{success}</div>}
        <button type="submit" className="bg-[#004876] text-white font-bold py-3 rounded-full mt-4 text-lg">Enviar formulario</button>
      </form>
      <LegalModal open={showLegal} onClose={() => setShowLegal(false)} />
    </>
  );
} 