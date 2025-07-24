import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full max-w-7xl mx-auto h-[260px] sm:h-[340px] md:h-[520px] flex items-center overflow-hidden">
      {/* Imagen de fondo */}
      <Image
        src="/fondosuperior.png"
        alt="Fondo superior"
        fill
        className="object-cover object-center z-0"
        priority
      />
      {/* Overlay azul con ángulo menos pronunciado y un poco más a la derecha */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'rgba(13, 54, 110, 0.65)',
          clipPath: 'polygon(0 0, 60% 0, 45% 100%, 0% 100%)',
        }}
      />
      {/* Contenido */}
      <div className="relative z-20 flex flex-col justify-center h-full pl-2 sm:pl-6 md:pl-20 w-full max-w-full sm:max-w-md md:max-w-xl">
        <h1 className="text-lg sm:text-2xl md:text-5xl font-extrabold text-white leading-tight mb-2 sm:mb-4 break-words">
          CONSTRUYA SU <span className="text-[#00E6F6]">FUTURO</span>
          <br />EN LOS ESTADOS UNIDOS
        </h1>
        <p className="text-white text-xs sm:text-base mb-4 sm:mb-8 break-words">
          Seguridad, estabilidad y respaldo legal<br />para su nuevo comienzo.
        </p>
      </div>
    </section>
  );
} 