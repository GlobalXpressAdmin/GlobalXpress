"use client";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useState, useEffect } from "react";
import vacantes from "./vacantesData";
import React from "react";

export default function VacantesCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pages, setPages] = useState(1);
  const [perView, setPerView] = useState(3);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 3, spacing: 26 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(slider) {
      let pv = 3;
      setPerView(pv);
      setPages(Math.ceil(vacantes.length / pv));
    },
    updated(slider) {
      let pv = 3;
      setPerView(pv);
      setPages(Math.ceil(vacantes.length / pv));
    },
  });

  // Autoplay de uno en uno
  useEffect(() => {
    if (!instanceRef.current) return;
    const interval = setInterval(() => {
      const totalSlides = vacantes.length;
      const currentAbs = instanceRef.current.track.details.abs;
      const nextIdx = (currentAbs + 1) % totalSlides;
      instanceRef.current.moveToIdx(nextIdx);
    }, 2000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  const currentPage = Math.floor(currentSlide / perView);

  const next = () => {
    if (!instanceRef.current) return;
    instanceRef.current.next();
  };
  const prev = () => {
    if (!instanceRef.current) return;
    instanceRef.current.prev();
  };

  return (
    <section className="w-full py-12 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0D4A7A] mb-8 text-center">
        Sponsors con <span className="text-[#1161A9]">Vacantes abiertas</span>
      </h2>
      <div ref={sliderRef} className="keen-slider px-2">
        {vacantes.map((v, idx) => (
          <React.Fragment key={idx}>
            <div className="keen-slider__slide flex justify-center">
              <div className="w-full max-w-[340px] border-2 border-[#0D4A7A] rounded-2xl bg-white p-6 shadow-md flex flex-col gap-1.5 relative min-h-[340px]">
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
            </div>
          </React.Fragment>
        ))}
      </div>
      {/* Dots de navegación por página */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: pages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx * perView)}
            className={`w-3 h-3 rounded-full border-2 ${currentPage === idx ? 'bg-[#0D4A7A] border-[#0D4A7A]' : 'bg-white border-[#0D4A7A]'}`}
            aria-label={`Ir a la página ${idx + 1}`}
          />
        ))}
      </div>
      <div className="w-full flex justify-start mt-6 mb-10 ml-[80px]">
        <a href="/todas-vacantes" className="bg-[#0D4A7A] hover:bg-[#1161A9] text-white font-semibold py-2 px-6 rounded text-base transition-colors">Ver todas las vacantes</a>
      </div>
      <div className="mb-16" />
    </section>
  );
} 