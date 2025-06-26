'use client';

import { useState } from "react";

const valores = [
  {
    linea1: "ÉTICA",
    linea2: "Y TRANSPARENCIA",
    descripcion: "Mantenemos la integridad y la transparencia en cada paso, asegurando que tanto candidatos como empresas reciban información clara, veraz y confiable durante todo el proceso."
  },
  { linea1: "CUMPLIMIENTO", linea2: "NORMATIVO", descripcion: "" },
  { linea1: "EXCELENCIA EN", linea2: "SELECCIÓN", descripcion: "" },
  { linea1: "COMPROMISO CON", linea2: "EL CANDIDATO", descripcion: "" },
  { linea1: "INNOVACIÓN Y", linea2: "ADAPTABILIDAD", descripcion: "" },
];

export default function SobreNosotros() {
  const [valorActivo, setValorActivo] = useState(0);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Encabezado con imagen de fondo */}
      <div className="relative h-[500px] w-full flex items-end mb-8">
        <img
          src="/quienessomos.png"
          alt="Fondo Sobre Nosotros"
          className="absolute inset-0 w-full h-full object-contain object-top"
        />
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 p-8 md:p-16">
          <h1 className="text-5xl font-bold text-cyan-400 mb-2">NOSOTROS</h1>
          <div className="w-24 h-1 bg-cyan-400 mt-2"></div>
        </div>
      </div>

      {/* Visión y Misión en dos columnas */}
      <div className="py-4 px-8 md:px-24 flex flex-col md:flex-row gap-8 items-start">
        {/* Columna de texto */}
        <div className="max-w-xl w-full">
          <h2 className="text-3xl font-bold text-cyan-700 mb-2 text-left">Visión</h2>
          <p className="text-lg text-gray-700 text-justify leading-relaxed mb-8">
            Impulsar oportunidades de desarrollo profesional a través de procesos migratorios laborales legales hacia Estados Unidos, conectando personas con talento excepcional con compañías de prestigio, bajo estándares de seguridad, eficiencia y conformidad con la legislación migratoria estadounidense.
          </p>
          <h2 className="text-3xl font-bold text-cyan-700 mb-2 text-left">Misión</h2>
          <p className="text-lg text-gray-700 text-justify leading-relaxed">
            Consolidarnos como la agencia de reclutamiento más confiable en la movilización de talento internacional hacia Estados Unidos, distinguiéndonos por nuestro apego normativo, calidad operativa y profundo compromiso con el impacto positivo que genera la migración laboral en la vida de las personas.
          </p>
        </div>
        {/* Columna de imagen (espacio reservado) */}
        <div className="flex-1 w-full flex justify-center items-start">
          {/* Aquí puedes poner la imagen que desees */}
          <div className="w-72 h-72 bg-gray-100 rounded-xl border-2 border-dashed border-cyan-200 flex items-center justify-center">
            <span className="text-cyan-400">Imagen aquí</span>
          </div>
        </div>
      </div>

      {/* Valores - Tabs */}
      <div className="py-8 px-2 md:px-4 w-full">
        <h2 className="text-3xl font-bold text-cyan-700 mb-6 text-left md:px-24">Nuestros Valores</h2>
        <div className="flex flex-row gap-4 flex-wrap md:flex-nowrap w-full relative">
          {valores.map((valor, idx) => (
            <div
              key={valor.linea1 + valor.linea2}
              className="flex flex-col items-center flex-1 min-w-[250px] max-w-xs"
            >
              <button
                onClick={() => setValorActivo(idx)}
                className={`rounded-lg w-full py-4 text-center font-bold text-lg transition-colors duration-200 flex flex-col items-center justify-center
                  ${valorActivo === idx
                    ? "bg-cyan-700 text-white shadow"
                    : "bg-gray-100 text-cyan-700 hover:bg-cyan-100"}
                `}
              >
                <span className="block">{valor.linea1}</span>
                <span className="block">{valor.linea2}</span>
              </button>
              {valorActivo === idx && (
                <div className="bg-gray-100 rounded-b-xl p-6 w-full text-gray-700 text-left text-base leading-relaxed shadow -mt-1">
                  {valor.descripcion}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 