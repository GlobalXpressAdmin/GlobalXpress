import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#075985] text-white pt-12 pb-4 px-4 mt-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 text-sm items-start">
        {/* Columna 1: Logo principal y Quienes Somos */}
        <div className="flex flex-col items-center md:items-start">
          <img src="/logotransparente.png" alt="Global Express Recruiting" className="h-16 md:h-20 mb-4" />
          <h3 className="font-semibold mb-2">Quiénes Somos</h3>
          <ul className="space-y-1">
            <li><Link href="/quienes-somos/sobre-nosotros" className="hover:underline">Sobre nosotros</Link></li>
            <li><Link href="/quienes-somos/nuestro-equipo" className="hover:underline">Nuestro equipo</Link></li>
            <li><Link href="/zona-empleados" className="hover:underline">Zona empleados</Link></li>
            <li><Link href="/terminos-condiciones" className="hover:underline">Términos y condiciones</Link></li>
          </ul>
        </div>

        {/* Columna 2: Logo Departamento de Estado y Programas y Visas */}
        <div className="flex flex-col items-center">
          <img src="/us-department-of-state.png" alt="Departamento de Estado" className="h-12 md:h-16 object-contain mb-2" />
          <h3 className="font-semibold mb-2">Programas y Visas</h3>
          <ul className="space-y-1">
            <li><Link href="/programas/visa-e2" className="hover:underline">Visa E-2</Link></li>
            <li><Link href="/programas/visa-eb2-niw" className="hover:underline">Visa EB-2 NIW</Link></li>
            <li><Link href="/programas/visa-eb5" className="hover:underline">Visa EB-5</Link></li>
            <li><Link href="/programas/sky-masters" className="hover:underline">Sky Masters</Link></li>
            <li><Link href="/programas/global-academic" className="hover:underline">Global Academic</Link></li>
            <li><Link href="/programas/visa-eb3" className="hover:underline">Visa EB-3</Link></li>
          </ul>
        </div>

        {/* Columna 3: Logo BBB y Vacantes */}
        <div className="flex flex-col items-center">
          <img src="/bbb-accredited-business.png" alt="BBB Accredited Business" className="h-12 md:h-16 object-contain mb-2" />
          <h3 className="font-semibold mb-2">Vacantes</h3>
          <ul className="space-y-1">
            <li>Buscar trabajo</li>
            <li>Aplicar a vacantes</li>
            <li>Sponsors activos</li>
          </ul>
        </div>

        {/* Columna 4: Logo USCIS y Contacto */}
        <div className="flex flex-col items-center">
          <img src="/us-citizenship-and-immigration.png" alt="USCIS" className="h-12 md:h-16 object-contain mb-2 bg-transparent" />
          <h3 className="font-semibold mb-2">Contacto</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 mt-1">✉️</span>
              <div>
                <strong>Correo:</strong><br />
                atencion.cliente@globalexpressrecruiting.com
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 mt-1">📞</span>
              <div>
                <strong>Teléfono:</strong><br />
                +57-315-446-0211
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 mt-1">📍</span>
              <div>
                <strong>Dirección:</strong><br />
                1146 E. Green St. Pasadena, CA 91106
              </div>
            </div>
          </div>
        </div>

        {/* Columna 5: Logo Sponsors Fortune 500 y Redes Sociales */}
        <div className="flex flex-col items-center">
          <img src="/sponsors-fortune-500.png" alt="Sponsors Fortune 500" className="h-16 md:h-20 object-contain mb-4" />
          <div className="flex flex-row gap-4">
            {/* Facebook */}
            <a href="#" className="text-white hover:text-cyan-400" aria-label="Facebook">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="text-white hover:text-cyan-400" aria-label="Instagram">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.059-2.633-.342-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.567 5.782 2.295 7.148 2.233 8.414 2.175 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.414 3.678 1.395c-.98.98-1.263 2.092-1.322 3.373C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.612.059 1.281.342 2.393 1.322 3.373.98.98 2.092 1.263 3.373 1.322C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.342 3.373-1.322.98-.98 1.263-2.092 1.322-3.373.059-1.28.072-1.689.072-7.612 0-5.923-.013-6.332-.072-7.612-.059-1.281-.342-2.393-1.322-3.373-.98-.98-2.092-1.263-3.373-1.322C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.2-10.406a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
              </svg>
            </a>
            {/* TikTok */}
            <a href="#" className="text-white hover:text-cyan-400" aria-label="TikTok">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.326 2.001h3.197c.09 1.462.73 2.557 2.008 3.09.41.17.85.28 1.469.29v3.18c-.67.06-1.31-.01-1.97-.19v6.56c0 3.18-2.24 5.07-5.01 5.07-2.7 0-4.98-2.19-4.98-4.89 0-2.7 2.19-4.89 4.89-4.89.18 0 .36.01.54.03v3.23c-.18-.04-.36-.07-.54-.07-1.01 0-1.83.82-1.83 1.83 0 1.01.82 1.83 1.83 1.83 1.01 0 1.83-.82 1.83-1.83V2.001z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <hr className="my-6 border-white/30" />
      <div className="text-center text-lg">@2025 Global Express Recruiting todos los derechos reservados</div>
    </footer>
  );
} 