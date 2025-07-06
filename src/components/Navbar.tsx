'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon, UserIcon } from '@heroicons/react/24/solid';

const quienesSomos = [
  { name: 'Sobre nosotros', href: '/quienes-somos/sobre-nosotros' },
  { name: 'Nuestro equipo', href: '/quienes-somos/nuestro-equipo' },
  { name: 'Nuestras Sedes', href: '/quienes-somos/sedes' },
  { name: 'Trabaje con nosotros', href: '/quienes-somos/trabaje' },
];

const programas = [
  { name: 'Visa EB-5', href: '/programas/visa-eb5' },
  { name: 'Visa E-2', href: '/programas/visa-e2' },
  { name: 'Sky Masters', href: '/programas/sky-masters' },
  { name: 'Visa EB-2 NIW', href: '/programas/visa-eb2-niw' },
  { name: 'Visa EB-3', href: '/programas/visa-eb3' },
  { name: 'Global Academic', href: '/programas/global-academic' },
];

const Navbar = () => {
  return (
    <nav className="shadow-sm font-sans fixed top-0 left-0 w-full z-50" style={{ background: '#1161A9', fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-screen-2xl mx-auto px-6 flex items-center h-16 min-h-0">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 mr-10">
          <Link href="/" className="flex items-center p-0">
            <Image
              src="/logotransparente.png"
              alt="Global Express Logo"
              width={160}
              height={54}
              className="object-contain h-14 w-auto"
              priority
            />
          </Link>
        </div>
        {/* Menú principal */}
        <div className="flex-1 flex justify-center items-center space-x-2">
          {/* Quiénes somos */}
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex items-center px-4 py-2 text-white hover:text-[#00E6F6] text-base font-normal focus:outline-none border-b-2 border-transparent transition-all">
              Quiénes somos
              <ChevronDownIcon className="ml-1 h-4 w-4" />
            </Menu.Button>
            <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none z-50">
              {quienesSomos.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <Link
                      href={item.href}
                      className={`block px-4 py-2 text-base ${active ? 'bg-blue-50 text-blue-700' : 'text-gray-800'}`}
                    >
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
          {/* Programas */}
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex items-center px-4 py-2 text-white hover:text-[#00E6F6] text-base font-normal focus:outline-none border-b-2 border-transparent transition-all">
              Programas
              <ChevronDownIcon className="ml-1 h-4 w-4" />
            </Menu.Button>
            <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none z-50">
              {programas.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <Link
                      href={item.href}
                      className={`block px-4 py-2 text-base ${active ? 'bg-blue-50 text-blue-700' : 'text-gray-800'}`}
                    >
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
          {/* Contacto */}
          <Link
            href="/contacto"
            className="px-4 py-2 text-white hover:text-[#00E6F6] text-base font-normal border-b-2 border-transparent transition-all"
          >
            Contacto
          </Link>
          {/* Pagos */}
          <Link
            href="/pagos"
            className="px-4 py-2 text-white hover:text-[#00E6F6] text-base font-normal border-b-2 border-transparent transition-all"
          >
            Pagos
          </Link>
        </div>
        {/* Botón Ingreso cliente y selector de idioma */}
        <div className="flex items-center space-x-4 ml-10">
          <Link
            href="/ingreso-cliente"
            className="flex items-center gap-2 border border-[#00E6F6] text-[#00E6F6] px-5 py-2 rounded-full text-base font-semibold bg-transparent hover:bg-[#00E6F6]/10 transition-colors"
          >
            <UserIcon className="h-5 w-5" />
            Ingreso cliente
          </Link>
          {/* Selector de idioma */}
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex items-center px-3 py-2 text-white hover:text-yellow-300 text-base font-medium focus:outline-none rounded-md bg-[#1161A9]">
              ES
              <ChevronDownIcon className="ml-1 h-4 w-4" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-24 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none z-50">
              <Menu.Item>
                {({ active }) => (
                  <button className={`w-full text-left px-4 py-2 text-base ${active ? 'bg-blue-50 text-blue-700' : 'text-gray-800'}`}>ES</button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button className={`w-full text-left px-4 py-2 text-base ${active ? 'bg-blue-50 text-blue-700' : 'text-gray-800'}`}>EN</button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 