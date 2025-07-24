"use client";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useState, useEffect } from "react";
import vacantes from "./vacantesData";
import React from "react";
import Link from "next/link";

export default function VacantesCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [perView, setPerView] = useState(1);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1, spacing: 12 },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    created() {
      setPerView(1);
    },
    updated() {
      setPerView(1);
    },
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        instanceRef.current?.update({ slides: { perView: 1, spacing: 12 } });
        setPerView(1);
      } else if (window.innerWidth < 1024) {
        instanceRef.current?.update({ slides: { perView: 2, spacing: 18 } });
        setPerView(2);
      } else {
        instanceRef.current?.update({ slides: { perView: 3, spacing: 26 } });
        setPerView(3);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [instanceRef]);

  return (
    <section className="w-full max-w-7xl mx-auto py-12 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0D4A7A] mb-8 text-center">
        Sponsors con <span className="text-[#1161A9]">Vacantes abiertas</span>
      </h2>
      {vacantes.length === 0 ? (
        <p>No hay vacantes disponibles en este momento.</p>
      ) : (
        <div ref={sliderRef} className="keen-slider px-0 sm:px-2">
          {vacantes.map((v, idx) => (
            <React.Fragment key={idx}>
              <div className="keen-slider__slide flex justify-center h-full flex flex-col">
                <div className="w-full max-w-full sm:max-w-[340px] min-h-[400px] border-2 border-[#0D4A7A] rounded-2xl bg-white p-4 sm:p-6 shadow-md flex flex-col gap-1.5 relative mx-auto">
                  <div className="font-semibold text-lg text-[#0D4A7A] break-words">{v.empresa}</div>
                  <div className="text-xs text-gray-500 mb-1">{v.descripcion}</div>
                  <div className="text-sm text-gray-700 mb-1"><b>Cargo:</b> {v.cargo}</div>
                  <div className="text-sm text-gray-700 mb-1"><b>Salario:</b> {v.salario}</div>
                  <div className="text-sm text-gray-700 mb-1"><b>Email:</b> {v.email}</div>
                  <div className="text-sm text-gray-700 mb-1"><b>Number of Workers Requested:</b> {v.workers}</div>
                  {v.link && (
                    <div className="mt-auto mb-2 flex items-center gap-2">
                      <a href={v.link} target="_blank" rel="noopener noreferrer" className="ml-1 flex items-center group">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="11" cy="11" r="11" fill="#22c55e"/>
                          <path d="M8 11h6m0 0l-2.5-2.5M14 11l-2.5 2.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                      <Link
                        href={`/postulacion?idx=${idx}`}
                        className="px-6 py-2 rounded-lg font-bold text-white bg-[#0D4A7A] hover:bg-[#1161A9] transition-colors text-base mt-2"
                        style={{display: 'inline-block'}}
                      >
                        Postular ahora
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
      {/* Dots de navegación por página */}
      {/* Eliminado para mayor limpieza visual */}
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-start mt-6 mb-10 px-4 sm:ml-[80px]">
        <a href="/todas-vacantes" className="bg-[#0D4A7A] hover:bg-[#1161A9] text-white font-semibold py-2 px-6 rounded text-base transition-colors w-full sm:w-auto text-center">Ver todas las vacantes</a>
      </div>
      <div className="mb-16" />
    </section>
  );
} 