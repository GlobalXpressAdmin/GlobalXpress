'use client';

import { useEffect, useState } from 'react';
import { 
  UsersIcon, 
  BriefcaseIcon, 
  DocumentTextIcon, 
  ChatBubbleLeftRightIcon,
  TrendingUpIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

type DashboardStats = {
  totalUsers: number;
  totalVacantes: number;
  totalPostulaciones: number;
  totalMensajes: number;
  postulacionesRecientes: number;
  usuariosRecientes: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalVacantes: 0,
    totalPostulaciones: 0,
    totalMensajes: 0,
    postulacionesRecientes: 0,
    usuariosRecientes: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        setError('');
        
        const res = await fetch('/api/admin/dashboard-stats');
        const data = await res.json();
        
        if (data.ok) {
          setStats(data.stats);
        } else {
          setError(data.error || 'Error al cargar estadísticas');
        }
      } catch (error) {
        setError('Error de conexión');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const statsCards = [
    {
      name: 'Total Usuarios',
      value: stats.totalUsers,
      icon: UsersIcon,
      color: 'bg-blue-500',
      href: '/admin/usuarios'
    },
    {
      name: 'Total Vacantes',
      value: stats.totalVacantes,
      icon: BriefcaseIcon,
      color: 'bg-green-500',
      href: '/admin/vacantes'
    },
    {
      name: 'Total Postulaciones',
      value: stats.totalPostulaciones,
      icon: DocumentTextIcon,
      color: 'bg-purple-500',
      href: '/admin/postulaciones'
    },
    {
      name: 'Mensajes Pendientes',
      value: stats.totalMensajes,
      icon: ChatBubbleLeftRightIcon,
      color: 'bg-orange-500',
      href: '/admin/mensajeria'
    },
    {
      name: 'Postulaciones Recientes',
      value: stats.postulacionesRecientes,
      icon: TrendingUpIcon,
      color: 'bg-indigo-500',
      href: '/admin/postulaciones'
    },
    {
      name: 'Usuarios Recientes',
      value: stats.usuariosRecientes,
      icon: ClockIcon,
      color: 'bg-pink-500',
      href: '/admin/usuarios'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Resumen general de la plataforma
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((card) => (
          <div
            key={card.name}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => window.location.href = card.href}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {card.value.toLocaleString()}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${card.color}`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => window.location.href = '/admin/vacantes/nueva'}
            className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <BriefcaseIcon className="h-5 w-5" />
            <span>Nueva Vacante</span>
          </button>
          <button
            onClick={() => window.location.href = '/admin/usuarios'}
            className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <UsersIcon className="h-5 w-5" />
            <span>Gestionar Usuarios</span>
          </button>
          <button
            onClick={() => window.location.href = '/admin/mensajeria'}
            className="flex items-center justify-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            <ChatBubbleLeftRightIcon className="h-5 w-5" />
            <span>Responder Mensajes</span>
          </button>
        </div>
      </div>
    </div>
  );
}