'use client';
import React, { useState } from 'react';
import FamiliasMigrantesSection from '../../../components/FamiliasMigrantesSection';
import FormacionSliderSection from '../../../components/FormacionSliderSection';
import IconoCard from '../../../components/IconoCard';
import PhoneInputPro from '../../../components/PhoneInputPro';
import LegalModal from '@/components/LegalModal';

export default function VisaEB5() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    visa: '',
    mensaje: '',
    terminos: false,
  });

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

  const [intentoEnvio, setIntentoEnvio] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.nombre || !form.apellido || !form.email || !form.telefono || !form.visa || !form.terminos) {
      setError('Por favor complete todos los campos y acepte los términos.');
      return;
    }
    try {
      const res = await fetch('/api/formularios-programa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, programa: 'EB5' }),
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
    <>
      <main className="pt-16">
        <section className="w-full flex flex-col md:flex-row bg-white">
          {/* Imagen a la izquierda */}
          <div className="md:w-1/2 w-full">
            <img
              src="/Visa%20EB-5.png"
              alt="Visa EB-5"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Texto a la derecha */}
          <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2 -mt-4 leading-tight">
              Programa de Inversión – <span className="text-[#005ca9]">Visa EB-5</span>
            </h2>

            <p className="text-gray-800 font-semibold mb-4">
              Acceda a un camino legal hacia la residencia en EE. UU. mediante inversión estructurada.
            </p>

            <p className="text-gray-700 mb-2">
              Global Express Recruiting le asesora en la aplicación al programa Visa EB-5, una vía regulada por el gobierno estadounidense para inversionistas extranjeros interesados en contribuir al desarrollo económico del país.
            </p>
            <p className="text-gray-700 mb-6">
              Un proceso migratorio estratégico, conforme a la ley y con respaldo empresarial.
            </p>

            <button
              className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 transition w-fit"
              onClick={() => {
                const formSection = document.getElementById('formulario-eb5');
                if (formSection) {
                  const y = formSection.getBoundingClientRect().top + window.pageYOffset - 100;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
            >
              Postúlese ahora
            </button>

            {/* Línea y bloque final */}
            <div className="mt-8 border-t-4 border-cyan-400 pt-4 text-right">
              <p className="text-gray-800">
                Inicie su proceso de <span className="font-bold">evaluación como inversionista.</span>
              </p>
              <p className="text-right font-bold text-blue-900 text-lg md:text-xl leading-tight mt-2">
                PROGRAMA DE RESIDENCIA <br /> A TRAVÉS DE INVERSIÓN <br />
                <span className="text-3xl">EB-5</span>
              </p>
            </div>
          </div>
        </section>
        {/* Sección de cards de beneficios EB-5 */}
        <section className="w-full bg-[#004b76] py-16 px-4 text-white text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            <span className="text-cyan-400">Inversión estructurada con respaldo legal</span> y acompañamiento integral
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Tarjeta 1 */}
            <div className="bg-white text-[#333] rounded-xl p-6 shadow-lg flex flex-col items-center">
              <IconoCard tipo="hands" className="w-12 h-12 mb-4" />
              <p className="text-center">
                Asesoría especializada para estructurar su inversión conforme al programa EB-5.
              </p>
            </div>
            {/* Tarjeta 2 */}
            <div className="bg-white text-[#333] rounded-xl p-6 shadow-lg flex flex-col items-center">
              <IconoCard tipo="document" className="w-12 h-12 mb-4" />
              <p className="text-center">
                Acceso a sectores estratégicos con respaldo institucional y oportunidades validadas.
              </p>
            </div>
            {/* Tarjeta 3 */}
            <div className="bg-white text-[#333] rounded-xl p-6 shadow-lg flex flex-col items-center">
              <IconoCard tipo="acompanamiento" className="w-12 h-12 mb-4" />
              <p className="text-center">
                Posibilidad de aplicar a la residencia permanente para usted, su cónyuge e hijos menores de 21 años.
              </p>
            </div>
          </div>
        </section>
        <section id="formulario-eb5" className="w-full bg-[#ededed] py-16 px-4 flex flex-col md:flex-row justify-center items-center gap-12 mt-12">
          {/* Texto informativo */}
          <div className="max-w-md text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1161A9] mb-4 leading-tight">
              Cuéntenos sobre su <span className="text-[#0074a6]">perfil<br />como inversionista.</span>
            </h2>
            <p className="text-lg text-black mb-4">
              Queremos conocer su nacionalidad, tipo de inversión y objetivos empresariales para determinar si el programa EB-5 es el camino adecuado para usted.
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
                onChange={handleChange}
                style={{ maxWidth: '100%', marginBottom: '0' }}
              />
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                className="flex-1 p-3 rounded-lg bg-white border-none outline-none text-black"
                value={form.apellido}
                onChange={handleChange}
                style={{ maxWidth: '100%', marginTop: '0.5rem' }}
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
              <span className="text-black">Confirmo que he leído y acepto los términos del proceso Programa de Inversión Visa EB-5</span>
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
        </section>
        {/* Mensaje superior en fondo blanco */}
        <section className="w-full bg-white py-16 px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-900 leading-snug max-w-4xl mx-auto">
            Una decisión estratégica puede transformar su futuro.<br />
            <span className="font-normal">
              Evalúe su perfil como inversionista extranjero y conozca las condiciones<br />
              para aplicar a un programa migratorio sólido, respaldado y conforme con la ley.
            </span>
          </h2>
          <div className="w-20 h-0.5 bg-gray-400 mx-auto mt-6" />
        </section>

        {/* Acompañamiento continuo con imagen de fondo */}
        <section
          className="w-full py-24 px-4 text-center text-white bg-cover bg-center"
          style={{ backgroundImage: "url('/Acompañamiento Continuo.png')" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-cyan-400">ACOMPAÑAMIENTO</span> CONTINUO:
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-lg">
            Recuerde que durante todo el proceso, recibirá acompañamiento periódico de nuestros especialistas, quienes se asegurarán de mantenerlo informado sobre el progreso de su solicitud y de las novedades relevantes.
          </p>
        </section>
        <FamiliasMigrantesSection />
      </main>
      <FormacionSliderSection />
    </>
  );
} 