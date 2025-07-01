import React from 'react';

const fuentes = [
  {
    nombre: 'Playfair Display',
    css: "'Playfair Display', serif",
  },
  {
    nombre: 'Merriweather',
    css: "'Merriweather', serif",
  },
  {
    nombre: 'Lora',
    css: "'Lora', serif",
  },
  {
    nombre: 'Cormorant Garamond',
    css: "'Cormorant Garamond', serif",
  },
  {
    nombre: 'Libre Baskerville',
    css: "'Libre Baskerville', serif",
  },
  {
    nombre: 'EB Garamond',
    css: "'EB Garamond', serif",
  },
  {
    nombre: 'DM Serif Display',
    css: "'DM Serif Display', serif",
  },
  {
    nombre: 'Quicksand',
    css: "'Quicksand', sans-serif",
  },
  {
    nombre: 'Montserrat',
    css: "'Montserrat', sans-serif",
  },
  {
    nombre: 'Raleway',
    css: "'Raleway', sans-serif",
  },
  {
    nombre: 'Poppins',
    css: "'Poppins', sans-serif",
  },
  {
    nombre: 'Nunito',
    css: "'Nunito', sans-serif",
  },
  {
    nombre: 'Source Serif Pro',
    css: "'Source Serif Pro', serif",
  },
  {
    nombre: 'Bodoni Moda',
    css: "'Bodoni Moda', serif",
  },
  {
    nombre: 'Inter',
    css: "'Inter', sans-serif",
  },
];

const parrafo = "¿Le gustaría formar parte de un equipo internacional, innovador y comprometido con el desarrollo profesional y humano? En Global Express Recruiting buscamos personas apasionadas, responsables y con vocación de servicio para unirse a nuestro equipo.";

export default function TrabajeConNosotros() {
  return (
    <section className="min-h-screen bg-white py-16 px-4 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#1161A9] mb-10 text-center">Muestra de Fuentes Elegantes</h1>
      <div className="w-full max-w-3xl space-y-10">
        {fuentes.map((fuente, idx) => (
          <div key={fuente.nombre} className="border-b pb-6 mb-6">
            <div style={{ fontFamily: fuente.css, fontSize: '1.25rem', color: '#222', lineHeight: 1.6 }}>
              {parrafo}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              <span className="font-semibold text-[#1161A9]">{fuente.nombre}</span> —
              <span className="ml-2">CSS: <code>{fuente.css}</code></span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 