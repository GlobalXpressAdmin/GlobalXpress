import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full h-[480px] md:h-[520px] flex items-center overflow-hidden">
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
          clipPath: 'polygon(0 0, 45% 0, 35% 100%, 0% 100%)',
        }}
      />
      {/* Contenido */}
      <div className="relative z-20 flex flex-col justify-center h-full pl-8 md:pl-20 max-w-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
          CONSTRUYA SU <span className="text-[#00E6F6]">FUTURO</span>
          <br />EN LOS ESTADOS UNIDOS
        </h1>
        <p className="text-white text-lg mb-8">
          Seguridad, estabilidad y respaldo legal<br />para su nuevo comienzo.
        </p>
      </div>
    </section>
  );
} 