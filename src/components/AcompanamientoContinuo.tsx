import Image from "next/image";

export default function AcompanamientoContinuo() {
  return (
    <section className="w-full bg-white">
      {/* Bloque de acompañamiento continuo */}
      <div className="relative w-full min-h-[340px] flex items-center justify-center" style={{background: '#222'}}>
        {/* Imagen de fondo desenfocada y oscurecida */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Acompañamiento Continuo.png"
            alt="Acompañamiento Continuo"
            fill
            className="object-cover object-center blur-sm"
            style={{filter: 'blur(2px)'}}
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        {/* Contenido */}
        <div className="relative z-10 max-w-4xl mx-auto text-center py-16 px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
            <span className="text-cyan-300">ACOMPAÑAMIENTO</span> <span className="text-white">CONTINUO:</span>
          </h2>
          <p className="text-2xl md:text-2xl text-white font-normal mt-2" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
            Recuerde que durante todo el proceso, recibirá acompañamiento periódico de nuestros especialistas, quienes se asegurarán de mantenerlo informado sobre el progreso de su solicitud y de las novedades relevantes.
          </p>
        </div>
      </div>
    </section>
  );
} 