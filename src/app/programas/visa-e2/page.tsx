'use client';
import React, { useState } from 'react';
import FamiliasMigrantesSection from '../../../components/FamiliasMigrantesSection';
import FormacionSliderSection from '../../../components/FormacionSliderSection';
import IconoCard from '../../../components/IconoCard';
import { FaPhone } from 'react-icons/fa';
import PhoneInputPro from '../../../components/PhoneInputPro';
import LegalModal from '@/components/LegalModal';

export default function VisaE2() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    visa: '',
    mensaje: '',
    terminos: false,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [intentoEnvio, setIntentoEnvio] = useState(false);
  const [showLegal, setShowLegal] = useState(false);

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
        body: JSON.stringify({ ...form, programa: 'E2' }),
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
    <main>
      <section className="w-full flex flex-col md:flex-row bg-white">
        {/* Imagen a la izquierda */}
        <div className="md:w-1/2 w-full">
          <img
            src="/Visa E-2.png"
            alt="Visa E-2"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contenido a la derecha */}
        <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 -mt-10 leading-tight">
            Programa de Inversión – <span className="text-[#0070b8]">Visa E-2</span>
          </h2>

          <p className="text-gray-800 font-semibold mb-4 mt-6">
            Invierta, gestione y viva legalmente en Estados Unidos.
          </p>

          <p className="text-gray-700 mb-2">
            Asesoramos a ciudadanos de países con tratados comerciales con EE. UU. en la estructuración de negocios viables que les permitan solicitar la Visa E-2. Nuestro enfoque es estratégico, normativo y alineado con las exigencias del gobierno estadounidense.
          </p>

          <button
            className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 transition w-fit mt-4"
            onClick={() => {
              const formSection = document.getElementById('formulario-e2');
              if (formSection) {
                const y = formSection.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
          >
            Postúlese ahora
          </button>

          {/* Línea y bloque derecho */}
          <div className="mt-8 border-t-4 border-cyan-400 pt-4 text-right">
            <p className="text-gray-800">
              Solicite una <span className="font-bold">evaluación inicial.</span>
            </p>
            <p className="text-right font-bold text-blue-900 text-lg md:text-xl leading-tight mt-2">
              PROGRAMA DE EMPRENDIMIENTO <br />
              E INVERSIÓN EN EE. UU. <br />
              <span className="text-3xl">E-2</span>
            </p>
          </div>
        </div>
      </section>
      {/* Sección de cards de beneficios E-2 */}
      <section className="w-full bg-[#004b76] py-16 px-4 text-white text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          <span className="text-cyan-400">Un camino empresarial legal</span> hacia Estados Unidos
        </h2>
        <div className="w-24 h-1 bg-cyan-400 mx-auto mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Tarjeta 1 */}
          <div className="bg-white text-[#333] rounded-xl p-6 shadow-lg flex flex-col items-center">
            <IconoCard tipo="acompanamiento" className="w-12 h-12 mb-4" />
            <p className="text-center">
              Posibilidad de incluir a su núcleo familiar como beneficiarios.
            </p>
          </div>
          {/* Tarjeta 2 */}
          <div className="bg-white text-[#333] rounded-xl p-6 shadow-lg flex flex-col items-center">
            <IconoCard tipo="mercado" className="w-12 h-12 mb-4" />
            <p className="text-center">
              Acceso a mercados, oportunidades y redes empresariales en territorio estadounidense.
            </p>
          </div>
          {/* Tarjeta 3 */}
          <div className="bg-white text-[#333] rounded-xl p-6 shadow-lg flex flex-col items-center">
            <IconoCard tipo="document" className="w-12 h-12 mb-4" />
            <p className="text-center">
              Derecho a residir legalmente en EE.UU. mientras opera su negocio.
            </p>
          </div>
        </div>
      </section>
      <section id="formulario-e2" className="w-full bg-[#ededed] py-16 px-4 flex flex-col md:flex-row justify-center items-center gap-12 mt-12">
        {/* Texto informativo */}
        <div className="max-w-md text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1161A9] mb-4 leading-tight">
            Cuéntenos sobre su <span className="text-[#0074a6]">perfil<br />como inversionista.</span>
          </h2>
          <p className="text-lg text-black mb-4">
            Queremos conocer su nacionalidad, tipo de inversión y objetivos empresariales para determinar si el programa E-2 es el camino adecuado para usted.
          </p>
        </div>
        {/* Formulario controlado */}
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
          {/* Teléfono con ícono */}
          <PhoneInputPro
            value={form.telefono}
            onChange={telefono => setForm(prev => ({ ...prev, telefono }))}
            required
            bgClass="!bg-white"
            labelClass="block text-gray-500 text-sm mb-1 ml-1 font-semibold"
            helpTextClass="block text-xs text-gray-400 mt-2 ml-1"
            showAsterisk={false}
          />
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
            <span className="text-black">Confirmo que he leído y acepto los términos del proceso Programa de Inversión Visa E-2</span>
            {intentoEnvio && !form.terminos && (
              <span className="text-red-600 text-xs font-bold ml-2">* Obligatorio para enviar</span>
            )}
          </div>
          <LegalModal open={showLegal} onClose={() => setShowLegal(false)} />
          <button type="submit" className="bg-[#004876] text-white font-bold py-3 rounded-full mt-4 text-lg">Enviar formulario</button>
        </form>
        {error && <div className="text-red-600 text-sm font-bold mt-1">{error}</div>}
        {success && <div className="text-green-600 text-sm font-bold mt-1">{success}</div>}
      </section>
      {/* Bloque superior blanco con mensaje */}
      <section className="w-full bg-white py-16 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-900 leading-snug max-w-4xl mx-auto">
          Tome decisiones estratégicas con respaldo experto.<br />
          Estados Unidos puede ser el siguiente paso en su desarrollo empresarial.<br />
          Inicie este proceso con asesoría confiable y enfoque estructurado.
        </h2>
        <div className="w-24 h-0.5 bg-gray-400 mx-auto mt-6" />
      </section>

      {/* Sección con imagen de fondo y texto ACOMPAÑAMIENTO CONTINUO */}
      <section
        className="w-full py-24 px-4 text-center text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/Acompañamiento Continuo.png')" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          <span className="text-cyan-400">ACOMPAÑAMIENTO</span> CONTINUO:
        </h2>
        <p className="mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
          Recuerde que durante todo el proceso, recibirá acompañamiento periódico de nuestros especialistas,
          quienes se asegurarán de mantenerlo informado sobre el progreso de su solicitud y de las novedades relevantes.
        </p>
      </section>
      <FamiliasMigrantesSection />
      <FormacionSliderSection />
    </main>
  );
} 