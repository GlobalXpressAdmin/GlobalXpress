import React from "react";

const requirements = [
  {
    title: "Perfil del candidato:",
    text: "El perfil ideal para este programa es el de un migrante calificado, con formación técnica, tecnológica o profesional, y una edad entre 18 y 56 años.",
  },
  {
    title: "Inversión mínima:",
    text: "Este programa requiere una inversión desde $18,990 USD para cubrir costos administrativos, certificaciones y trámites migratorios.",
  },
  {
    title: "Inglés básico recomendado:",
    text: "No es obligatorio para la mayoría de nuestros patrocinadores, pero un mejor dominio del idioma facilitará su integración y crecimiento profesional.",
  },
  {
    title: "Historial migratorio limpio:",
    text: "El candidato no debe tener antecedentes de deportaciones, estancias irregulares prolongadas ni violaciones migratorias previas en EE. UU.",
  },
  {
    title: "Tiempo estimado:",
    text: "Los plazos y requisitos pueden variar según los entes gubernamentales que intervienen en el proceso, como el DOL, migración y las embajadas de cada país.",
  },
  {
    title: "Condiciones óptimas de salud:",
    text: "El candidato debe gozar de buena salud, sin enfermedades infectocontagiosas, y estar apto para desempeñar sus tareas sin limitaciones.",
  },
  {
    title: "Compromiso laboral:",
    text: "Se requiere trabajar con el patrocinador por al menos un año, respetando los términos del contrato.",
  },
];

export default function EB3Requirements() {
  return (
    <section className="bg-white py-12 px-2 md:px-0">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <h2 className="text-2xl md:text-4xl font-bold mb-8 flex items-center gap-2">
          <span className="text-[#00d6f7] relative">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="absolute -left-8 top-0 hidden md:block">
              <circle cx="6" cy="6" r="6" fill="#00d6f7" />
              <circle cx="16" cy="6" r="6" fill="#00d6f7" />
              <circle cx="26" cy="6" r="6" fill="#00d6f7" />
            </svg>
          </span>
          Requisitos para <span className="text-[#0070b8]">aplicar a la visa EB-3</span>
        </h2>
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {requirements.map((req, idx) => (
            <div key={idx} className="relative border-2 border-[#00d6f7] rounded-xl p-6 bg-white flex flex-col items-start min-h-[220px]">
              {/* Check grande */}
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="absolute -top-8 left-1/2 -translate-x-1/2">
                <path d="M14 30l8 8 20-20" stroke="#00d6f7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="font-bold text-lg mb-2 mt-6 text-black">{req.title}</h3>
              <p className="text-base text-gray-800">{req.text}</p>
            </div>
          ))}
        </div>
        {/* Franja Importante */}
        <div className="mt-8">
          <div className="flex items-center mb-2">
            <span className="bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white font-bold px-4 py-2 rounded-l-lg text-lg shadow-md">Importante:</span>
            <div className="flex-1 h-2 bg-gradient-to-r from-[#1e3c72] to-transparent rounded-r-lg" />
          </div>
          <p className="text-black text-base mt-2">
            El programa EB-3 es un proceso regulado por el <span className="font-bold">Departamento de Trabajo de EE. UU. (DOL) y USCIS</span>, por lo que los tiempos y requisitos pueden variar según la normativa vigente.
          </p>
        </div>
      </div>
    </section>
  );
} 