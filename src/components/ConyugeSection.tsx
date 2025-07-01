export default function ConyugeSection() {
  return (
    <section className="w-full bg-white py-12 px-6 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
      {/* Imagen circular */}
      <div className="relative w-[280px] h-[280px] flex-shrink-0">
        <div className="absolute inset-0 rounded-full border-[4px] border-cyan-400"></div>
        <img
          src="/empleo en EE. UU..png"
          alt="Empleo en EE. UU."
          className="rounded-full object-cover w-full h-full"
        />
      </div>

      {/* Contenido de texto */}
      <div className="max-w-xl text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-[#003865] leading-tight">
          ¿SU CÓNYUGE TAMBIÉN<br />
          NECESITA <span className="font-extrabold">EMPLEO EN EE. UU.?</span>
        </h2>
        <p className="text-lg text-gray-800 mt-4">
          Descubra cómo podemos ubicarlo laboralmente con nuestro programa
        </p>

        {/* Logo Dual Placement */}
        <h3 className="mt-6 text-3xl font-bold text-[#003865]">
          <span className="bg-[#003865] text-white px-2">DUAL</span>
          <span className="ml-1">Placement</span>
        </h3>

        {/* Botón */}
        <a
          href="#programa-dual"
          className="inline-block mt-6 bg-[#003865] text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-[#002e56] transition"
        >
          IR AL PROGRAMA
        </a>
      </div>
    </section>
  );
} 