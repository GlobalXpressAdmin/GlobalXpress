'use client';

import { useState } from "react";
import { ScaleIcon, DocumentCheckIcon, StarIcon, UserGroupIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

const valores = [
  {
    icon: <ScaleIcon className="w-6 h-6 mb-1 text-cyan-400" />, 
    linea1: "ÉTICA",
    linea2: "Y TRANSPARENCIA",
    descripcion: "Mantenemos la integridad y la transparencia en cada paso, asegurando que tanto candidatos como empresas reciban información clara, veraz y confiable durante todo el proceso."
  },
  {
    icon: <DocumentCheckIcon className="w-6 h-6 mb-1 text-cyan-400" />, 
    linea1: "CUMPLIMIENTO",
    linea2: "NORMATIVO",
    descripcion: "Nos aseguramos de que cada programa de reclutamiento cumpla rigurosamente con las directrices establecidas por el USCIS y el Departamento de Trabajo, garantizando procesos migratorios legales, estructurados y exitosos."
  },
  {
    icon: <StarIcon className="w-6 h-6 mb-1 text-cyan-400" />, 
    linea1: "EXCELENCIA EN",
    linea2: "SELECCIÓN",
    descripcion: "Colaboramos con empresas de alto nivel y seleccionamos a los perfiles más competentes, asegurando una vinculación laboral eficaz y en plena sintonía con las expectativas del empleador."
  },
  {
    icon: <UserGroupIcon className="w-6 h-6 mb-1 text-cyan-400" />, 
    linea1: "COMPROMISO CON",
    linea2: "EL CANDIDATO",
    descripcion: "Acompañamos a cada candidato en cada etapa del proceso migratorio y laboral, brindando orientación y respaldo desde la postulación hasta su integración en el entorno laboral estadounidense."
  },
  {
    icon: <Cog6ToothIcon className="w-6 h-6 mb-1 text-cyan-400" />, 
    linea1: "INNOVACIÓN Y",
    linea2: "ADAPTABILIDAD",
    descripcion: "Respondemos de forma proactiva a los cambios del mercado y las normativas migratorias, diseñando soluciones flexibles y eficientes que beneficien tanto a las empresas como al talento internacional."
  }
];

// Carrusel de testimonios
const testimonios = [
  {
    nombre: "María González",
    texto: "Global Express hizo que el proceso de visa EB-5 fuera increíblemente sencillo. Su equipo profesional me guió en cada paso."
  },
  {
    nombre: "Carlos Mendoza",
    texto: "Excelente servicio y atención personalizada. Lograron mi visa E-2 en tiempo récord. Altamente recomendados."
  },
  {
    nombre: "Ana Castillo",
    texto: "Como familia, buscábamos la mejor opción para emigrar. Global Express nos dio confianza y resultados excepcionales."
  },
  {
    nombre: "Luis Herrera",
    texto: "El programa Sky Masters superó mis expectativas. Ahora tengo una carrera exitosa en la aviación comercial."
  },
  {
    nombre: "Isabella Silva",
    texto: "Gracias a su asesoría en visa EB-2 NIW, pude continuar mi investigación científica en Estados Unidos."
  },
  {
    nombre: "Diego Morales",
    texto: "Proceso transparente y profesional. Su experiencia en visas EB-3 me dio la seguridad que necesitaba."
  },
  {
    nombre: "Valentina Vega",
    texto: "Global Academic abrió las puertas de las mejores universidades para mi hijo. Una inversión que valió la pena."
  },
  {
    nombre: "Roberto Jiménez",
    texto: "Su equipo multilingüe y multicultural entendió perfectamente mis necesidades como empresario internacional."
  },
  {
    nombre: "Carmen Ruiz",
    texto: "Después de años de intentar emigrar, Global Express hizo posible mi sueño americano en solo 18 meses."
  },
  {
    nombre: "Andrés Torres",
    texto: "La atención al detalle y el seguimiento constante hicieron toda la diferencia en mi proceso de visa."
  },
  {
    nombre: "Patricia Mendoza",
    texto: "Como profesional de la salud, necesitaba una visa que reconociera mis credenciales. Lo lograron perfectamente."
  },
  {
    nombre: "Miguel Rojas",
    texto: "Su programa de inversión fue la mejor decisión financiera que tomé. Retorno garantizado y ciudadanía americana."
  },
  {
    nombre: "Sofía Castillo",
    texto: "El equipo de Global Express no solo me ayudó con los trámites, sino que me preparó para mi nueva vida en EE.UU."
  },
  {
    nombre: "Javier Herrera",
    texto: "Proceso eficiente, comunicación clara y resultados excepcionales. Definitivamente los recomiendo a todos."
  },
  {
    nombre: "Lucía Vega",
    texto: "Gracias a Global Express, mi familia y yo tenemos un futuro brillante en Estados Unidos. Servicio de primera clase."
  }
];

function CarruselTestimonios() {
  const [actual, setActual] = useState(0);
  const siguiente = () => setActual((actual + 1) % testimonios.length);
  const anterior = () => setActual((actual - 1 + testimonios.length) % testimonios.length);
  return (
    <section className="bg-[#0D4A7A] py-16 px-4 md:px-24">
      <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10 text-center">
        Lo que dicen <span className="text-[#00E6F6]">las personas</span> sobre nuestro servicio
      </h2>
      <div className="flex justify-center items-center gap-4">
        {/* Flecha izquierda */}
        <button
          onClick={anterior}
          className="p-2 rounded-full bg-white border border-gray-200 shadow hover:bg-cyan-100 transition"
          aria-label="Anterior"
        >
          <span className="text-2xl text-[#0D4A7A]">&#8592;</span>
        </button>
        {/* Caja de testimonio */}
        <div className="bg-white border border-gray-200 rounded-xl shadow p-8 max-w-md min-w-[300px] text-center">
          <p className="text-gray-700 mb-6">&quot;{testimonios[actual].texto}&quot;</p>
          <div className="font-bold text-[#0D4A7A]">— {testimonios[actual].nombre}</div>
        </div>
        {/* Flecha derecha */}
        <button
          onClick={siguiente}
          className="p-2 rounded-full bg-white border border-gray-200 shadow hover:bg-cyan-100 transition"
          aria-label="Siguiente"
        >
          <span className="text-2xl text-[#0D4A7A]">&#8594;</span>
        </button>
      </div>
      {/* Puntos indicadores */}
      <div className="flex justify-center mt-6 gap-2">
        {testimonios.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActual(idx)}
            className={`w-3 h-3 rounded-full ${actual === idx ? "bg-[#00E6F6]" : "bg-white"}`}
            aria-label={`Ir al testimonio ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

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
        {/* Columna de texto con velo curvo detrás */}
        <div className="relative max-w-xl w-full">
          {/* Velo curvo detrás gris más oscuro */}
          <div
            className="absolute inset-0 -left-16 -top-8 w-[120%] h-[115%] bg-gray-300/90 rounded-l-[120px] z-0"
            style={{ pointerEvents: "none" }}
          />
          {/* Contenido de texto */}
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-cyan-700 mb-2 text-left">Visión</h2>
            <p className="text-lg text-gray-700 text-justify leading-relaxed mb-8">
              Impulsar oportunidades de desarrollo profesional a través de procesos migratorios laborales legales hacia Estados Unidos, conectando personas con talento excepcional con compañías de prestigio, bajo estándares de seguridad, eficiencia y conformidad con la legislación migratoria estadounidense.
            </p>
            <h2 className="text-3xl font-bold text-cyan-700 mb-2 text-left">Misión</h2>
            <p className="text-lg text-gray-700 text-justify leading-relaxed">
              Consolidarnos como la agencia de reclutamiento más confiable en la movilización de talento internacional hacia Estados Unidos, distinguiéndonos por nuestro apego normativo, calidad operativa y profundo compromiso con el impacto positivo que genera la migración laboral en la vida de las personas.
            </p>
          </div>
        </div>
        {/* Columna de imagen */}
        <div className="flex-1 w-full flex justify-center items-start">
          <img
            src="/imagenmisionvision.png"
            alt="Misión y Visión"
            className="object-contain w-[320px] h-auto rounded-xl shadow-lg"
            style={{ marginTop: "-0.83cm" }}
          />
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
                onMouseEnter={() => setValorActivo(idx)}
                className={`rounded-lg w-full py-4 text-center font-bold text-lg transition-colors duration-200 flex flex-row items-center justify-center
                  ${valorActivo === idx
                    ? "bg-cyan-700 text-white shadow"
                    : "bg-gray-100 text-cyan-700 hover:bg-cyan-100"}
                `}
              >
                <span className="w-7 h-7 flex items-center justify-center mr-2">{valor.icon}</span>
                <span className="flex flex-col items-start">
                  <span>{valor.linea1}</span>
                  <span>{valor.linea2}</span>
                </span>
              </button>
              {valorActivo === idx && (
                <div className="bg-gray-100 rounded-b-xl p-6 w-full text-gray-700 text-left text-base leading-relaxed shadow animate-fadein">
                  {valor.descripcion}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <CarruselTestimonios />
    </div>
  );
}