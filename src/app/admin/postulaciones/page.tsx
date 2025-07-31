'use client';

import React, { useState, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';

interface Postulacion {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  empresa: string;
  cargo: string;
  estado_postulacion: string;
  creado_en: string;
  programa: string;
}

export default function AdminPostulaciones() {
  const [postulaciones, setPostulaciones] = useState<Postulacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('TODOS');
  const [selectedPostulacion, setSelectedPostulacion] = useState<Postulacion | null>(null);

  useEffect(() => {
    fetchPostulaciones();
  }, []);

  const fetchPostulaciones = async () => {
    try {
      const response = await fetch('/api/admin/postulaciones');
      if (response.ok) {
        const data = await response.json();
        setPostulaciones(data.postulaciones);
      }
    } catch (error) {
      console.error('Error fetching postulaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEstado = async (id: string, nuevoEstado: string) => {
    try {
      const response = await fetch(`/api/admin/postulaciones/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado_postulacion: nuevoEstado }),
      });

      if (response.ok) {
        setPostulaciones(postulaciones.map(p => 
          p.id === id ? { ...p, estado_postulacion: nuevoEstado } : p
        ));
      }
    } catch (error) {
      console.error('Error updating postulacion:', error);
    }
  };

  const filteredPostulaciones = postulaciones.filter(postulacion => {
    const matchesSearch = postulacion.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         postulacion.apellido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         postulacion.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         postulacion.empresa?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEstado = filterEstado === 'TODOS' || postulacion.estado_postulacion === filterEstado;
    
    return matchesSearch && matchesEstado;
  });

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'PENDIENTE':
        return 'bg-yellow-100 text-yellow-800';
      case 'EN_REVISION':
        return 'bg-blue-100 text-blue-800';
      case 'APROBADA':
        return 'bg-green-100 text-green-800';
      case 'RECHAZADA':
        return 'bg-red-100 text-red-800';
      case 'EN_PROCESO':
        return 'bg-purple-100 text-purple-800';
      case 'ADMITIDA':
        return 'bg-emerald-100 text-emerald-800';
      case 'DENEGADA':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'PENDIENTE':
        return <ClockIcon className="h-4 w-4" />;
      case 'APROBADA':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'RECHAZADA':
        return <XCircleIcon className="h-4 w-4" />;
      case 'ADMITIDA':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'DENEGADA':
        return <XCircleIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
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
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Postulaciones</h1>
        <p className="mt-1 text-sm text-gray-500">
          Revisa y gestiona todas las postulaciones de trabajo
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Buscar
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pr-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Nombre, email o empresa..."
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="estado-filter" className="block text-sm font-medium text-gray-700">
              Filtrar por Estado
            </label>
            <select
              id="estado-filter"
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="TODOS">Todos los estados</option>
              <option value="PENDIENTE">Pendiente</option>
              <option value="EN_REVISION">En Revisión</option>
              <option value="APROBADA">Aprobada</option>
              <option value="RECHAZADA">Rechazada</option>
              <option value="EN_PROCESO">En Proceso</option>
              <option value="ADMITIDA">Admitida</option>
              <option value="DENEGADA">Denegada</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setFilterEstado('TODOS');
              }}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FunnelIcon className="h-4 w-4 mr-2" />
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de postulaciones */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vacante
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPostulaciones.map((postulacion) => (
                  <tr key={postulacion.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {postulacion.nombre?.charAt(0) || postulacion.email.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {postulacion.nombre} {postulacion.apellido}
                          </div>
                          <div className="text-sm text-gray-500">
                            {postulacion.email}
                          </div>
                          <div className="text-sm text-gray-500">
                            {postulacion.telefono}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {postulacion.empresa}
                      </div>
                      <div className="text-sm text-gray-500">
                        {postulacion.cargo}
                      </div>
                      <div className="text-sm text-gray-500">
                        {postulacion.programa}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(postulacion.estado_postulacion)}`}>
                        {getEstadoIcon(postulacion.estado_postulacion)}
                        <span className="ml-1">{postulacion.estado_postulacion}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(postulacion.creado_en).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedPostulacion(postulacion)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <select
                          value={postulacion.estado_postulacion}
                          onChange={(e) => handleUpdateEstado(postulacion.id, e.target.value)}
                          className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="PENDIENTE">Pendiente</option>
                          <option value="EN_REVISION">En Revisión</option>
                          <option value="APROBADA">Aprobada</option>
                          <option value="RECHAZADA">Rechazada</option>
                          <option value="EN_PROCESO">En Proceso</option>
                          <option value="ADMITIDA">Admitida</option>
                          <option value="DENEGADA">Denegada</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPostulaciones.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No se encontraron postulaciones que coincidan con los filtros.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de detalles */}
      {selectedPostulacion && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Detalles de Postulación</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Candidato</label>
                  <p className="text-sm text-gray-900">{selectedPostulacion.nombre} {selectedPostulacion.apellido}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-sm text-gray-900">{selectedPostulacion.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <p className="text-sm text-gray-900">{selectedPostulacion.telefono}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Empresa</label>
                  <p className="text-sm text-gray-900">{selectedPostulacion.empresa}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cargo</label>
                  <p className="text-sm text-gray-900">{selectedPostulacion.cargo}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Programa</label>
                  <p className="text-sm text-gray-900">{selectedPostulacion.programa}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estado</label>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(selectedPostulacion.estado_postulacion)}`}>
                    {selectedPostulacion.estado_postulacion}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha de Postulación</label>
                  <p className="text-sm text-gray-900">{new Date(selectedPostulacion.creado_en).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedPostulacion(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 