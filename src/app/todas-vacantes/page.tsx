import vacantes from "../../components/vacantesData";

export default function TodasVacantes() {
  return (
    <section className="w-full py-12 bg-white min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-[#0D4A7A] mb-10 text-center">Todas las vacantes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-12">
        {vacantes.map((v, idx) => (
          <div key={idx} className="w-full max-w-md border-2 border-[#0D4A7A] rounded-2xl bg-white p-6 shadow-md flex flex-col gap-1.5 relative mx-auto min-h-[340px]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-white border flex items-center justify-center mr-2 flex-shrink-0">
                <img src={v.logo} alt={v.empresa} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-semibold text-lg text-[#0D4A7A] break-words">{v.empresa}</div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <span>📍</span>{v.ubicacion}
                </div>
                <div className="text-xs text-gray-400">{v.descripcion}</div>
              </div>
            </div>
            <div className="text-[#1161A9] font-semibold mb-1">Salario: {v.salario}</div>
            <div className="text-xs text-gray-500 mb-1">{v.horario}</div>
            <div className="mb-1">
              <span className="font-bold">Posiciones ofrecidas:</span>
              <ul className="list-disc ml-5 text-sm">
                {v.posiciones.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
            <div className="mb-2">
              <span className="font-bold">Idioma requerido:</span> <span>{v.idioma}</span>
            </div>
            {v.link && v.link !== "#" && (
              <div className="mb-2 flex items-center">
                <a href={v.link} target="_blank" rel="noopener noreferrer" className="ml-1 flex items-center group">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="11" fill="#22c55e"/>
                    <path d="M8 11h6m0 0l-2.5-2.5M14 11l-2.5 2.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            )}
            <button
              className={`mt-auto px-6 py-2 rounded-lg font-bold text-white ${v.cerrado ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#0D4A7A] hover:bg-[#1161A9]'}`}
              disabled={v.cerrado}
            >
              {v.boton}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
} 