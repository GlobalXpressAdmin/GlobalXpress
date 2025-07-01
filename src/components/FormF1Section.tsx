'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';

export default function FormF1Section() {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let fieldValue: string | boolean = value;
    if (type === 'checkbox') {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.nombre || !form.apellido || !form.email || !form.telefono || !form.visa || !form.terminos) {
      setError('Por favor complete todos los campos y acepte los términos.');
      return;
    }
    setError('');
    setEnviado(true);
    console.log(form);
    setTimeout(() => setEnviado(false), 3000);
  };

  return (
    <section className="w-full bg-[#ededed] py-16 px-2 md:px-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
        {/* Texto a la izquierda */}
        <div className="flex-1 max-w-xl mb-10 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#006494] mb-4" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
            Proyecte su <span className="font-black">futuro académico</span> en <br />Estados Unidos.
          </h2>
          <p className="text-lg text-[#222]" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
            Nuestro equipo le orientará en la elección del programa educativo, la institución adecuada y la preparación de su solicitud F-1.
          </p>
        </div>
        {/* Formulario a la derecha */}
        <form onSubmit={handleSubmit} className="flex-1 max-w-xl w-full bg-transparent flex flex-col gap-4">
          <div className="flex gap-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              className="flex-1 rounded-lg bg-white px-4 py-3 text-lg outline-none border-none"
              value={form.nombre}
              onChange={handleChange}
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              className="flex-1 rounded-lg bg-white px-4 py-3 text-lg outline-none border-none"
              value={form.apellido}
              onChange={handleChange}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="rounded-lg bg-white px-4 py-3 text-lg outline-none border-none"
            value={form.email}
            onChange={handleChange}
          />
          {/* Teléfono con selector visual */}
          <div className="flex items-center bg-white rounded-lg px-4 py-3">
            <span className="mr-2 flex items-center gap-1">
              <img src="https://flagcdn.com/co.svg" alt="Colombia" className="w-6 h-4 rounded-sm" />
              <span className="text-[#222] font-semibold">+57</span>
            </span>
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              className="flex-1 bg-transparent outline-none border-none text-lg"
              value={form.telefono}
              onChange={handleChange}
            />
          </div>
          {/* Visa toggle */}
          <div className="flex items-center gap-4">
            <span className="text-[#888] text-base">¿Dispone de visa?</span>
            <button
              type="button"
              className={`px-6 py-1 rounded-full border-2 text-lg font-bold transition ${form.visa === 'SI' ? 'bg-[#006494] text-white border-[#006494]' : 'bg-white text-[#006494] border-[#006494]'}`}
              onClick={() => handleVisa('SI')}
            >
              SI
            </button>
            <button
              type="button"
              className={`px-6 py-1 rounded-full border-2 text-lg font-bold transition ${form.visa === 'NO' ? 'bg-[#006494] text-white border-[#006494]' : 'bg-white text-[#006494] border-[#006494]'}`}
              onClick={() => handleVisa('NO')}
            >
              NO
            </button>
          </div>
          <textarea
            name="mensaje"
            placeholder="Escriba su mensaje"
            className="rounded-lg bg-white px-4 py-3 text-lg outline-none border-none min-h-[80px]"
            value={form.mensaje}
            onChange={handleChange}
          />
          {/* Términos y condiciones */}
          <div className="flex items-center gap-2 mt-2">
            <a href="#" className="text-[#006494] font-bold underline text-base" target="_blank" rel="noopener noreferrer">
              Términos y Condiciones
            </a>
            <input
              type="checkbox"
              name="terminos"
              checked={form.terminos}
              onChange={handleChange}
              className="w-5 h-5 accent-[#006494]"
            />
            <span className="text-[#222] text-base">Confirmo que he leído y acepto los términos del Programa F-1 Global Academic</span>
          </div>
          {error && <div className="text-red-600 text-sm font-bold mt-1">{error}</div>}
          {enviado && <div className="text-green-600 text-sm font-bold mt-1">¡Formulario enviado correctamente!</div>}
          <button
            type="submit"
            className="mt-4 bg-[#006494] text-white font-bold text-lg rounded-full py-3 w-full hover:bg-[#005c82] transition-all"
          >
            Enviar formulario
          </button>
        </form>
      </div>
    </section>
  );
} 