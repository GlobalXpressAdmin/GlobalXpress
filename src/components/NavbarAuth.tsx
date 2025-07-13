'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { 
  Bars3Icon, 
  XMarkIcon, 
  HomeIcon, 
  DocumentTextIcon, 
  CreditCardIcon, 
  ChatBubbleLeftRightIcon, 
  FolderIcon, 
  UserIcon, 
  BellIcon, 
  QuestionMarkCircleIcon, 
  Cog6ToothIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const NavbarAuth = () => {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Estado para nombre e imagen reales
  const [nombre, setNombre] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [refreshImage, setRefreshImage] = useState(0);

  // Refrescar desde otras partes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).refreshNavbarProfile = () => setRefreshImage(r => r + 1);
    }
  }, []);

  // Fetch de perfil real
  useEffect(() => {
    const fetchPerfil = async () => {
      if (session?.user?.email) {
        try {
          setLoading(true);
          const res = await fetch('/api/usuario/perfil', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: session.user.email })
          });
          const data = await res.json();
          if (data.ok && data.usuario) {
            setNombre(data.usuario.nombre || 'Usuario');
            setImage(data.usuario.image ? data.usuario.image + '?t=' + Date.now() : '');
          } else {
            setNombre('Usuario');
            setImage('');
          }
        } catch (err) {
          setNombre('Usuario');
          setImage('');
        } finally {
          setLoading(false);
        }
      }
    };
    if (status === 'authenticated') {
      fetchPerfil();
    }
  }, [session, status, refreshImage]);

  // Cerrar el menú solo si el click es fuera del dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };
    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  const navigationItems = [
    { name: 'Dashboard', href: '/area-personal', icon: HomeIcon },
    { name: 'Mis Postulaciones', href: '/area-personal/postulaciones', icon: DocumentTextIcon },
    { name: 'Pagos', href: '/area-personal/pagos', icon: CreditCardIcon },
    { name: 'Comunicación', href: '/area-personal/comunicacion', icon: ChatBubbleLeftRightIcon },
    { name: 'Documentos', href: '/area-personal/documentos', icon: FolderIcon },
  ];

  const utilityItems = [
    { name: 'Notificaciones', href: '/area-personal/notificaciones', icon: BellIcon, badge: 3 },
    { name: 'Soporte', href: '/area-personal/soporte', icon: QuestionMarkCircleIcon },
    { name: 'Configuración', href: '/area-personal/configuracion', icon: Cog6ToothIcon },
  ];

  return (
    <>
      {/* Barra de navegación principal */}
      <nav className="bg-white shadow-lg border-b border-gray-200 fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/area-personal" className="flex items-center">
                <Image
                  src="/logotransparente.png"
                  alt="Global Express Logo"
                  width={140}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Navegación principal - Desktop */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Utilidades y perfil - Desktop */}
            <div className="hidden lg:flex lg:items-center lg:space-x-4">
              
              {/* Notificaciones */}
              <Link
                href="/area-personal/notificaciones"
                className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                <BellIcon className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Link>

              {/* Perfil del usuario */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setIsProfileDropdownOpen((open) => !open);
                  }}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200 focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={isProfileDropdownOpen ? "true" : "false"}
                >
                  {image ? (
                    <Image
                      src={image}
                      alt="Avatar"
                      width={32}
                      height={32}
                      className="rounded-full object-cover h-8 w-8"
                    />
                  ) : (
                    <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {nombre?.charAt(0) || 'U'}
                      </span>
                    </div>
                  )}
                  <span className="hidden xl:block">{nombre || 'Usuario'}</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-xl shadow-2xl z-50" onClick={e => e.stopPropagation()}>
                    {/* Cabecera del menú */}
                    <div className="flex items-center space-x-3 px-5 pt-5 pb-3">
                      {image ? (
                        <Image
                          src={image}
                          alt="Avatar"
                          width={48}
                          height={48}
                          className="rounded-full object-cover h-12 w-12"
                        />
                      ) : (
                        <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-lg font-bold text-white">
                          {nombre?.charAt(0) || 'U'}
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-gray-900 text-base">{nombre || 'Usuario'}</div>
                        <div className="text-gray-500 text-sm truncate max-w-[140px]">{session?.user?.email}</div>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 my-2" />
                    <div className="py-1 px-2">
                      <Link
                        href="/area-personal/perfil"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <UserIcon className="h-5 w-5 text-blue-600" />
                        Mi Perfil
                      </Link>
                      <Link
                        href="/area-personal/configuracion"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Cog6ToothIcon className="h-5 w-5 text-blue-600" />
                        Configuración
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                      >
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Botón hamburger - Móvil */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              
              {/* Header del sidebar */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  {image ? (
                    <Image
                      src={image}
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="rounded-full object-cover h-10 w-10"
                    />
                  ) : (
                    <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {nombre?.charAt(0) || 'U'}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{nombre}</p>
                    <p className="text-xs text-gray-500">{session?.user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Navegación móvil */}
              <div className="flex-1 overflow-y-auto py-4">
                <div className="px-4 space-y-1">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Separador */}
                <div className="px-4 py-2">
                  <div className="border-t border-gray-200" />
                </div>

                {/* Utilidades */}
                <div className="px-4 space-y-1">
                  {utilityItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                      <div className="flex items-center">
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.name}
                      </div>
                      {item.badge && (
                        <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Footer del sidebar */}
              <div className="border-t border-gray-200 p-4">
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Espaciador para el contenido */}
      <div className="h-16" />
    </>
  );
};

export default NavbarAuth; 