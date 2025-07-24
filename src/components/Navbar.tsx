'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

const quienesSomos = [
  { name: 'Sobre nosotros', href: '/quienes-somos/sobre-nosotros' },
  { name: 'Nuestro equipo', href: '/quienes-somos/nuestro-equipo' },
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
  const { data: session, status } = useSession();
  const [nombre, setNombre] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshImage, setRefreshImage] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.refreshNavbarProfile = () => setRefreshImage(r => r + 1);
    }
  }, []);

  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
      const fetchPerfil = async () => {
        const userEmail = session.user?.email;
        console.log('[Navbar] Fetching perfil para email:', userEmail);
        try {
          const res = await fetch('/api/usuario/perfil', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userEmail })
          });
          const data = await res.json();
          console.log('[Navbar] Respuesta de perfil:', data);
          if (data.ok && data.usuario) {
            setNombre(data.usuario.nombre || null);
            setImage(data.usuario.image || null);
          } else {
            setNombre(null);
            setImage(null);
          }
        } catch {
          setNombre(null);
          setImage(null);
        } finally {
          setLoading(false);
        }
      };
      fetchPerfil();
    } else {
      setLoading(false);
    }
  }, [session, refreshImage]);

  // Log final antes del render
  console.log('Navbar - perfil final antes del render:', { nombre, image, email, loading });

  return (
    <nav className="shadow-sm font-sans fixed top-0 left-0 w-full z-50" style={{ background: '#1161A9', fontFamily: 'Inter, sans-serif' }}>
      <div className="w-full max-w-md sm:max-w-2xl md:max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-16 min-h-0">
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
        {/* Menú principal - solo visible en desktop */}
        <div className="flex-1 flex justify-center items-center space-x-2 hidden md:flex">
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
        </div>
        {/* Usuario autenticado o botón de ingreso - solo visible en desktop */}
        <div className="items-center space-x-4 ml-10 hidden md:flex">
          {status === 'authenticated' && !loading ? (
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow hover:shadow-lg transition-all border border-blue-100">
                {image ? (
                  <Image src={image} alt="Avatar" width={40} height={40} className="rounded-full object-cover h-10 w-10" />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold text-white">
                    {nombre ? nombre.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-gray-900 text-base leading-5">
                    {nombre ? nombre : <span className="text-red-500">[Sin nombre]</span>}
                  </span>
                  <span className="text-xs text-gray-500 max-w-[120px] truncate">{email}</span>
                </div>
                <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none z-50">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/area-personal/perfil"
                      className={`flex items-center gap-2 px-4 py-2 text-base ${active ? 'bg-blue-50 text-blue-700' : 'text-gray-800'}`}
                    >
                      <UserIcon className="h-5 w-5" /> Mi Perfil
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/area-personal/configuracion"
                      className={`flex items-center gap-2 px-4 py-2 text-base ${active ? 'bg-blue-50 text-blue-700' : 'text-gray-800'}`}
                    >
                      <span className="h-5 w-5 inline-block">⚙️</span> Configuración
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className={`flex items-center gap-2 px-4 py-2 text-base w-full text-left ${active ? 'bg-blue-50 text-blue-700' : 'text-gray-800'}`}
                    >
                      <span className="h-5 w-5 inline-block">🚪</span> Cerrar Sesión
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <Link
              href="/ingreso-cliente"
              className="flex items-center gap-2 border border-[#00E6F6] text-[#00E6F6] px-5 py-2 rounded-full text-base font-semibold bg-transparent hover:bg-[#00E6F6]/10 transition-colors"
            >
              <UserIcon className="h-5 w-5" />
              Ingreso cliente
            </Link>
          )}
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
        {/* Botón hamburguesa solo en móvil */}
        <div className="flex md:hidden ml-auto">
          <button onClick={() => setMobileMenuOpen(true)} className="text-white p-2 focus:outline-none">
            <Bars3Icon className="h-8 w-8" />
          </button>
        </div>
      </div>
      {/* Menú lateral móvil */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-40" onClick={() => setMobileMenuOpen(false)} />
          {/* Sidebar */}
          <div className="relative bg-white w-72 max-w-full h-full shadow-xl p-6 flex flex-col">
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-4 right-4 text-gray-700">
              <XMarkIcon className="h-7 w-7" />
            </button>
            <div className="mb-8 mt-2 flex items-center">
              <Image src="/logotransparente.png" alt="Logo" width={120} height={40} className="object-contain h-10 w-auto" />
            </div>
            <nav className="flex flex-col gap-2">
              <div className="font-bold text-[#1161A9] mb-2">Menú</div>
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="w-full flex justify-between items-center px-2 py-2 text-[#1161A9] font-semibold bg-gray-100 rounded">
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
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="w-full flex justify-between items-center px-2 py-2 text-[#1161A9] font-semibold bg-gray-100 rounded mt-2">
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
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>
              <Link href="/contacto" className="w-full px-2 py-2 text-[#1161A9] font-semibold bg-gray-100 rounded mt-2" onClick={() => setMobileMenuOpen(false)}>
                Contacto
              </Link>
              <Link href="/ingreso-cliente" className="w-full px-2 py-2 text-[#00E6F6] font-semibold border border-[#00E6F6] rounded mt-4 text-center" onClick={() => setMobileMenuOpen(false)}>
                Ingreso cliente
              </Link>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 