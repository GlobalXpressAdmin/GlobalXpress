import React from "react";

const benefits = [
  {
    text: (
      <>
        Obtiene la residencia permanente desde el<br />
        <b>primer día en que llega a los Estados Unidos.</b>
      </>
    ),
    color: "gray",
  },
  {
    text: (
      <>
        Llega con <b>estatus de residente<br />y un empleo asegurado</b> por al menos un año.
      </>
    ),
    color: "blue",
  },
  {
    text: (
      <>
        Puede estudiar y acceder a<br /><b>créditos y descuentos</b> en colegios para sus hijos.
      </>
    ),
    color: "gray",
  },
  {
    text: (
      <>
        Recibe un salario mensual con todas las prestaciones sociales,<br />pagado por un patrocinador incluido en la lista Fortune 500, con una<br /><b>remuneración anual entre $30,000 y $33,000 USD.</b>
      </>
    ),
    color: "gray",
  },
  {
    text: (
      <>
        Oportunidad de hacer networking tanto dentro de su empleador como en otros entornos,<br />lo que le permitirá <b>ampliar sus oportunidades de crecimiento en EE. UU.</b>
      </>
    ),
    color: "blue",
  },
  {
    text: (
      <>
        Jornadas laborales semanales de hasta<br /><b>40 horas</b>
      </>
    ),
    color: "gray",
  },
];

export default function EB3Benefits() {
  return (
    <section className="bg-white py-12 px-2 md:px-0">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-10">
          <span className="text-[#0070b8]">Beneficios</span> del programa EB-3
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-2xl overflow-hidden shadow-md">
          {/* Primera fila */}
          {benefits.slice(0, 3).map((b, i) => (
            <div
              key={i}
              className={`p-8 text-center text-lg flex items-center justify-center min-h-[140px] md:min-h-[160px] ${b.color === "blue" ? "bg-[#10628e] text-white" : "bg-[#ededed] text-gray-900"}`}
              style={{ borderRight: i !== 2 ? "1px solid #ccc" : undefined, borderBottom: "1px solid #ccc" }}
            >
              {b.text}
            </div>
          ))}
          {/* Segunda fila */}
          {benefits.slice(3, 6).map((b, i) => (
            <div
              key={i + 3}
              className={`p-8 text-center text-lg flex items-center justify-center min-h-[140px] md:min-h-[160px] ${b.color === "blue" ? "bg-[#10628e] text-white" : "bg-[#ededed] text-gray-900"}`}
              style={{ borderRight: i !== 2 ? "1px solid #ccc" : undefined }}
            >
              {b.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 