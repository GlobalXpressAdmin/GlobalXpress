'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  DocumentTextIcon,
  CreditCardIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';

function formatHora(fecha: Date) {
  return fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function AreaPersonal() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [nombrePostulacion, setNombrePostulacion] = useState<string | null>(null);
  const [loadingNombre, setLoadingNombre] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/ingreso-cliente');
    }
  }, [status, router]);

  useEffect(() => {
    // Si no hay nombre en sesión pero sí email, buscar en usuarios_global
    if (session?.user && !session.user.nombre && session.user.email) {
      setLoadingNombre(true);
      fetch('/api/usuario/perfil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session.user.email })
      })
        .then(res => res.json())
        .then(data => {
          if (data.ok && data.usuario?.nombre) {
            setNombrePostulacion(data.usuario.nombre);
          } else {
            setNombrePostulacion(null);
          }
        })
        .catch(() => setNombrePostulacion(null))
        .finally(() => setLoadingNombre(false));
    }
  }, [session?.user]);

  if (status === 'loading' || loadingNombre) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // Datos de ejemplo - estos vendrían de la base de datos
  const stats = {
    postulaciones: 3,
    pagosPendientes: 1,
    mensajesNuevos: 2,
    documentosPendientes: 1,
  };

  const postulacionesRecientes = [
    {
      id: 1,
      programa: 'Visa EB-3',
      estado: 'En Revisión',
      fecha: '2024-01-15',
      icon: ClockIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      id: 2,
      programa: 'Sky Masters',
      estado: 'Aprobada',
      fecha: '2024-01-10',
      icon: CheckCircleIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      id: 3,
      programa: 'Global Academic',
      estado: 'Pendiente',
      fecha: '2024-01-08',
      icon: ExclamationTriangleIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const accionesRapidas = [
    {
      title: 'Nueva Postulación',
      description: 'Aplicar a un nuevo programa',
      href: '/postulacion',
      icon: DocumentTextIcon,
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      title: 'Realizar Pago',
      description: 'Pagar facturas pendientes',
      href: '/area-personal/pagos',
      icon: CreditCardIcon,
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      title: 'Contactar Asesor',
      description: 'Chat en vivo con soporte',
      href: '/area-personal/comunicacion',
      icon: ChatBubbleLeftRightIcon,
      color: 'bg-purple-500 hover:bg-purple-600',
    },
    {
      title: 'Ver Documentos',
      description: 'Gestionar documentación',
      href: '/area-personal/documentos',
      icon: UserGroupIcon,
      color: 'bg-orange-500 hover:bg-orange-600',
    },
  ];

  // --- CARDS DE RESUMEN ---
  const resumenCards = [
    {
      label: 'Postulaciones',
      value: stats.postulaciones,
      icon: <DocumentTextIcon className="h-7 w-7 text-blue-500" />,
      bg: 'bg-blue-50',
      border: 'border-blue-100',
    },
    {
      label: 'Pagos Pendientes',
      value: stats.pagosPendientes,
      icon: <CreditCardIcon className="h-7 w-7 text-green-500" />,
      bg: 'bg-green-50',
      border: 'border-green-100',
    },
    {
      label: 'Mensajes Nuevos',
      value: stats.mensajesNuevos,
      icon: <ChatBubbleLeftRightIcon className="h-7 w-7 text-purple-500" />,
      bg: 'bg-purple-50',
      border: 'border-purple-100',
    },
    {
      label: 'Documentos Pendientes',
      value: stats.documentosPendientes,
      icon: <UserGroupIcon className="h-7 w-7 text-orange-500" />,
      bg: 'bg-orange-50',
      border: 'border-orange-100',
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #e0e7ff 0%, #f0f9ff 50%, #f8fafc 100%)' }}>
      {/* Header de bienvenida mejorado */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 mt-8 mb-12">
        <div className="relative rounded-3xl border-2 border-blue-100 bg-white/80 shadow-2xl overflow-hidden px-8 py-12 flex flex-col gap-4 animate-fadein" style={{ backdropFilter: 'blur(8px)' }}>
          <div className="absolute inset-0 pointer-events-none rounded-3xl border border-white/60" style={{ zIndex: 1 }} />
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm">
              Bienvenido{session.user?.nombre ? ` ${session.user.nombre}` : nombrePostulacion ? ` ${nombrePostulacion}` : ''}
            </h1>
            <p className="mt-3 text-lg text-gray-600 font-medium">
              Gestiona tus postulaciones, pagos y comunicación con Global Express
            </p>
          </div>
        </div>
      </div>

      {/* Cards de resumen */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-14 px-4 animate-fadein relative z-10">
        {resumenCards.map((card, i) => (
          <div key={card.label} className={`flex items-center gap-4 p-6 rounded-2xl shadow-xl border border-gray-100 bg-white/70 backdrop-blur-md transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl relative overflow-hidden`} style={{ minHeight: '110px' }}>
            <div className={`absolute left-0 top-0 h-full w-2 rounded-l-2xl ${card.border} ${i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-green-500' : i === 2 ? 'bg-purple-500' : 'bg-orange-500'}`}></div>
            <div className="flex-shrink-0 ml-2">{card.icon}</div>
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-500">{card.label}</p>
              <p className="text-2xl font-extrabold text-gray-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Divisor suave */}
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <div className="h-0.5 w-full bg-gradient-to-r from-blue-100 via-gray-100 to-cyan-100 rounded-full opacity-70" />
      </div>

      {/* Acciones rápidas */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 mb-12 animate-fadein relative z-10">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="px-8 py-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Acciones Rápidas</h2>
                <p className="text-sm text-gray-600">Accede rápidamente a las funciones más utilizadas</p>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {accionesRapidas.length === 0 ? (
                  <div className="col-span-2 text-center text-gray-400 py-8">No hay acciones disponibles.</div>
                ) : (
                  accionesRapidas.map((accion) => (
                    <a
                      key={accion.title}
                      href={accion.href}
                      className={`group relative bg-gradient-to-br from-blue-50 to-white rounded-xl p-5 hover:from-blue-100 hover:to-cyan-50 transition-all duration-200 shadow-sm border border-gray-100 flex items-center gap-4 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    >
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${accion.color} flex items-center justify-center transition-colors duration-200 group-hover:scale-105`}>
                        <accion.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                          {accion.title}
                        </h3>
                        <p className="text-sm text-gray-500">{accion.description}</p>
                      </div>
                    </a>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Postulaciones recientes */}
        <div>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col">
            <div className="px-8 py-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Postulaciones Recientes</h2>
              <p className="text-sm text-gray-600">Estado de tus últimas aplicaciones</p>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between">
              {postulacionesRecientes.length === 0 ? (
                <div className="text-center text-gray-400 py-8">No tienes postulaciones recientes.</div>
              ) : (
                <div className="space-y-5">
                  {postulacionesRecientes.map((postulacion) => (
                    <div key={postulacion.id} className="flex items-center space-x-3 animate-fadein">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full ${postulacion.bgColor} flex items-center justify-center`}>
                        <postulacion.icon className={`h-4 w-4 ${postulacion.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {postulacion.programa}
                        </p>
                        <p className="text-sm text-gray-500">
                          {postulacion.estado} • {postulacion.fecha}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-6">
                <a
                  href="/area-personal/postulaciones"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                >
                  Ver todas las postulaciones →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notificaciones recientes */}
      <div className="max-w-7xl mx-auto px-4 animate-fadein relative z-10 mt-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="px-8 py-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Notificaciones Recientes</h2>
          </div>
          <div className="p-8">
            {false ? (
              <div className="text-center text-gray-400 py-8">No tienes notificaciones recientes.</div>
            ) : (
              <div className="space-y-5">
                <div className="flex items-start space-x-3 animate-fadein">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">
                      Tu postulación para <strong>Visa EB-3</strong> ha sido recibida y está en revisión.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Hace 2 horas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 animate-fadein">
                  <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">
                      Tu postulación para <strong>Sky Masters</strong> ha sido aprobada.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Hace 1 día</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 animate-fadein">
                  <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">
                      Tienes un pago pendiente por <strong>$500</strong> para continuar con tu proceso.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Hace 2 días</p>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-6">
              <a
                href="/area-personal/notificaciones"
                className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                Ver todas las notificaciones →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 