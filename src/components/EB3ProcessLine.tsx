const steps = [
  {
    img: '/eb3-step1.png',
    title: 'RECLUTADOR INTERNACIONAL',
    subtitle: '',
    items: [
      'Perfilamiento aplicante y su familia',
      'Selección de la vacante y el sponsor (empresa contratante )',
      'Diligenciamiento formato G1 (hoja de vida para el sponsor)',
    ],
    arrow: 'ENVÍO SOLICITUD A COMITÉ DE RIESGO',
  },
  {
    img: '/eb3-step2.png',
    title: 'SPONSOR',
    subtitle: '(Empresa contratante)',
    items: [
      'Análisis y revisión del perfil del aplicante',
      'Pre asignación de la vacante',
      'Envío del perfil y solicitud del Labor Certification al DOL (Department of labor)',
    ],
    arrow: 'FIRMA DE CONTRATO Y ENGAGEMENT',
  },
  {
    img: '/eb3-step3.png',
    title: 'DEPARTMENT OF LABOR - DOL',
    subtitle: '',
    items: [
      'Revisión de los requisitos del sponsor y el aplicante',
      'Emisión de la Certificación Laboral (PERM)',
    ],
    arrow: 'APROBACIÓN "PERM" CERTIFICADO LABOR',
  },
  {
    img: '/eb3-step4.png',
    title: 'U.S. CITIZENSHIP AND IMMIGRATION SERVICES (USCIS)',
    subtitle: '',
    items: [
      'Solicitud de permiso de la residencia permanente para el aplicante y su grupo familiar',
      'Revisión de perfiles e información del aplicante y su grupo familiar',
      'Aprobación de la residencia permanente',
    ],
    arrow: 'APROBACIÓN I-140 RES. PERMANENTE',
  },
  {
    img: '/eb3-step5.png',
    title: 'CONSULADO O EMBAJADA DE LOS EE. UU.',
    subtitle: '',
    items: [
      'Solicitud cita para entrevista consular',
      'Validación de la información previa',
      'Asignación de la cita',
    ],
    arrow: 'APROBACIÓN VISA EB PERMISO DE VIAJE',
  },
  {
    img: '/eb3-step6.png',
    title: 'INGRESO A LOS EE. UU.',
    subtitle: '',
    items: [
      'Inicio de labores con el sponsor',
      'Recepción de la green card',
    ],
    arrow: 'INICIO DE PROYECTO DE VIDA EN EE.UU.',
  },
];

export default function EB3ProcessLine() {
  return (
    <section className="w-full bg-[#ededed] py-12 px-2 md:px-0 font-['Montserrat',Arial,sans-serif]">
      <div className="max-w-7xl mx-auto">
        {/* Título y puntos decorativos */}
        <div className="flex items-center mb-8">
          <div className="hidden md:flex flex-col mr-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-cyan-400 rounded-full mb-2 opacity-60" />
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#003b5c] tracking-tight">
            Línea de <span className="text-cyan-600">Proceso EB-3</span>
          </h2>
        </div>
        {/* Pasos */}
        <div className="bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-6 gap-0 p-8 md:p-12 items-start">
          {steps.map((step, idx) => (
            <div key={idx} className={`flex flex-col items-center text-center px-2 md:px-6 relative ${idx !== steps.length - 1 ? 'md:border-r md:border-gray-200' : ''}`} style={{minHeight: '400px'}}>
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-cyan-400 mb-4 flex items-center justify-center bg-white">
                <img src={step.img} alt={step.title} className="object-cover w-full h-full" />
              </div>
              <h3 className="text-lg md:text-xl font-extrabold text-[#003b5c] mb-1 uppercase leading-tight tracking-tight text-center">
                {step.title}
              </h3>
              {step.subtitle && <div className="text-base text-cyan-600 font-bold mb-2 text-center" style={{lineHeight:1}}>{step.subtitle}</div>}
              <ol className="text-sm md:text-base text-gray-700 list-decimal list-inside mb-4 text-center" style={{minHeight: '100px'}}>
                {step.items.map((item, i) => (
                  <li key={i} className="text-center">{item}</li>
                ))}
              </ol>
              {/* Flecha azul con texto dentro */}
              <div className="w-full flex flex-col items-center absolute left-0 right-0 bottom-[-40px]">
                <svg width="260" height="36" viewBox="0 0 260 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0" y="8" width="240" height="20" rx="10" fill="#05608a" />
                  <polygon points="240,8 260,18 240,28" fill="#05608a" />
                </svg>
                <span className="text-xs md:text-base font-extrabold uppercase text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] px-1 text-center tracking-tight">
                  {step.arrow}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* Notas aclaratorias */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mt-28 text-sm text-center md:text-center">
          <div className="flex-1">
            <span className="font-bold text-[#003b5c]">NOTA ACLARATORIA:</span><br />
            <span className="font-bold text-[#003b5c]">Tiempos e Información del Proceso:</span>
            <span className="text-gray-700"> El programa EB-3 es un proceso gubernamental sujeto a variaciones en tiempos y requisitos determinadas por entidades como el <span className="font-bold">Department of Labor (DOL), USCIS y las embajadas de cada país.</span></span>
          </div>
          <div className="flex-1">
            <span className="font-bold text-[#003b5c]">Costos del Programa:</span>
            <span className="text-gray-700"> El valor del programa puede tener ajustes por incrementos imprevistos derivados de decisiones y disposiciones del gobierno de los EE. UU. Nos comprometemos a mantenerlo informado sobre cualquier cambio relevante en su proceso.</span>
          </div>
        </div>
      </div>
    </section>
  );
} 