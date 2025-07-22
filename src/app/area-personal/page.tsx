'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

type Postulacion = {
  id: string;
  programa?: string;
  empresa?: string;
  estado_postulacion?: string;
  creado_en?: string;
};

export default function AreaPersonal() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [nombrePostulacion, setNombrePostulacion] = useState<string | null>(null);
  const [loadingNombre, setLoadingNombre] = useState(false);
  const [stats, setStats] = useState({ postulaciones: 0, mensajesNuevos: 0 });
  const [postulacionesRecientes, setPostulacionesRecientes] = useState<Postulacion[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [errorStats, setErrorStats] = useState('');

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

  useEffect(() => {
    async function fetchStats() {
      if (!session?.user?.email) return;
      setLoadingStats(true);
      setErrorStats('');
      try {
        // Fetch postulaciones
        const resPost = await fetch(`/api/postulaciones?email=${session.user.email}`);
        const dataPost = await resPost.json();
        let postulaciones: Postulacion[] = [];
        if (dataPost.ok && dataPost.postulaciones) {
          postulaciones = dataPost.postulaciones;
        }
        // Fetch mensajes
        let mensajesNuevos = 0;
        const resMsg = await fetch(`/api/comunicacion?email=${session.user.email}`);
        const dataMsg = await resMsg.json();
        if (dataMsg.ok && dataMsg.comunicaciones) {
          mensajesNuevos = dataMsg.comunicaciones.filter((c: { estado: string }) => c.estado === 'PENDIENTE').length;
        }
        setStats({ postulaciones: postulaciones.length, mensajesNuevos });
        setPostulacionesRecientes(postulaciones.slice(0, 3));
      } catch {
        setErrorStats('Error al cargar los datos.');
      }
      setLoadingStats(false);
    }
    fetchStats();
  }, [session?.user?.email]);

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
  const accionesRapidas = [
    {
      title: 'Nueva Postulación',
      description: 'Aplicar a un nuevo programa',
      href: '/todas-vacantes',
      icon: DocumentTextIcon,
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      title: 'Contactar Asesor',
      description: 'Chat en vivo con soporte',
      href: '/area-personal/comunicacion',
      icon: ChatBubbleLeftRightIcon,
      color: 'bg-purple-500 hover:bg-purple-600',
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
      label: 'Mensajes Enviados a Soporte',
      value: stats.mensajesNuevos,
      icon: <ChatBubbleLeftRightIcon className="h-7 w-7 text-purple-500" />,
      bg: 'bg-purple-50',
      border: 'border-purple-100',
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
        {loadingStats ? (
          <div className="col-span-2 text-center text-gray-400 py-8">Cargando datos...</div>
        ) : errorStats ? (
          <div className="col-span-2 text-center text-red-500 py-8">{errorStats}</div>
        ) : (
          resumenCards.map((card, i) => (
            <div key={card.label} className={`flex items-center gap-4 p-6 rounded-2xl shadow-xl border border-gray-100 bg-white/70 backdrop-blur-md transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl relative overflow-hidden`} style={{ minHeight: '110px' }}>
              <div className={`absolute left-0 top-0 h-full w-2 rounded-l-2xl ${card.border} ${i === 0 ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
              <div className="flex-shrink-0 ml-2">{card.icon}</div>
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-500">{card.label}</p>
                <p className="text-2xl font-extrabold text-gray-900">{card.value}</p>
              </div>
            </div>
          ))
        )}
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
              {loadingStats ? (
                <div className="text-center text-gray-400 py-8">Cargando postulaciones...</div>
              ) : postulacionesRecientes.length === 0 ? (
                <div className="text-center text-gray-400 py-8">No tienes postulaciones recientes.</div>
              ) : (
                <div className="space-y-5">
                  {postulacionesRecientes.map((postulacion) => (
                    <div key={postulacion.id} className="flex items-center space-x-3 animate-fadein">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                        <DocumentTextIcon className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {postulacion.programa || postulacion.empresa || 'Programa'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {postulacion.estado_postulacion || 'Estado'} • {postulacion.creado_en ? new Date(postulacion.creado_en).toLocaleDateString() : ''}
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
      {/* Se elimina el bloque de notificaciones recientes para evitar duplicidad visual y dejar la gestión en la barra superior. */}
    </div>
  );
} 