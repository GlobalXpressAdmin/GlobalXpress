import Image from "next/image";

export default function VisaProcess() {
  const steps = [
    {
      title: "RECLUTADOR INTERNACIONAL",
      img: "/reclutador-internacional.png",
      items: [
        "Perfilamiento aplicante y su familia",
        "Selección de la vacante y el sponsor (empresa contratante)",
        "Diligenciamiento formato G1 (hoja de vida para el sponsor)",
      ],
    },
    {
      title: "SPONSOR",
      img: "/sponsor.png",
      items: [
        "Análisis y revisión del perfil del aplicante",
        "Pre asignación de la vacante",
        "Envío del perfil y solicitud del Labor Certification al DOL",
      ],
    },
    {
      title: "DEPARTMENT OF LABOR - DOL",
      img: "/department-of-labor.png",
      items: [
        "Revisión de los requisitos del sponsor y el aplicante",
        "Emisión de la Certificación Laboral (PERM)",
      ],
    },
    {
      title: "U.S. CITIZENSHIP AND IMMIGRATION SERVICES (USCIS)",
      img: "/Citizenship-Immigration-Services.png",
      items: [
        "Solicitud de permiso de la residencia permanente",
        "Revisión de perfiles e información del aplicante",
        "Aprobación de la residencia permanente",
      ],
    },
    {
      title: "CONSULADO O EMBAJADA DE LOS EE. UU.",
      img: "/consulado.png",
      items: [
        "Solicitud cita para entrevista consular",
        "Validación de la información previa",
        "Asignación de la cita",
      ],
    },
    {
      title: "INGRESO A LOS EE. UU.",
      img: "/ingreso-eeuu.png",
      items: [
        "Inicio de labores con el sponsor",
        "Recepción de la green card",
      ],
    },
  ];

  return (
    <section className="bg-[#f6f8fc] py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#003865] mb-10">Línea de Proceso EB-3</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 items-stretch">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-left flex flex-col items-center h-full min-h-[440px] justify-between">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-cyan-400">
                  <Image
                    src={step.img}
                    alt={step.title}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-center mb-3">{step.title}</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 mb-4">
                {step.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              {/* Flecha azul con texto debajo de cada card */}
              <div className="w-full flex justify-center mt-auto">
                <div className="relative flex items-center">
                  <div className="visa-arrow w-[220px] md:w-[320px] px-2 py-2 bg-[#084B7A] text-white font-bold text-xs md:text-base text-center break-words whitespace-pre-line" style={{position: 'relative', borderRadius: '0 12px 12px 0'}}>
                    {[
                      "ENVÍO SOLICITUD A COMITÉ DE RIESGO",
                      "FIRMA DE CONTRATO Y<br />ENGAGEMENT",
                      'APROBACIÓN "PERM" CERTIFICADO LABOR',
                      "APROBACIÓN I-140 RES. PERMANENTE",
                      "APROBACIÓN VISA EB PERMISO DE VIAJE",
                      "INICIO DE PROYECTO DE VIDA EN EE.UU."
                    ][index]}
                    <span className="visa-arrow-right" style={{
                      content: "",
                      position: 'absolute',
                      right: '-28px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '0',
                      height: '0',
                      borderTop: '28px solid transparent',
                      borderBottom: '28px solid transparent',
                      borderLeft: '28px solid #084B7A',
                      display: 'inline-block',
                    }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Nota aclaratoria */}
      <div className="bg-[#e9eaeb] mt-12 px-4 py-8 rounded-lg max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <span className="block font-bold text-[#003865] text-base mb-2">NOTA ACLARATORIA:</span>
            <span className="block font-bold text-[#007fa3] mb-1">Tiempos e Información del Proceso:</span>
            <p className="text-[#003865] text-sm mb-2">
              El programa EB-3 es un proceso gubernamental sujeto a variaciones en tiempos y requisitos determinadas por entidades como el <span className="font-bold">Department of Labor (DOL), USCIS y las embajadas de cada país.</span>
            </p>
          </div>
          <div className="md:w-1/2">
            <span className="block font-bold text-[#00b6e3] mb-1">Costos del Programa:</span>
            <p className="text-[#003865] text-sm">
              El valor del programa puede tener ajustes por incrementos imprevistos derivados de decisiones y disposiciones del gobierno de los EE. UU. Nos comprometemos a mantenerlo informado sobre cualquier cambio relevante en su proceso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 