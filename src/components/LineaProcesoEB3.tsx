import Image from "next/image";

const requisitos = [
  {
    title: "Perfil del candidato:",
    desc: "El perfil ideal para este programa es el de un migrante calificado, con formación técnica, tecnológica o profesional, y una edad entre 18 y 56 años."
  },
  {
    title: "Inversión mínima:",
    desc: "Este programa requiere una inversión desde $18,990 USD para cubrir costos administrativos, certificaciones y trámites migratorios."
  },
  {
    title: "Inglés básico recomendado:",
    desc: "No es obligatorio para la mayoría de nuestros patrocinadores, pero un mejor dominio del idioma facilitará su integración y crecimiento profesional."
  },
  {
    title: "Historial migratorio limpio:",
    desc: "El candidato no debe tener antecedentes de deportaciones, estancias irregulares prolongadas ni violaciones migratorias previas en EE. UU."
  },
  {
    title: "Tiempo estimado:",
    desc: "Los plazos y requisitos pueden variar según los entes gubernamentales que intervienen en el proceso, como el DOL, migración y las embajadas de cada país."
  },
  {
    title: "Condiciones óptimas de salud:",
    desc: "El candidato debe gozar de buena salud, sin enfermedades infectocontagiosas, y estar apto para desempeñar sus tareas sin limitaciones."
  },
  {
    title: "Compromiso laboral:",
    desc: "Se requiere trabajar con el patrocinador por al menos un año, respetando los términos del contrato."
  },
];

const beneficios = [
  {
    color: "bg-gray-100",
    text: "Obtiene la residencia permanente desde el <b>primer día en que llega a los Estados Unidos.</b>"
  },
  {
    color: "bg-[#0073b6] text-white",
    text: "Llega con <b>estatus de residente y un empleo asegurado</b> por al menos un año."
  },
  {
    color: "bg-gray-100",
    text: "Puede estudiar y acceder a <b>créditos y descuentos</b> en colegios para sus hijos."
  },
  {
    color: "bg-gray-100",
    text: "Recibe un salario mensual con todas las prestaciones sociales, pagado por un patrocinador incluido en la lista Fortune 500, con una <b>remuneración anual entre $30,000 y $33,000 USD.</b>"
  },
  {
    color: "bg-[#0073b6] text-white",
    text: "Oportunidad de hacer networking tanto dentro de su empleador como en otros entornos, lo que le permitirá <b>ampliar sus oportunidades de crecimiento en EE. UU.</b>"
  },
  {
    color: "bg-gray-100",
    text: "Jornadas laborales semanales de hasta <b>40 horas</b>"
  },
];

export default function LineaProcesoEB3() {
  return (
    <>
      {/* 1. Línea de Proceso EB-3 */}
      <section className="bg-gray-100 py-12 px-4 md:px-12">
        <h2 className="text-3xl font-bold text-[#003366] mb-8 text-center">
          <span className="text-[#00CFFF]">●●●</span> Línea de <span className="text-[#003366]">Proceso EB-3</span> <span className="text-[#00CFFF]">●●●</span>
        </h2>

        <div className="grid md:grid-cols-6 gap-6 mb-12">
          {[
            {
              title: "RECLUTADOR INTERNACIONAL",
              subtitle: "",
              image: "/eb3-step1.png",
              points: [
                "Perfilamiento aplicante y su familia",
                "Selección de la vacante y el sponsor (empresa contratante)",
                "Diligenciamiento formato G1 (hoja de vida para el sponsor)",
              ],
            },
            {
              title: "SPONSOR",
              subtitle: "(Empresa contratante)",
              image: "/eb3-step2.png",
              points: [
                "Análisis y revisión del perfil del aplicante",
                "Pre asignación de la vacante",
                "Envío del perfil y solicitud del Labor Certification al DOL",
              ],
            },
            {
              title: "DEPARTMENT OF LABOR - DOL",
              subtitle: "",
              image: "/eb3-step3.png",
              points: [
                "Revisión de los requisitos del sponsor y el aplicante",
                "Emisión de la Certificación Laboral (PERM)",
              ],
            },
            {
              title: "U.S. CITIZENSHIP AND IMMIGRATION SERVICES (USCIS)",
              subtitle: "",
              image: "/eb3-step4.png",
              points: [
                "Solicitud de permiso de la residencia permanente",
                "Revisión de perfiles e información del aplicante",
                "Aprobación de la residencia permanente",
              ],
            },
            {
              title: "CONSULADO O EMBAJADA DE LOS EE. UU.",
              subtitle: "",
              image: "/eb3-step5.png",
              points: [
                "Solicitud cita para entrevista consular",
                "Validación de la información previa",
                "Asignación de la cita",
              ],
            },
            {
              title: "INGRESO A LOS EE. UU.",
              subtitle: "",
              image: "/eb3-step6.png",
              points: [
                "Inicio de labores con el sponsor",
                "Recepción de la green card",
              ],
            },
          ].map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <Image src={step.image} alt={step.title} fill className="object-contain" />
              </div>
              <h3 className="text-sm font-bold text-[#003366] mb-1 uppercase">{step.title}</h3>
              {step.subtitle && <p className="text-xs text-[#00CFFF] font-semibold mb-2">{step.subtitle}</p>}
              <ol className="text-xs text-gray-700 space-y-1 text-left list-decimal list-inside">
                {step.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        {/* Flechas de navegación */}
        <div className="grid md:grid-cols-6 gap-2 text-white text-xs font-bold mb-12">
          {[
            "ENVÍO SOLICITUD A COMITÉ DE RIESGO",
            "FIRMA DE CONTRATO Y ENGAGEMENT",
            "APROBACIÓN PERM CERTIFICADO LABOR",
            "APROBACIÓN I-140 RES. PERMANENTE",
            "APROBACIÓN VISA EB PERMISO DE VIAJE",
            "INICIO DE PROYECTO DE VIDA EN EE.UU.",
          ].map((txt, idx) => (
            <div key={idx} className="bg-[#003366] py-3 px-2 text-center rounded-lg">
              {txt}
            </div>
          ))}
        </div>

        {/* 2. Nota aclaratoria */}
        <div className="text-sm text-[#003366] flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 border-t border-gray-300 pt-6">
          <div className="flex-1">
            <strong className="text-[#003366]">NOTA ACLARATORIA:</strong><br />
            <span className="font-semibold">Tiempos e Información del Proceso:</span><br />
            <span className="text-gray-700">El programa EB-3 es un proceso gubernamental sujeto a variaciones en tiempos y requisitos determinados por entidades como el <strong>Department of Labor (DOL)</strong>, <strong>USCIS</strong> y <strong>las embajadas de cada país</strong>.</span>
          </div>
          <div className="flex-1">
            <span className="font-semibold text-[#00CFFF]">Costos del Programa:</span><br />
            <span className="text-gray-700">El valor del programa puede tener ajustes por incrementos imprevistos derivados de decisiones y disposiciones del gobierno de los EE. UU. Nos comprometemos a mantenerlo informado sobre cualquier cambio relevante en su proceso.</span>
          </div>
        </div>
      </section>

      {/* Requisitos para aplicar a la visa EB-3 */}
      <section className="bg-white py-16 px-4 md:px-12">
        <div className="flex items-center mb-8">
          <div className="flex flex-col items-center mr-3 mt-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-[#00CFFF] rounded-full mb-1" />
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003366] leading-tight">
            Requisitos para <span className="font-black">aplicar a la visa EB-3</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {requisitos.map((req, idx) => (
            <div key={idx} className="relative bg-white border-2 border-[#0073b6] rounded-xl p-6 pt-10 shadow-sm flex flex-col text-left min-h-[220px]">
              <svg className="absolute -top-7 left-4 w-12 h-12" viewBox="0 0 48 48" fill="none"><path d="M12 26l8 8 16-16" stroke="#00CFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><circle cx="24" cy="24" r="22" stroke="#00CFFF" strokeWidth="4"/></svg>
              <h3 className="font-bold text-lg text-[#003366] mb-2">{req.title}</h3>
              <p className="text-base text-[#222]">{req.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Importante */}
      <section className="py-8 px-4 md:px-12">
        <div className="flex items-center mb-2">
          <div className="bg-[#003366] rounded-md px-6 py-2 shadow text-white font-bold text-lg mr-4">Importante:</div>
          <div className="h-1 w-16 bg-gradient-to-r from-[#003366] to-[#00CFFF] rounded" />
        </div>
        <p className="text-[#222] text-lg max-w-3xl">
          El programa EB-3 es un proceso regulado por el <b>Departamento de Trabajo de EE. UU. (DOL) y USCIS</b>, por lo que los tiempos y requisitos pueden variar según la normativa vigente.
        </p>
      </section>

      {/* Beneficios del programa EB-3 */}
      <section className="bg-white py-16 px-4 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-8 text-left">
          <span className="font-black">Beneficios</span> del programa EB-3
        </h2>
        <div className="grid md:grid-cols-3 grid-rows-2 gap-6">
          {beneficios.map((b, idx) => (
            <div key={idx} className={`rounded-xl p-8 flex items-center justify-center text-center text-lg font-medium ${b.color}`}>
              <span dangerouslySetInnerHTML={{ __html: b.text }} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
} 