import Image from 'next/image';
import { MdEmail, MdCall, MdLocationOn, MdSwapHoriz, MdAccountBalance } from 'react-icons/md';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0D4A7A] to-[#1161A9] text-white pt-12 pb-6 px-4 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Logos institucionales arriba */}
        <div className="flex flex-row justify-between items-center mb-6 flex-wrap gap-4">
          <Image src="/logotransparente.png" alt="Logo Global Express Recruiting" width={170} height={60} className="h-16 w-auto" />
          <Image src="/seal.png" alt="Seal" width={60} height={60} className="h-14 w-auto" />
          <Image src="/bbblogo.png" alt="BBB" width={110} height={40} className="h-10 w-auto" />
          <Image src="/uscislogo.png" alt="USCIS" width={90} height={60} className="h-14 w-auto" />
          <Image src="/fortune500.png" alt="Fortune 500" width={60} height={60} className="h-14 w-auto" />
        </div>
        {/* Contenido principal */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
          {/* Columna 1: Quiénes Somos */}
          <div>
            <div className="font-bold mb-2">Quiénes Somos</div>
            <ul className="space-y-1 text-sm text-white/90">
              <li><a href="#" className="hover:underline">Sobre nosotros</a></li>
              <li><a href="#" className="hover:underline">Nuestro equipo</a></li>
              <li><a href="#" className="hover:underline">Zona empleados</a></li>
              <li><a href="#" className="hover:underline">Nuestras Sedes</a></li>
              <li><a href="#" className="hover:underline">Trabaja con nosotros</a></li>
              <li><a href="#" className="hover:underline">Términos y condiciones</a></li>
            </ul>
          </div>
          {/* Columna 2: Programas y Visas */}
          <div>
            <div className="font-bold mb-2">Programas y Visas</div>
            <ul className="space-y-1 text-sm text-white/90">
              <li><a href="#" className="hover:underline">Visa E-2</a></li>
              <li><a href="#" className="hover:underline">Visa EB-2 NIW</a></li>
              <li><a href="#" className="hover:underline">Visa EB-5</a></li>
              <li><a href="#" className="hover:underline">Sky Masters</a></li>
              <li><a href="#" className="hover:underline">Global Academic</a></li>
              <li><a href="#" className="hover:underline">Visa EB-3</a></li>
            </ul>
          </div>
          {/* Columna 3: Vacantes */}
          <div>
            <div className="font-bold mb-2">Vacantes</div>
            <ul className="space-y-1 text-sm text-white/90">
              <li><a href="#" className="hover:underline">Buscar trabajo</a></li>
              <li><a href="#" className="hover:underline">Aplicar a vacantes</a></li>
              <li><a href="#" className="hover:underline">Sponsors activos</a></li>
            </ul>
          </div>
          {/* Columna 4: Contacto */}
          <div className="flex flex-col gap-3 items-start max-w-xl w-full ml-0 text-left md:col-span-2">
            <div className="mb-2 w-full">
              <div className="flex items-start gap-2 mb-2 w-full pl-0 ml-0">
                <MdEmail className="text-[#00E6F6] mt-1" size={20} />
                <div className="flex flex-col items-start">
                  <span className="font-bold">Correo:</span>
                  <span className="break-all leading-tight pl-0 ml-0">atencion.cliente@globalexpressrecruiting.com</span>
                </div>
              </div>
              <div className="flex items-start gap-2 mb-2 w-full">
                <MdCall className="text-[#00E6F6] mt-1" size={20} />
                <div className="flex flex-col">
                  <span className="font-bold">Teléfono:</span>
                  <span className="leading-tight">+57-315-446-0211</span>
                </div>
              </div>
              <div className="flex items-start gap-2 mb-2 w-full">
                <MdLocationOn className="text-[#00E6F6] mt-1" size={20} />
                <div className="flex flex-col">
                  <span className="font-bold">Dirección:</span>
                  <span className="leading-tight">Carrera 45 No.108-27,<br/>Torre 2, Oficina 502,<br/>Edificio Paralelo 108.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-white/60 mt-8">© {new Date().getFullYear()} Global &amp; Express Recruiting. Todos los derechos reservados.</div>
    </footer>
  );
} 