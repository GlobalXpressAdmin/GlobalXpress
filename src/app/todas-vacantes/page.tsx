import vacantes from "../../components/vacantesData";

export default function TodasVacantes() {
  return (
    <section className="w-full py-12 bg-white min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-[#0D4A7A] mb-10 text-center">Todas las vacantes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-12">
        {vacantes.map((v, idx) => (
          <div key={idx} className="w-full max-w-md border-2 border-[#0D4A7A] rounded-2xl bg-white p-6 shadow-md flex flex-col gap-2 relative mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <img src={v.logo} alt={v.empresa} className="w-14 h-14 object-contain rounded-full border" />
              <div>
                <div className="font-semibold text-lg text-[#0D4A7A]">{v.empresa}</div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <span>📍</span>{v.ubicacion}
                </div>
                <div className="text-xs text-gray-400">{v.descripcion}</div>
              </div>
              <span className={`absolute right-6 top-6 px-3 py-1 rounded text-xs font-bold text-white ${v.estadoColor}`}>{v.estado}</span>
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