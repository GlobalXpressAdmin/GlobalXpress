"use client";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useState, useEffect } from "react";
import vacantes from "./vacantesData";

export default function VacantesCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pages, setPages] = useState(1);
  const [perView, setPerView] = useState(1);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1, spacing: 24 },
    breakpoints: {
      "(min-width: 640px)": { slides: { perView: 2, spacing: 24 } },
      "(min-width: 1024px)": { slides: { perView: 3, spacing: 24 } },
    },
    animation: { duration: 2000, easing: t => t * t },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(slider) {
      let pv = 1;
      if (slider.options.slides && typeof slider.options.slides === 'object' && 'perView' in slider.options.slides) {
        const val = typeof slider.options.slides.perView === 'function' ? slider.options.slides.perView() : slider.options.slides.perView;
        pv = typeof val === 'number' ? val : 1;
      }
      setPerView(pv);
      setPages(Math.ceil(vacantes.length / pv));
    },
    updated(slider) {
      let pv = 1;
      if (slider.options.slides && typeof slider.options.slides === 'object' && 'perView' in slider.options.slides) {
        const val = typeof slider.options.slides.perView === 'function' ? slider.options.slides.perView() : slider.options.slides.perView;
        pv = typeof val === 'number' ? val : 1;
      }
      setPerView(pv);
      setPages(Math.ceil(vacantes.length / pv));
    },
  });

  // Autoplay por página
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

  // Calcular el índice de página actual
  const currentPage = Math.floor(currentSlide / perView);

  return (
    <section className="w-full py-12 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0D4A7A] mb-8 text-center">
        Sponsors con <span className="text-[#1161A9]">Vacantes abiertas</span>
      </h2>
      <div ref={sliderRef} className="keen-slider px-2">
        {vacantes.map((v, idx) => (
          <div key={idx} className="keen-slider__slide flex justify-center">
            <div className="w-full max-w-md border-2 border-[#0D4A7A] rounded-2xl bg-white p-6 shadow-md flex flex-col gap-2 relative">
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
          </div>
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
      <div className="mb-16" />
    </section>
  );
} 