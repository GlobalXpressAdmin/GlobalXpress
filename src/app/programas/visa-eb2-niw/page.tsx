'use client';
import React from 'react';
import AcompanamientoContinuo from '@/components/AcompanamientoContinuo';
import FamiliasMigrantesSection from '@/components/FamiliasMigrantesSection';
import PhoneInputPro from '../../../components/PhoneInputPro';
import LegalModal from '@/components/LegalModal';

export default function VisaEB2NIW() {
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
  const [showLegal, setShowLegal] = React.useState(false);

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
        body: JSON.stringify({ ...form, programa: 'EB2_NIW' }),
      });
      const data = await res.json();
      if (data.ok) {
        setSuccess('¡Formulario enviado correctamente!');
        setForm({ nombre: '', apellido: '', email: '', telefono: '', visa: '', mensaje: '', terminos: false });
        setIntentoEnvio(false);
      } else {
        setError(data.error || 'Error al enviar el formulario.');
      }
    } catch {
      setError('Error de conexión.');
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white py-0 px-0">
      {/* Hero visual con imagen y texto EXACTAMENTE como el ejemplo del usuario */}
      <section className="w-full flex flex-col md:flex-row bg-white">
        {/* Imagen a la izquierda */}
        <div className="md:w-1/2 w-full">
          <img
            src="/Programa%20EB-2%20NIW.png"
            alt="EB-2 NIW"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Texto a la derecha */}
        <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 leading-tight -mt-10">
            Programa EB-2 NIW <br /> Residencia para profesionales
          </h2>
          <p className="text-gray-800 text-base md:text-lg mb-6">
            Acceda a la residencia permanente en EE. UU. mediante una inversión estructurada, regulada por el gobierno federal y con la posibilidad de asociarse con grandes empresas estadounidenses a través de nuestros convenios exclusivos.
          </p>
          <button
            className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 transition w-fit"
            onClick={() => {
              const formSection = document.getElementById('formulario-eb2-niw');
              if (formSection) {
                const y = formSection.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
          >
            Postúlese ahora
          </button>

          {/* Línea cian y bloque de evaluación */}
          <div className="mt-8 border-t-4 border-cyan-400 pt-4 text-right">
            <p className="text-gray-800">
              Solicite una <span className="font-bold">evaluación de elegibilidad.</span>
            </p>
            <p className="text-right font-bold text-blue-900 text-lg md:text-xl leading-tight mt-2">
              PROGRAMA MIGRATORIO PARA <br /> PROFESIONALES DE ALTO NIVEL <br />
              <span className="text-3xl">EB-2 NIW</span>
            </p>
          </div>
        </div>
      </section>
      {/* Sección de formulario de evaluación profesional EB-2 NIW */}
      <div id="formulario-eb2-niw" className="w-full bg-[#ededed] py-16 px-4 flex flex-col md:flex-row justify-center items-center gap-12 mt-12">
        {/* Texto informativo */}
        <div className="max-w-xl text-left">
          <h2 className="text-5xl md:text-6xl font-extrabold text-[#1161A9] mb-4 leading-tight">
            Conozca si su perfil profesional califica para el <span className="text-[#0074a6]">EB-2 NIW.</span>
          </h2>
          <p className="text-2xl text-black mb-4">
            Nuestro equipo evaluará su trayectoria, estudios y contribución al interés nacional de EE. UU. para determinar su elegibilidad bajo este programa.
          </p>
        </div>
        {/* Formulario controlado unificado */}
        <form className="bg-[#ededed] rounded-lg flex-1 flex flex-col gap-4 mx-auto px-2" style={{maxWidth: '100%'}} onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              className="flex-1 p-3 rounded-lg bg-white border-none outline-none text-black"
              value={form.nombre}
              onChange={e => setForm(prev => ({ ...prev, nombre: e.target.value }))}
              style={{ maxWidth: '100%', marginBottom: '0' }}
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              className="flex-1 p-3 rounded-lg bg-white border-none outline-none text-black"
              value={form.apellido}
              onChange={e => setForm(prev => ({ ...prev, apellido: e.target.value }))}
              style={{ maxWidth: '100%', marginTop: '0.5rem' }}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="p-3 rounded-lg bg-white border-none outline-none text-black"
            value={form.email}
            onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
          />
          <div className="flex items-center bg-white rounded p-3 gap-2">
            <PhoneInputPro
              value={form.telefono}
              onChange={telefono => setForm(prev => ({ ...prev, telefono }))}
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
              onClick={() => setForm(prev => ({ ...prev, visa: 'SI' }))}
            >
              SI
            </button>
            <button
              type="button"
              className={`w-12 h-12 rounded-full border-2 font-bold flex items-center justify-center focus:outline-none ${form.visa === 'NO' ? 'bg-[#1161A9] text-white border-[#1161A9]' : 'border-[#1161A9] text-[#1161A9]'}`}
              onClick={() => setForm(prev => ({ ...prev, visa: 'NO' }))}
            >
              NO
            </button>
          </div>
          <textarea
            name="mensaje"
            placeholder="Escriba su mensaje"
            className="p-3 rounded-lg bg-white border-none outline-none text-black min-h-[80px]"
            value={form.mensaje}
            onChange={e => setForm(prev => ({ ...prev, mensaje: e.target.value }))}
          />
          <div className="flex items-center gap-2 mt-2">
            <a href="#" className="text-[#1161A9] font-semibold underline" onClick={e => { e.preventDefault(); setShowLegal(true); }}>Términos y Condiciones</a>
            <input
              type="checkbox"
              name="terminos"
              className={`w-5 h-5 rounded-full border-2 ${intentoEnvio && !form.terminos ? 'border-red-500' : 'border-[#222]'}`}
              checked={form.terminos}
              onChange={e => setForm(prev => ({ ...prev, terminos: e.target.checked }))}
            />
            <span className="text-black">Confirmo que he leído y acepto los términos del Programa EB-2 NIW Residencia para profesionales</span>
            {intentoEnvio && !form.terminos && (
              <span className="text-red-600 text-xs font-bold ml-2">* Obligatorio para enviar</span>
            )}
          </div>
          <LegalModal open={showLegal} onClose={() => setShowLegal(false)} />
          <button
            type="submit"
            className="bg-[#004876] text-white font-bold py-3 rounded-full mt-4 text-lg transition-all duration-150 hover:bg-[#1161A9] hover:scale-105 active:bg-[#003b5c] active:scale-95"
          >
            Enviar formulario
          </button>
          {error && <div className="text-red-600 text-sm font-bold mt-1">{error}</div>}
          {success && <div className="text-green-600 text-sm font-bold mt-1">{success}</div>}
        </form>
      </div>
      {/* Sección informativa: Puerta de entrada legal */}
      <div className="w-full bg-white py-16 px-4 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#1161A9] text-center mb-2" style={{fontFamily: 'inherit'}}>
          Haga de su talento una puerta de entrada legal a EE. UU.
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold text-[#1161A9] text-center mb-4" style={{fontFamily: 'inherit'}}>
          Si su experiencia profesional contribuye al desarrollo del país, puede postular<br />
          a este programa altamente valorado por el gobierno estadounidense.
        </h3>
        <hr className="w-3/4 border-t-2 border-gray-400 my-8" />
      </div>
      {/* Sección de acompañamiento continuo */}
      <AcompanamientoContinuo />
      <FamiliasMigrantesSection />
      {/* Botón flotante de WhatsApp */}
      <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-green-500 rounded-full shadow-lg p-3 flex items-center justify-center hover:bg-green-600 transition-colors" style={{width: '64px', height: '64px'}}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" width="40" height="40"><path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.824-2.205C13.41 27.597 14.686 28 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.18 0-2.334-.205-3.424-.609l-.244-.088-4.646 1.309 1.242-4.824-.16-.25C7.24 18.08 6.5 16.573 6.5 15c0-5.238 4.262-9.5 9.5-9.5s9.5 4.262 9.5 9.5-4.262 9.5-9.5 9.5zm5.25-7.25c-.287-.143-1.697-.838-1.96-.934-.263-.096-.454-.143-.646.143-.192.287-.741.934-.909 1.127-.168.192-.335.215-.622.072-.287-.143-1.213-.447-2.31-1.425-.854-.76-1.43-1.698-1.598-1.985-.168-.287-.018-.443.126-.585.13-.13.287-.335.43-.502.144-.168.192-.287.288-.478.096-.192.048-.359-.024-.502-.072-.143-.646-1.56-.885-2.14-.233-.561-.47-.484-.646-.493-.168-.007-.359-.009-.55-.009-.192 0-.502.072-.765.359-.263.287-1.01.986-1.01 2.402 0 1.416 1.034 2.783 1.178 2.975.144.192 2.037 3.116 5.04 4.25.705.242 1.254.386 1.684.494.707.18 1.35.155 1.86.094.567-.067 1.697-.693 1.938-1.363.24-.67.24-1.244.168-1.363-.072-.12-.263-.192-.55-.335z"/></svg>
      </a>
      <LegalModal open={showLegal} onClose={() => setShowLegal(false)} />
    </section>
  );
} 