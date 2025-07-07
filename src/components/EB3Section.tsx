'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Card({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="bg-white text-black rounded-xl p-8 shadow-md flex flex-col items-center h-full justify-center min-h-[180px]">
      <div className="mb-6">{icon}</div>
      <p className="text-lg text-center" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>{text}</p>
    </div>
  );
}

export default function EB3Section() {
  return (
    <>
      {/* Hero EB-3 con estructura igual a Visa E-2 */}
      <section className="w-full flex flex-col md:flex-row bg-white min-h-[420px]">
        {/* Imagen a la izquierda */}
        <div className="md:w-1/2 w-full relative min-h-[320px] md:min-h-[420px]">
          <img
            src="/visa-eb-3.png"
            alt="Visa EB-3"
            className="w-full h-full object-cover"
            style={{objectPosition: 'center'}}
          />
        </div>
        {/* Contenido a la derecha */}
        <div className="md:w-1/2 w-full flex flex-col justify-center p-8 md:p-12 pt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003b5c] mb-4 leading-tight mt-[0.5cm]">
            Obtenga la residencia permanente en <br />
            <span className="text-[#003b5c]">EE. UU. con patrocinio laboral aprobado</span>
          </h2>
          <p className="text-lg font-bold text-black mb-2">
            Trabaje legalmente en EE. UU. con una oferta certificada por el Departamento de Trabajo y avalada por USCIS.
          </p>
          <p className="text-gray-700 mb-2">
            Un proceso migratorio seguro, estructurado y conforme a la ley.
          </p>
          <button className="bg-[#003b5c] text-white px-6 py-2 rounded hover:bg-[#005c82] transition w-fit mt-4 mb-8">
            Postúlese ahora
          </button>
          {/* Línea y bloque derecho */}
          <div className="mt-2 border-t-4 border-cyan-400 pt-4 text-right">
            <p className="text-gray-800">
              y acceda a <span className="font-bold">una oportunidad laboral</span>
            </p>
            <p className="text-right font-bold text-[#003b5c] text-lg md:text-xl leading-tight mt-2">
              PROGRAMA RESIDENCIA BASADA EN EL EMPLEO <br />
              <span className="text-2xl md:text-3xl">EB3</span>
            </p>
          </div>
        </div>
      </section>
      {/* Sección cards EB-3 */}
      <section className="w-full bg-[#05608a] text-white py-12 px-2 md:px-0">
        <div className="max-w-7xl mx-auto text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
            Su puerta de entrada a EE. UU. con <span className="text-cyan-400">respaldo y seguridad</span>
          </h2>
        </div>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={30}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 3 },
          }}
          className="max-w-7xl mx-auto mt-10"
        >
          <SwiperSlide>
            <Card
              icon={<svg width="48" height="48" fill="none" stroke="#05608a" strokeWidth="2" viewBox="0 0 48 48"><rect x="8" y="16" width="32" height="20" rx="4" stroke="#05608a" strokeWidth="2"/><rect x="8" y="16" width="32" height="6" rx="2" fill="#fff" stroke="#05608a" strokeWidth="2"/><rect x="12" y="20" width="8" height="4" rx="1" fill="#fff" stroke="#05608a" strokeWidth="2"/></svg>}
              text={"Patrocinio laboral legítimo, aprobado por el gobierno de EE. UU."}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              icon={<svg width="48" height="48" fill="none" stroke="#05608a" strokeWidth="2" viewBox="0 0 48 48"><rect x="12" y="12" width="24" height="32" rx="4" stroke="#05608a" strokeWidth="2"/><path d="M16 20h16M16 28h16M16 36h8" stroke="#05608a" strokeWidth="2"/><circle cx="36" cy="16" r="4" fill="#fff" stroke="#05608a" strokeWidth="2"/><path d="M34 16l2 2 4-4" stroke="#05608a" strokeWidth="2" strokeLinecap="round"/></svg>}
              text={"Proceso seguro, cumpliendo estrictamente con las regulaciones del DOL y USCIS."}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              icon={<svg width="48" height="48" fill="none" stroke="#05608a" strokeWidth="2" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" stroke="#05608a" strokeWidth="2"/><path d="M24 32v-8M24 24l6-6M24 24l-6-6" stroke="#05608a" strokeWidth="2"/><circle cx="24" cy="36" r="2" fill="#fff" stroke="#05608a" strokeWidth="2"/></svg>}
              text={"Oportunidad de crecimiento en empresas estadounidenses con estabilidad."}
            />
          </SwiperSlide>
        </Swiper>
      </section>
    </>
  );
} 