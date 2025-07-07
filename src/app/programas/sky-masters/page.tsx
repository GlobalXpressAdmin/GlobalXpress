'use client';
import React, { useState } from 'react';
// import Footer from '@/components/Footer';
import AeronauticSection from '@/components/AeronauticSection';
import AcompanamientoContinuo from '@/components/AcompanamientoContinuo';
import FamiliasMigrantesSection from '../../../components/FamiliasMigrantesSection';
import FormacionSliderSection from '../../../components/FormacionSliderSection';
import { FaPhone } from 'react-icons/fa';

export default function SkyMasters() {
  return (
    <main className="pt-10">
      {/* Hero dividido en dos columnas, imagen a la izquierda */}
      <section className="w-full flex flex-col md:flex-row bg-white min-h-[320px] md:min-h-[480px]">
        {/* Imagen izquierda */}
        <div className="md:w-1/2 w-full relative min-h-[320px] md:min-h-[480px] flex items-center justify-center bg-white">
          <img
            src="/sky-masters.png"
            alt="Sky Masters"
            className="w-auto h-full max-h-[480px] object-contain"
            style={{objectPosition: 'center'}}
          />
        </div>
        {/* Contenido derecho */}
        <div className="md:w-1/2 w-full flex flex-col justify-center p-4 md:p-8">
          <h1 className="text-2xl md:text-4xl font-bold text-blue-900 mb-2 leading-tight">
            Programa Sky Masters–<span className="text-[#0070b8]">Pilotos Internacionales</span>
          </h1>
          <h2 className="text-base md:text-xl font-bold text-black mb-2">Pilotos internacionales, el cielo de EE. UU. también es su destino profesional.</h2>
          <p className="text-sm md:text-lg text-gray-800 mb-2">
            Conectamos a pilotos formados en el extranjero con aerolíneas estadounidenses.<br/>
            Gestionamos procesos de elegibilidad migratoria y certificación para facilitar su transición laboral bajo visa de trabajo.
          </p>
          <button className="bg-blue-900 text-white font-semibold px-6 py-2 rounded hover:bg-blue-800 transition w-fit mb-4">Postúlese ahora</button>
          <div className="mt-4 border-t-4 border-cyan-400 pt-2 text-right">
            <p className="text-gray-800 text-sm md:text-base">
              Solicite una <span className="font-bold">evaluación profesional.</span>
            </p>
            <p className="text-right font-bold text-blue-900 text-base md:text-lg leading-tight mt-1">
              PROGRAMA DE LICENCIA COMERCIAL PARA PILOTOS INTERNACIONALES <br />
              <span className="text-lg md:text-xl text-[#0070b8]">SkyMasters</span>
            </p>
          </div>
        </div>
      </section>
      <FormacionSliderSection />
      {/* Sección Aeronáutica (carrusel) */}
      <AeronauticSection />
      {/* Sección de validación profesional */}
      <section className="w-full bg-[#e9eaeb] py-12 px-2 md:px-0">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Lado izquierdo: título y descripción */}
          <div className="flex flex-col justify-center items-start px-4 md:px-0">
            <h2 className="text-4xl md:text-5xl font-bold text-[#00628e] mb-6 leading-tight text-left" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
              Inicie su proceso de<br />validación profesional<br />en EE. UU.
            </h2>
            <p className="text-lg text-black mb-4 text-left" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
              Queremos conocer su perfil como piloto, sus certificaciones actuales y sus<br />objetivos laborales para brindarle una ruta clara de elegibilidad.
            </p>
          </div>
          {/* Lado derecho: formulario funcional */}
          <FormValidacionSkyMasters />
        </div>
      </section>
      {/* Sección de oportunidad global */}
      <section className="w-full bg-white py-12 px-2 md:px-0">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#00628e] mb-4" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
            Convierta su trayectoria aérea en una oportunidad global
          </h2>
          <p className="text-2xl md:text-3xl text-[#00628e] font-normal mb-8" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
            El mercado aeronáutico estadounidense busca talento internacional con visión, experiencia<br />
            y respaldo. Si usted cumple con los requisitos, estamos listos para acompañarlo.
          </p>
          <hr className="border-t-2 border-gray-400 w-3/4 mx-auto my-8" />
        </div>
      </section>
      {/* Sección de acompañamiento continuo */}
      <AcompanamientoContinuo />
      <FamiliasMigrantesSection />
      {/* <Footer /> */}
    </main>
  );
}

// COMPONENTE DEL FORMULARIO FUNCIONAL
function FormValidacionSkyMasters() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    visa: '',
    mensaje: '',
    terminos: false,
  });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' && 'checked' in e.target ? (e.target as HTMLInputElement).checked : undefined;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRadio = (value: string) => {
    setForm(prev => ({ ...prev, visa: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!form.nombre || !form.apellido || !form.email || !form.telefono || !form.visa || !form.mensaje || !form.terminos) {
      setError('Por favor complete todos los campos y acepte los términos.');
      return;
    }
    setEnviado(true);
    // Aquí puedes enviar los datos a tu API o servicio
  };

  if (enviado) {
    return <div className="text-green-700 font-bold text-center py-8">¡Formulario enviado correctamente!</div>;
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          className="flex-1 p-3 rounded bg-white text-black placeholder-gray-500 outline-none"
          value={form.nombre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          className="flex-1 p-3 rounded bg-white text-black placeholder-gray-500 outline-none"
          value={form.apellido}
          onChange={handleChange}
        />
      </div>
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        className="p-3 rounded bg-white text-black placeholder-gray-500 outline-none"
        value={form.email}
        onChange={handleChange}
      />
      {/* Teléfono con ícono */}
      <div className="flex items-center bg-white rounded p-3 gap-2">
        <FaPhone className="text-gray-400 mr-2" />
        <span className="text-gray-700 font-semibold mr-2">+57</span>
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          className="flex-1 bg-transparent outline-none text-black"
          value={form.telefono}
          onChange={handleChange}
        />
      </div>
      {/* ¿Dispone de visa? */}
      <div className="flex items-center gap-2">
        <span className="text-gray-700 font-semibold">¿Dispone de visa?</span>
        <button
          type="button"
          className={`border-2 rounded-full px-6 py-1 font-bold ${form.visa === 'SI' ? 'border-[#005c82] text-[#005c82] bg-white' : 'border-[#005c82] text-[#005c82] bg-transparent'}`}
          onClick={() => handleRadio('SI')}
        >
          SI
        </button>
        <button
          type="button"
          className={`border-2 rounded-full px-6 py-1 font-bold ${form.visa === 'NO' ? 'border-[#005c82] text-[#005c82] bg-white' : 'border-[#005c82] text-[#005c82] bg-transparent'}`}
          onClick={() => handleRadio('NO')}
        >
          NO
        </button>
      </div>
      <textarea
        name="mensaje"
        placeholder="Escriba su mensaje"
        className="p-3 rounded bg-white text-black placeholder-gray-500 outline-none min-h-[80px]"
        value={form.mensaje}
        onChange={handleChange}
      />
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
        <a href="#" className="text-[#005c82] font-bold underline">Términos y Condiciones</a>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="terminos"
            id="terminos"
            className="w-6 h-6 rounded-full border-2 border-black"
            checked={form.terminos}
            onChange={handleChange}
          />
          <label htmlFor="terminos" className="text-black text-sm">
            Confirmo que he leído y acepto los términos del proceso Programa Sky Masters– Pilotos Internacionales
          </label>
        </div>
      </div>
      {error && <div className="text-red-600 text-sm font-semibold">{error}</div>}
      <button
        type="submit"
        className="bg-[#005c82] text-white font-bold py-3 rounded-full mt-2 text-lg hover:bg-[#003d56] transition-all"
      >
        Enviar formulario
      </button>
    </form>
  );
} 