import Image from "next/image";
import Link from "next/link";

export default function EligibilitySection() {
  return (
    <section className="w-full flex flex-col lg:flex-row items-stretch bg-[#005c82] min-h-[350px]">
      {/* Imagen con overlay, más pequeña en desktop */}
      <div className="relative w-full lg:w-[38%] min-h-[220px] h-[220px] lg:h-auto">
        <Image
          src="/¿Cumple con los requisitos.png"
          alt="Reunión de asesoría Global Express"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      {/* Bloque de texto y puntos decorativos */}
      <div className="relative w-full lg:w-[62%] flex flex-col justify-center px-8 py-10 lg:py-0 lg:pl-16 lg:pr-24">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-6 text-left" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
            ¿Cumple con los requisitos? <span className="font-light">Dé el siguiente paso</span>
          </h2>
          <p className="text-lg md:text-xl text-white mb-8 font-normal text-left" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
            Verifique su elegibilidad y comience su proceso de residencia en EE. UU.<br />
            Postúlese hoy y dé el primer paso hacia su nueva vida.
          </p>
          <div className="flex flex-col items-start">
            <Link href="/todas-vacantes">
              <button className="bg-white text-[#005c82] font-semibold px-8 py-3 rounded-lg text-lg shadow hover:bg-gray-100 transition-all">
                APLICAR AHORA
              </button>
            </Link>
          </div>
        </div>
        {/* Puntos decorativos a la derecha */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 pr-8">
          <div className="flex flex-col items-center gap-1">
            <div className="flex gap-2 mb-1">
              <span className="w-2.5 h-2.5 bg-cyan-300 rounded-full block" />
              <span className="w-2.5 h-2.5 bg-cyan-300 rounded-full block" />
              <span className="w-2.5 h-2.5 bg-cyan-300 rounded-full block" />
            </div>
            <div className="flex gap-2 mb-1">
              <span className="w-2.5 h-2.5 bg-cyan-300 rounded-full block" />
              <span className="w-2.5 h-2.5 bg-cyan-300 rounded-full block" />
            </div>
            <div className="flex gap-2 mb-1">
              <span className="w-2.5 h-2.5 bg-cyan-300 rounded-full block" />
            </div>
            <div className="flex gap-2 mb-1">
              <span className="w-2.5 h-2.5 bg-cyan-300 rounded-full block" />
              <span className="w-2.5 h-2.5 bg-cyan-300 rounded-full block" />
            </div>
            <div className="flex gap-2">
              <span className="w-2.5 h-2.5 bg-cyan-300 rounded-full block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 