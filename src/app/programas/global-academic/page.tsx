import React from 'react';
import Image from 'next/image';
import FormacionSliderSection from '@/components/FormacionSliderSection';
import FormF1Section from '@/components/FormF1Section';
import AcompanamientoContinuo from '@/components/AcompanamientoContinuo';
import FamiliasMigrantesSection from '../../../components/FamiliasMigrantesSection';

export default function GlobalAcademic() {
  return (
    <>
      <section className="w-full flex flex-col lg:flex-row bg-white min-h-[480px]">
        {/* Imagen a la izquierda, más angosta */}
        <div className="relative w-full lg:w-[40%] min-h-[340px] lg:min-h-[480px]">
          <Image
            src="/Global Academic.png"
            alt="Global Academic"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        {/* Contenido a la derecha, más ancho */}
        <div className="w-full lg:w-[60%] flex flex-col justify-center px-8 py-12 lg:py-0 lg:pl-16 lg:pr-24 bg-white">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#005c82] mb-2 mt-[1.8cm]" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
            Programa F-1 - Global Academic
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-black mb-4" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
            Estudie en instituciones académicas acreditadas en EE. UU.
          </h2>
          <p className="text-base md:text-lg text-gray-800 mb-6" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
            Facilitamos el proceso de admisión y visado F-1 para estudiantes internacionales que buscan acceder a programas académicos formales en Estados Unidos. Nuestro acompañamiento asegura cumplimiento normativo, asesoría educativa y una experiencia migratoria planificada.
          </p>
          <button className="bg-[#005c82] text-white font-semibold px-8 py-3 rounded-lg text-lg shadow hover:bg-[#003b5c] transition-all w-fit mb-8">
            Postúlese ahora
          </button>
          <div className="w-full h-1 bg-cyan-300 rounded mb-8" />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 w-full">
            <div className="flex-1" />
            <div className="flex flex-col items-end">
              <span className="text-base md:text-lg text-black mb-1 text-right" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
                Inicie su <span className="font-bold">proceso de admisión.</span>
              </span>
              <span className="text-[#005c82] font-extrabold text-lg md:text-2xl text-right leading-tight" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
                PROGRAMA DE FORMACIÓN<br className="hidden md:block" />
                ACADÉMICA INTERNACIONAL <span className="text-2xl md:text-4xl align-middle">F-1</span>
              </span>
            </div>
          </div>
        </div>
      </section>
      <FormacionSliderSection />
      <FormF1Section />
      <AcompanamientoContinuo />
      <FamiliasMigrantesSection />
    </>
  );
} 