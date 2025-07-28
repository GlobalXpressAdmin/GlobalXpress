import React from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function Contacto() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#e0f7fa] to-[#f8fafc] flex flex-col items-center justify-center pt-16">
      {/* Hero de contacto */}
      <div className="relative w-screen left-1/2 -translate-x-1/2 h-80 md:h-[400px] flex items-end mb-10">
        <Image
          src="/oficinacontacto.png"
          alt="Oficina Contacto"
          fill
          className="object-cover object-center"
          style={{ zIndex: 1 }}
        />
        <div className="absolute inset-0 bg-black/40" style={{ zIndex: 2 }}></div>
        <div className="relative z-10 p-8 md:p-16 flex flex-col justify-end w-full">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">CONTACTO</h1>
          <div className="w-24 h-1 bg-cyan-400 mt-2 mb-2" />
        </div>
      </div>
      <div className="max-w-4xl w-full flex flex-col gap-10">
        <div className="mb-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-[#e0f7fa]">
            <div className="flex flex-col items-center">
              <p className="text-lg text-black text-center mt-6 max-w-3xl mx-auto font-bold">
                En <span className="text-[#17486B]">Global Express Recruiting</span>, nuestra operación está respaldada por <span className="text-black">certificaciones internacionales</span> y una <span className="text-[#17486B]">trayectoria sólida</span>, lo que garantiza procesos de <span className="text-black">selección laboral</span> eficientes, transparentes y alineados con los más altos estándares del sector.
              </p>
              <p className="text-lg text-black text-center mt-10 max-w-3xl mx-auto font-bold">
                Si requiere información específica sobre nuestros <span className="text-[#17486B]">programas de migración laboral</span> hacia <span className="text-black">Estados Unidos</span>, puede contactarnos a través de nuestros <span className="text-[#17486B]">canales oficiales</span> o agendar una <span className="text-black">cita presencial</span>. Nuestro <span className="text-[#17486B]">equipo especializado</span> le brindará <span className="text-[#17486B]">acompañamiento integral</span> en cada etapa del proceso.
              </p>
            </div>
          </div>
        </div>
        {/* Sección de contacto especial */}
        <div className="relative w-screen left-1/2 -translate-x-1/2 bg-[#e5e7eb] rounded-xl p-8 md:p-12 mb-10 flex flex-col items-center">
          <div className="flex flex-col md:flex-row items-center w-full mb-8 px-4 md:px-16">
            <div className="flex items-center w-full md:w-1/3 mb-4 md:mb-0">
              <span className="text-3xl md:text-4xl font-extrabold text-[#17486B] mr-4">Contáctenos:</span>
              <span className="hidden md:inline-block h-10 border-l-4 border-cyan-400 mr-4"></span>
            </div>
            <div className="w-full md:w-2/3 text-black text-lg font-normal">
              Si desea más información o agendar una consulta, nuestro equipo está disponible para atenderle en cada paso de su proceso migratorio.
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row items-stretch gap-0 rounded-2xl overflow-hidden border-2 border-[#1161A9] bg-white max-w-5xl mx-auto">
            <div className="bg-[#06688A] flex items-center justify-center px-8 py-8 md:py-0 md:w-1/2">
              <span className="text-white text-2xl md:text-3xl font-bold tracking-wide">Línea de atención</span>
            </div>
            <div className="flex flex-col items-center justify-center px-8 py-4 md:py-6 md:w-1/2">
              <div className="flex items-center justify-center w-full ml-12">
                <svg className="w-10 h-10 text-[#17486B] mr-6 flex-shrink-0 self-center" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span className="text-[#17486B] text-2xl md:text-3xl font-extrabold">(+1) 949 762-1719</span>
              </div>
              <span className="text-gray-500 text-sm mt-1 ml-12">Atención 24/7</span>
            </div>
          </div>
        </div>
        {/* Sección de redes sociales */}
        <div className="w-screen left-1/2 -translate-x-1/2 bg-[#17486B] flex flex-col items-center mt-8 py-10 relative">
          <h2 className="text-2xl font-bold text-white mb-6">redes sociales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            <div className="flex items-center gap-4">
              <span className="rounded-full flex items-center justify-center">
                <span className="bg-[#17486B] rounded-full border-4 border-white flex items-center justify-center w-12 h-12">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" fill="none"/>
                    <circle cx="12" cy="12" r="5" stroke="white" fill="none"/>
                    <circle cx="17" cy="7" r="1.5" fill="white"/>
                  </svg>
                </span>
              </span>
              <span className="text-white font-bold">Global Express Recruiting Colombia</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-white rounded-full p-2 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#17486B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
              </span>
              <span className="text-white font-bold">www.globalexpresscol.com</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-white rounded-full p-2 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#17486B]" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.05.18 2.05.18v2.25h-1.16c-1.14 0-1.5.71-1.5 1.44v1.68h2.56l-.41 2.65h-2.15v6.4c4.35-.75 7.65-4.5 7.65-9.05z"/></svg>
              </span>
              <span className="text-white font-bold">Global Express Recruiting Colombia</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="rounded-full flex items-center justify-center">
                <span className="bg-[#17486B] rounded-full border-4 border-white flex items-center justify-center w-12 h-12">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" fill="none"/>
                    <circle cx="12" cy="12" r="5" stroke="white" fill="none"/>
                    <circle cx="17" cy="7" r="1.5" fill="white"/>
                  </svg>
                </span>
              </span>
              <span className="text-white font-bold">@GlobalExpress_Col</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-white rounded-full p-2 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#17486B]" fill="currentColor" viewBox="0 0 24 24"><path d="M9.75 2.5a.75.75 0 01.75.75v17.5a.75.75 0 01-1.5 0V3.25a.75.75 0 01.75-.75zm4.5 0a.75.75 0 01.75.75v17.5a.75.75 0 01-1.5 0V3.25a.75.75 0 01.75-.75z"/><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10 10-4.477 10-10z"/></svg>
              </span>
              <span className="text-white font-bold">GlobalExpressRecruiting</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-white rounded-full p-2 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#17486B]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zm-7 19c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7-3.134 7-7 7zm7-12c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1zm-7 3c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z"/></svg>
              </span>
              <span className="text-white font-bold">Global Express Recruiting</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Información de contacto */}
            <div className="flex flex-col gap-6">
              <div className="bg-[#f1f8fe] rounded-2xl p-6 flex items-center gap-4 shadow">
                <EnvelopeIcon className="w-9 h-9 text-[#00E6F6]" />
                <div>
                  <div className="text-base text-gray-700 font-semibold">Correo electrónico</div>
                  <div className="text-lg text-[#1161A9] font-bold break-all">info@colombo-hurdlaw.com</div>
                </div>
              </div>
              <div className="bg-[#f1f8fe] rounded-2xl p-6 flex items-center gap-4 shadow">
                <PhoneIcon className="w-9 h-9 text-[#00E6F6]" />
                <div>
                  <div className="text-base text-gray-700 font-semibold">Teléfono</div>
                  <div className="text-lg text-[#1161A9] font-bold">+1 (949) 5947776</div>
                </div>
              </div>
              <div className="bg-[#f1f8fe] rounded-2xl p-6 flex items-center gap-4 shadow">
                <MapPinIcon className="w-9 h-9 text-[#00E6F6]" />
                <div>
                  <div className="text-base text-gray-700 font-semibold">Dirección</div>
                  <div className="text-lg text-[#1161A9] font-bold">1146 E. Green St. Pasadena, CA 91106</div>
                </div>
              </div>
            </div>
            {/* Oficinas */}
            <div className="flex flex-col gap-6">
              <div className="bg-[#f1f8fe] rounded-2xl p-6 flex items-start gap-4 shadow">
                <MapPinIcon className="w-9 h-9 text-[#00E6F6] mt-1" />
                <div>
                  <div className="text-base text-gray-700 font-semibold mb-1">Oficina principal</div>
                  <div className="text-[#1161A9] font-bold">Carrera 45 N.o 108-27, Torre 2, Oficina 502,<br />Edificio Paralelo 108, Bogotá, COL</div>
                </div>
              </div>
              <div className="bg-[#f1f8fe] rounded-2xl p-6 flex items-start gap-4 shadow">
                <MapPinIcon className="w-9 h-9 text-[#00E6F6] mt-1" />
                <div>
                  <div className="text-base text-gray-700 font-semibold mb-1">Oficina USA</div>
                  <div className="text-[#1161A9] font-bold">7771 W Oakland Park Blvd,<br />Sunrise, Florida 33351</div>
                </div>
              </div>
              <div className="bg-[#f1f8fe] rounded-2xl p-6 flex items-start gap-4 shadow">
                <MapPinIcon className="w-9 h-9 text-[#00E6F6] mt-1" />
                <div>
                  <div className="text-base text-gray-700 font-semibold mb-1">Oficina Asia</div>
                  <div className="text-[#1161A9] font-bold">36-9 Bonggok-dong, 3rd Floor,<br />Changwon-si, Gyeongsangnam-do, South Korea 51176</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center mt-8">
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=atencion.cliente@globalexpressrecruiting.com&su=Consulta%20Global%20Express%20Recruiting&body=Estimados%20señores%20de%20Global%20Express%20Recruiting%2C%0A%0AMe%20dirijo%20a%20ustedes%20para%20solicitar%20información%20sobre%20sus%20servicios%20de%20migración%20laboral.%0A%0AMis%20datos%20son%3A%0A-%20Nombre%3A%0A-%20Teléfono%3A%0A-%20País%20de%20origen%3A%0A%0AMi%20consulta%20es%3A%0A%0A%0A%0AAgradezco%20su%20atención.%0A%0ASaludos%20cordiales%2C" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-[#00E6F6] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:bg-[#00bcd4] transition-colors text-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Enviar correo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 