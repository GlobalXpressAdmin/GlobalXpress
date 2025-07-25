'use client';

import { useEffect, useState } from 'react';
import { 
  MagnifyingGlassIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

type Postulacion = {
  id: string;
  nombre: string;
  email: string;
  empresa: string;
  cargo: string;
  estado_postulacion: string;
  creado_en: string;
  programa?: string;
};

type Formulario = {
  id: string;
  nombre: string;
  email: string;
  programa: string;
  estado: string;
  fecha_envio: string;
};

export default function AdminPostulaciones() {
  const [postulaciones, setPostulaciones] = useState<Postulacion[]>([]);
  const [formularios, setFormularios] = useState<Formulario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedItem, setSelectedItem] = useState<Postulacion | Formulario | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPostulaciones();
  }, []);

  const fetchPostulaciones = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch postulaciones
      const resPost = await fetch('/api/admin/postulaciones');
      const dataPost = await resPost.json();
      
      if (dataPost.ok) {
        setPostulaciones(dataPost.postulaciones);
      }

      // Fetch formularios
      const resForm = await fetch('/api/admin/formularios');
      const dataForm = await resForm.json();
      
      if (dataForm.ok) {
        setFormularios(dataForm.formularios);
      }

    } catch (error) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string, type: 'postulacion' | 'formulario') => {
    try {
      const endpoint = type === 'postulacion' 
        ? `/api/admin/postulaciones/${id}/status`
        : `/api/admin/formularios/${id}/status`;

      const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      const data = await res.json();
      
      if (data.ok) {
        if (type === 'postulacion') {
          setPostulaciones(postulaciones.map(p => 
            p.id === id ? { ...p, estado_postulacion: newStatus } : p
          ));
        } else {
          setFormularios(formularios.map(f => 
            f.id === id ? { ...f, estado: newStatus } : f
          ));
        }
      } else {
        setError(data.error || 'Error al actualizar estado');
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  const getAllItems = () => {
    const postItems = postulaciones.map(p => ({
      ...p,
      type: 'postulacion' as const,
      displayName: p.nombre,
      displayProgram: p.empresa,
      displayPosition: p.cargo,
      status: p.estado_postulacion,
      date: p.creado_en,
    }));

    const formItems = formularios.map(f => ({
      ...f,
      type: 'formulario' as const,
      displayName: f.nombre,
      displayProgram: f.programa,
      displayPosition: 'Programa',
      status: f.estado,
      date: f.fecha_envio,
    }));

    return [...postItems, ...formItems].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  const filteredItems = getAllItems().filter(item => {
    const matchesSearch = 
      item.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.displayProgram?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !statusFilter || item.status === statusFilter;
    const matchesType = !typeFilter || item.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APROBADA':
      case 'APROBADO':
        return 'bg-green-100 text-green-800';
      case 'RECHAZADA':
      case 'RECHAZADO':
        return 'bg-red-100 text-red-800';
      case 'EN_REVISION':
      case 'EN_PROCESO':
        return 'bg-yellow-100 text-yellow-800';
      case 'PENDIENTE':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APROBADA':
      case 'APROBADO':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'RECHAZADA':
      case 'RECHAZADO':
        return <XCircleIcon className="h-4 w-4" />;
      case 'EN_REVISION':
      case 'EN_PROCESO':
      case 'PENDIENTE':
        return <ClockIcon className="h-4 w-4" />;
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Postulaciones</h1>
          <p className="mt-2 text-gray-600">
            Revisa y gestiona todas las postulaciones y formularios enviados
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, empresa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos los estados</option>
            <option value="PENDIENTE">Pendiente</option>
            <option value="EN_REVISION">En revisión</option>
            <option value="EN_PROCESO">En proceso</option>
            <option value="APROBADA">Aprobada</option>
            <option value="RECHAZADA">Rechazada</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos los tipos</option>
            <option value="postulacion">Vacantes</option>
            <option value="formulario">Programas</option>
          </select>

          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('');
              setTypeFilter('');
            }}
            className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FunnelIcon className="h-4 w-4" />
            <span>Limpiar</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Items Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Solicitante
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empresa/Programa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cargo
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
              {filteredItems.map((item) => (
                <tr key={`${item.type}-${item.id}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {item.displayName?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.displayName || 'Sin nombre'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.type === 'postulacion' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {item.type === 'postulacion' ? 'Vacante' : 'Programa'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.displayProgram}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.displayPosition}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        <span className="ml-1">{item.status}</span>
                      </span>
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value, item.type)}
                        className="text-xs border border-gray-300 rounded px-1 py-0.5"
                      >
                        <option value="PENDIENTE">Pendiente</option>
                        <option value="EN_REVISION">En revisión</option>
                        <option value="EN_PROCESO">En proceso</option>
                        <option value="APROBADA">Aprobada</option>
                        <option value="RECHAZADA">Rechazada</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setShowModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900">Total Postulaciones</h3>
          <p className="text-3xl font-bold text-blue-600">{postulaciones.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900">Total Formularios</h3>
          <p className="text-3xl font-bold text-purple-600">{formularios.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900">Pendientes</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {getAllItems().filter(item => item.status === 'PENDIENTE').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900">Aprobadas</h3>
          <p className="text-3xl font-bold text-green-600">
            {getAllItems().filter(item => 
              item.status === 'APROBADA' || item.status === 'APROBADO'
            ).length}
          </p>
        </div>
      </div>

      {/* Modal for details */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Detalles de la {selectedItem.type === 'postulacion' ? 'Postulación' : 'Solicitud'}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nombre:</label>
                  <p className="text-sm text-gray-900">{selectedItem.displayName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email:</label>
                  <p className="text-sm text-gray-900">{selectedItem.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Tipo:</label>
                  <p className="text-sm text-gray-900">
                    {selectedItem.type === 'postulacion' ? 'Vacante' : 'Programa'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Estado:</label>
                  <p className="text-sm text-gray-900">{selectedItem.status}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {selectedItem.type === 'postulacion' ? 'Empresa:' : 'Programa:'}
                  </label>
                  <p className="text-sm text-gray-900">{selectedItem.displayProgram}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {selectedItem.type === 'postulacion' ? 'Cargo:' : 'Modalidad:'}
                  </label>
                  <p className="text-sm text-gray-900">{selectedItem.displayPosition}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Fecha:</label>
                  <p className="text-sm text-gray-900">
                    {selectedItem.date ? new Date(selectedItem.date).toLocaleString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}