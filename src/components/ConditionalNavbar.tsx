'use client';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import NavbarAuth from './NavbarAuth';

const ConditionalNavbar = () => {
  const pathname = usePathname();

  // Solo mostrar la barra privada en /area-personal y subrutas
  if (pathname.startsWith('/area-personal')) {
    return <NavbarAuth />;
  }

  // En cualquier otra ruta, siempre mostrar la barra pública
  return <Navbar />;
};

export default ConditionalNavbar; 