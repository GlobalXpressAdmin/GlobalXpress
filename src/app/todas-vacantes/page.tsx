'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

interface Vacante {
  id: string;
  empresa: string;
  cargo: string;
  salario?: string;
  descripcion?: string;
  email?: string;
  workers?: string;
  link?: string;
  creado_en: string;
}

export default function TodasVacantes() {
  const [vacantes, setVacantes] = useState<Vacante[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVacantes = async () => {
      try {
        const response = await fetch('/api/vacantes');
        if (response.ok) {
          const data = await response.json();
          setVacantes(data);
        }
      } catch (error) {
        console.error('Error al cargar vacantes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVacantes();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-12 bg-white min-h-screen">
        <div style={{ height: "50px" }} />
        <h1 className="text-3xl md:text-4xl font-bold text-[#0D4A7A] mb-10 text-center">Todas las vacantes</h1>
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0D4A7A]"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 bg-white min-h-screen">
      <div style={{ height: "50px" }} />
      <h1 className="text-3xl md:text-4xl font-bold text-[#0D4A7A] mb-10 text-center">Todas las vacantes</h1>
      {vacantes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No hay vacantes disponibles en este momento.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-12">
          {vacantes.map((v) => (
            <div key={v.id} className="w-full max-w-md border-2 border-[#0D4A7A] rounded-2xl bg-white p-6 shadow-md flex flex-col gap-1.5 relative mx-auto min-h-[220px]">
              <div className="font-semibold text-lg text-[#0D4A7A] break-words mb-1">{v.empresa}</div>
              <div className="text-xs text-gray-500 mb-1">{v.descripcion}</div>
              <div className="text-sm text-gray-700 mb-1"><b>Cargo:</b> {v.cargo}</div>
              <div className="text-sm text-gray-700 mb-1"><b>Salario:</b> {v.salario || 'No especificado'}</div>
              <div className="text-sm text-gray-700 mb-1"><b>Email:</b> {v.email || 'No especificado'}</div>
              <div className="text-sm text-gray-700 mb-1"><b>Number of Workers Requested:</b> {v.workers || 'No especificado'}</div>
              <div className="mb-2 flex items-center gap-2">
                <a href={v.link || '#'} target="_blank" rel="noopener noreferrer" className="ml-1 flex items-center group">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="11" fill="#22c55e"/>
                    <path d="M8 11h6m0 0l-2.5-2.5M14 11l-2.5 2.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <Link
                  href={`/postulacion?vacante=${v.id}`}
                  className="px-6 py-2 rounded-lg font-bold text-white bg-[#0D4A7A] hover:bg-[#1161A9] transition-colors text-base mt-2"
                  style={{display: 'inline-block'}}
                >
                  Postular ahora
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
} 