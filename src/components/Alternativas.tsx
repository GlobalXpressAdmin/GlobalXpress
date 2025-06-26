'use client';

import React, { useState } from 'react';

const secciones = [
  {
    label: 'Residencia por oferta laboral',
    content: (
      <div>
        <p className="mb-6 text-base md:text-lg">
          Existen diferentes categorías de visas de residencia según su perfil y objetivos.<br />
          Seleccione la opción adecuada para conocer los requisitos y el proceso de solicitud.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="bg-white text-[#075985] rounded-lg p-4 flex-1 shadow font-bold min-w-[160px]">
            <div className="text-lg md:text-xl font-bold mb-1">Visa EB-2 NIW</div>
            <div className="text-sm font-normal text-[#075985]">Para profesiones con impacto en EE. UU.</div>
          </div>
          <div className="bg-white text-[#075985] rounded-lg p-4 flex-1 shadow font-bold min-w-[160px]">
            <div className="text-lg md:text-xl font-bold mb-1">Visa EB-3</div>
            <div className="text-sm font-normal text-[#075985]">Para profesionales de diversos niveles</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: 'Inversión',
    content: (
      <div>
        <p className="mb-6 text-base md:text-lg">
          ¿Está buscando invertir en EE. UU. y establecerse legalmente?<br />
          Conozca las opciones de migración por inversión que le permiten emprender o participar en proyectos estratégicos con respaldo legal.<br />
          Seleccione el tipo de visa que se ajusta a su perfil:
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="bg-white text-[#075985] rounded-lg p-4 flex-1 shadow font-bold min-w-[160px]">
            <div className="text-lg md:text-xl font-bold mb-1">Visa EB-5</div>
            <div className="text-sm font-normal text-[#075985]">Programa de residencia a través de inversión</div>
          </div>
          <div className="bg-white text-[#075985] rounded-lg p-4 flex-1 shadow font-bold min-w-[160px]">
            <div className="text-lg md:text-xl font-bold mb-1">Visa E-2</div>
            <div className="text-sm font-normal text-[#075985]">Para profesionales con títulos avanzados</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: 'Estudio',
    content: (
      <div>
        <p className="mb-6 text-base md:text-lg">
          Proyecte su formación en EE. UU.<br />
          Acceda a instituciones acreditadas bajo el programa <span className="font-bold">Global Academic</span>, con orientación migratoria y académica especializada.<br />
          Seleccione su categoría de estudio:
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="bg-white text-[#075985] rounded-lg p-4 flex-1 shadow font-bold min-w-[160px]">
            <div className="text-lg md:text-xl font-bold mb-1">Visa F-1</div>
            <div className="text-sm font-normal text-[#075985]">Programa de formación académica internacional</div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function Alternativas() {
  const [abierto, setAbierto] = useState(0);

  return (
    <section className="w-full flex flex-col md:flex-row items-stretch justify-between max-w-7xl mx-auto min-h-[520px]">
      {/* Columna izquierda */}
      <div className="flex-1 bg-white p-8 md:p-12 flex flex-col justify-center min-h-[520px] sticky top-0">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1161A9] mb-4 leading-tight">
          Explore las alternativas <br className="hidden md:block" />
          <span className="font-normal text-[#1161A9]">para vivir, trabajar o invertir en EE. UU.</span>
        </h2>
        <p className="text-lg text-gray-800 mb-6">
          Encuentre la alternativa ideal con procesos migratorios confiables y regulados.
        </p>
        <p className="text-base font-semibold text-black mb-4 flex items-center gap-2">
          Seleccione una de las opciones para conocer más detalles.
          <span className="text-[#1161A9] text-2xl">&#187;&#187;</span>
        </p>
      </div>
      {/* Columna derecha: Acordeón */}
      <div className="flex-1 flex flex-col gap-0">
        {secciones.map((sec, idx) => (
          <div key={sec.label} className="border-b border-white/20 last:border-b-0">
            <button
              className={`w-full flex items-center justify-between px-8 md:px-12 py-6 text-left text-2xl md:text-3xl font-semibold transition-colors duration-200 focus:outline-none
                ${abierto === idx ? 'bg-[#075985] text-white' : 'bg-[#e5e7eb] text-[#075985] hover:bg-[#dbeafe]'}`}
              onClick={() => setAbierto(abierto === idx ? -1 : idx)}
              aria-expanded={abierto === idx}
            >
              <span>{sec.label}</span>
              <span className="ml-4 text-3xl">
                {abierto === idx ? (
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="#00E6F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M6 15l6-6 6 6"/></svg>
                ) : (
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="#075985" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6"/></svg>
                )}
              </span>
            </button>
            {abierto === idx && (
              <div className="bg-[#075985] text-white p-8 md:p-12 animate-fade-in">
                {sec.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// Animación fade-in para el contenido desplegado
// Agrega esto a tu CSS global si quieres animación:
// @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
// .animate-fade-in { animation: fade-in 0.4s; } 