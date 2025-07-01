import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function AeronauticSection() {
  return (
    <section className="bg-[#005c82] text-white py-12 px-2 md:px-0">
      <div className="max-w-7xl mx-auto text-left">
        <h2 className="text-3xl md:text-5xl font-bold mb-2" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
          <span className="text-cyan-400">Eleve su carrera</span> en el sector aeronáutico de EE. UU.
        </h2>
        <div className="w-48 h-1 bg-gradient-to-r from-cyan-400 to-[#005c82] my-4 rounded"></div>
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
            icon={<svg width="56" height="56" fill="none" stroke="#005c82" strokeWidth="2" viewBox="0 0 48 48"><rect x="8" y="16" width="32" height="20" rx="4" stroke="#005c82" strokeWidth="2"/><circle cx="16" cy="26" r="2" stroke="#005c82" strokeWidth="2"/><rect x="24" y="22" width="12" height="8" rx="2" stroke="#005c82" strokeWidth="2"/><path d="M8 20h32" stroke="#005c82" strokeWidth="2"/></svg>}
            text="Acompañamiento en trámites migratorios y validación de licencias."
          />
        </SwiperSlide>
        <SwiperSlide>
          <Card
            icon={<svg width="56" height="56" fill="none" stroke="#005c82" strokeWidth="2" viewBox="0 0 48 48"><ellipse cx="24" cy="32" rx="12" ry="6" stroke="#005c82" strokeWidth="2"/><ellipse cx="24" cy="20" rx="8" ry="4" stroke="#005c82" strokeWidth="2"/><ellipse cx="24" cy="20" rx="4" ry="2" stroke="#005c82" strokeWidth="2"/></svg>}
            text="Asesoría legal para la gestión de visa de trabajo."
          />
        </SwiperSlide>
        <SwiperSlide>
          <Card
            icon={<svg width="56" height="56" fill="none" stroke="#005c82" strokeWidth="2" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" stroke="#005c82" strokeWidth="2"/><path d="M24 8v8M24 32v8M8 24h8M32 24h8" stroke="#005c82" strokeWidth="2"/><circle cx="24" cy="24" r="4" stroke="#005c82" strokeWidth="2"/></svg>}
            text="Orientación personalizada en su transición profesional y geográfica."
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

function Card({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="bg-white text-black rounded-xl p-8 shadow-md flex flex-col items-center h-full justify-center min-h-[220px]">
      <div className="mb-6">{icon}</div>
      <p className="text-lg text-center" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>{text}</p>
    </div>
  );
} 