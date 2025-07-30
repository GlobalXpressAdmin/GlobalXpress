'use client';

import React, { useState, useEffect } from 'react';
import {
  UsersIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,

  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';

interface DashboardStats {
  totalUsuarios: number;
  totalPostulaciones: number;
  totalFormularios: number;
  totalComunicaciones: number;
  postulacionesPendientes: number;
  formulariosPendientes: number;
  comunicacionesPendientes: number;
  usuariosNuevosHoy: number;
  totalVacantes: number;
  vacantesActivas: number;
}

interface RecentActivity {
  id: string;
  tipo: string;
  descripcion: string;
  fecha: string;
  estado: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsuarios: 0,
    totalPostulaciones: 0,
    totalFormularios: 0,
    totalComunicaciones: 0,
    postulacionesPendientes: 0,
    formulariosPendientes: 0,
    comunicacionesPendientes: 0,
    usuariosNuevosHoy: 0,
    totalVacantes: 0,
    vacantesActivas: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, activityRes] = await Promise.all([
        fetch('/api/admin/dashboard-stats'),
        fetch('/api/admin/recent-activity')
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      if (activityRes.ok) {
        const activityData = await activityRes.json();
        if (activityData.ok && activityData.activity) {
          setRecentActivity(activityData.activity);
        } else {
          setRecentActivity([]);
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      name: 'Total Usuarios',
      value: stats.totalUsuarios,
      icon: UsersIcon,
      color: 'bg-blue-500',
      change: `+${stats.usuariosNuevosHoy} hoy`,
    },
    {
      name: 'Vacantes',
      value: stats.totalVacantes,
      icon: DocumentTextIcon,
      color: 'bg-orange-500',
      change: `${stats.vacantesActivas} activas`,
    },
    {
      name: 'Postulaciones',
      value: stats.totalPostulaciones,
      icon: DocumentTextIcon,
      color: 'bg-green-500',
      change: `${stats.postulacionesPendientes} pendientes`,
    },
    {
      name: 'Formularios Programa',
      value: stats.totalFormularios,
      icon: ClipboardDocumentIcon,
      color: 'bg-purple-500',
      change: `${stats.formulariosPendientes} pendientes`,
    },
    {
      name: 'Comunicaciones',
      value: stats.totalComunicaciones,
      icon: ChatBubbleLeftRightIcon,
      color: 'bg-orange-500',
      change: `${stats.comunicacionesPendientes} pendientes`,
    },
  ];

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'PENDIENTE':
        return 'text-yellow-600 bg-yellow-100';
      case 'APROBADO':
      case 'APROBADA':
        return 'text-green-600 bg-green-100';
      case 'RECHAZADO':
      case 'RECHAZADA':
        return 'text-red-600 bg-red-100';
      case 'EN_REVISION':
      case 'EN_PROCESO':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getActivityIcon = (tipo: string) => {
    switch (tipo) {
      case 'USUARIO':
        return <UsersIcon className="h-5 w-5 text-blue-500" />;
      case 'POSTULACION':
        return <DocumentTextIcon className="h-5 w-5 text-green-500" />;
      case 'FORMULARIO':
        return <ClipboardDocumentIcon className="h-5 w-5 text-purple-500" />;
      case 'COMUNICACION':
        return <ChatBubbleLeftRightIcon className="h-5 w-5 text-orange-500" />;
      default:
        return <DocumentTextIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard de Administración</h1>
        <p className="mt-1 text-sm text-gray-500">
          Resumen general de la actividad del sistema
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statCards.map((card) => (
          <div
            key={card.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
          >
            <dt>
              <div className={`absolute rounded-md p-3 ${card.color}`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {card.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
              <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                {card.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Actividad Reciente
          </h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {!recentActivity || recentActivity.length === 0 ? (
                <li className="text-center py-8 text-gray-500">
                  No hay actividad reciente
                </li>
              ) : (
                recentActivity.map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== recentActivity.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-gray-100">
                            {getActivityIcon(activity.tipo)}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              {activity.descripcion}
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <time dateTime={activity.fecha}>
                              {new Date(activity.fecha).toLocaleDateString()}
                            </time>
                            <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activity.estado)}`}>
                              {activity.estado}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Acciones Rápidas
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="/admin/usuarios"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <UsersIcon className="h-6 w-6 text-blue-500" />
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">Gestionar Usuarios</p>
                <p className="text-sm text-gray-500">Ver y editar usuarios</p>
              </div>
            </a>

            <a
              href="/admin/postulaciones"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <DocumentTextIcon className="h-6 w-6 text-green-500" />
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">Revisar Postulaciones</p>
                <p className="text-sm text-gray-500">Aprobar o rechazar</p>
              </div>
            </a>

            <a
              href="/admin/formularios"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <ClipboardDocumentIcon className="h-6 w-6 text-purple-500" />
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">Formularios Programa</p>
                <p className="text-sm text-gray-500">Gestionar solicitudes</p>
              </div>
            </a>

            <a
              href="/admin/comunicaciones"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-orange-500" />
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">Responder Mensajes</p>
                <p className="text-sm text-gray-500">Soporte al cliente</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 