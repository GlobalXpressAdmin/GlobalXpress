'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import PhoneInputPro from './PhoneInputPro';
import LegalModal from './LegalModal';

export default function FormF1Section({ id }: { id?: string }) {
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.nombre || !form.apellido || !form.email || !form.telefono || !form.visa || !form.terminos) {
      setError('Por favor complete todos los campos y acepte los términos.');
      setIntentoEnvio(true);
      return;
    }
    setError('');
    setSuccess('');
    setIntentoEnvio(false);
    try {
      const res = await fetch('/api/formularios-programa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, programa: 'GLOBAL_ACADEMIC' }),
      });
      const data = await res.json();
      if (data.ok) {
        setSuccess('¡Formulario enviado correctamente!');
        setForm({ nombre: '', apellido: '', email: '', telefono: '', visa: '', mensaje: '', terminos: false });
      } else {
        setError(data.error || 'Error al enviar el formulario.');
      }
    } catch {
      setError('Error de conexión.');
    }
  };

  return (
    <section id={id} className="w-full bg-[#ededed] py-16 px-2 md:px-0">
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
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4 mx-auto px-2" style={{maxWidth: '100%'}}>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              className="flex-1 rounded-lg bg-white px-3 py-3 text-lg outline-none border-none"
              value={form.nombre}
              onChange={handleChange}
              style={{ maxWidth: '100%', marginBottom: '0' }}
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              className="flex-1 rounded-lg bg-white px-3 py-3 text-lg outline-none border-none"
              value={form.apellido}
              onChange={handleChange}
              style={{ maxWidth: '100%', marginTop: '0.5rem' }}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="rounded-lg bg-white px-3 py-3 text-lg outline-none border-none"
            value={form.email}
            onChange={handleChange}
          />
          {/* Teléfono profesional sin icono ni prefijo */}
          <div className="w-full">
            <PhoneInputPro
              value={form.telefono}
              onChange={telefono => setForm(prev => ({ ...prev, telefono }))}
              required
              className="w-full"
              bgClass="!bg-white"
              labelClass="block text-gray-500 text-sm mb-1 ml-1 font-semibold"
              helpTextClass="block text-xs text-gray-400 mt-2 ml-1"
              showAsterisk={false}
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
            className="rounded-lg bg-white px-3 py-3 text-lg outline-none border-none min-h-[80px]"
            value={form.mensaje}
            onChange={handleChange}
          />
          {/* Términos y condiciones */}
          <div className="flex items-center gap-2 mt-2">
            <a href="#" className="text-[#006494] font-bold underline text-base" target="_blank" rel="noopener noreferrer" onClick={e => { e.preventDefault(); setShowLegal(true); }}>Términos y Condiciones</a>
            <input
              type="checkbox"
              name="terminos"
              checked={form.terminos}
              onChange={handleChange}
              className={`w-5 h-5 accent-[#006494] border-2 ${intentoEnvio && !form.terminos ? 'border-red-500' : 'border-[#006494]'}`}
            />
            <span className="text-[#222] text-base">Confirmo que he leído y acepto los términos del Programa F-1 Global Academic</span>
            {intentoEnvio && !form.terminos && (
              <span className="text-red-600 text-xs font-bold ml-2">* Obligatorio para enviar</span>
            )}
          </div>
          {error && <div className="text-red-600 text-sm font-bold mt-1">{error}</div>}
          {success && <div className="text-green-600 text-sm font-bold mt-1">{success}</div>}
          <button
            type="submit"
            className="mt-4 bg-[#006494] text-white font-bold text-base rounded-full py-3 w-full whitespace-normal break-words hover:bg-[#005c82] transition-all"
          >
            Enviar formulario
          </button>
        </form>
      </div>
      <LegalModal open={showLegal} onClose={() => setShowLegal(false)} />
    </section>
  );
} 