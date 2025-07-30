'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Eye, Search, Filter, Calendar, Building, DollarSign, Users, Link as LinkIcon } from 'lucide-react';

interface Vacante {
  id: string;
  empresa: string;
  cargo: string;
  salario?: string;
  descripcion?: string;
  email?: string;
  workers?: string;
  link?: string;
  activa: boolean;
  creado_en: string;
  actualizado_en: string;
}

export default function VacantesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [vacantes, setVacantes] = useState<Vacante[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActiva, setFilterActiva] = useState<'todas' | 'activas' | 'inactivas'>('todas');
  const [showModal, setShowModal] = useState(false);
  const [editingVacante, setEditingVacante] = useState<Vacante | null>(null);
  const [formData, setFormData] = useState({
    empresa: '',
    cargo: '',
    salario: '',
    descripcion: '',
    email: '',
    workers: '',
    link: '',
    activa: true
  });

  // Verificar permisos de administrador
  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session || (session.user?.rol !== 'ADMIN' && session.user?.rol !== 'SUPER_ADMIN')) {
      router.push('/ingreso-cliente');
      return;
    }
  }, [session, status, router]);

  // Cargar vacantes
  useEffect(() => {
    if (session?.user?.rol === 'ADMIN' || session?.user?.rol === 'SUPER_ADMIN') {
      fetchVacantes();
    }
  }, [session]);

  const fetchVacantes = async () => {
    try {
      const response = await fetch('/api/admin/vacantes');
      if (response.ok) {
        const data = await response.json();
        setVacantes(data);
      }
    } catch (error) {
      console.error('Error al cargar vacantes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingVacante 
        ? `/api/admin/vacantes/${editingVacante.id}`
        : '/api/admin/vacantes';
      
      const method = editingVacante ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(false);
        setEditingVacante(null);
        resetForm();
        fetchVacantes();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error al guardar vacante:', error);
      alert('Error al guardar la vacante');
    }
  };

  const handleEdit = (vacante: Vacante) => {
    setEditingVacante(vacante);
    setFormData({
      empresa: vacante.empresa,
      cargo: vacante.cargo,
      salario: vacante.salario || '',
      descripcion: vacante.descripcion || '',
      email: vacante.email || '',
      workers: vacante.workers || '',
      link: vacante.link || '',
      activa: vacante.activa
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta vacante?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/vacantes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchVacantes();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error al eliminar vacante:', error);
      alert('Error al eliminar la vacante');
    }
  };

  const handleToggleActiva = async (id: string, activa: boolean) => {
    try {
      const response = await fetch(`/api/admin/vacantes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ activa: !activa }),
      });

      if (response.ok) {
        fetchVacantes();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      alert('Error al cambiar el estado de la vacante');
    }
  };

  const resetForm = () => {
    setFormData({
      empresa: '',
      cargo: '',
      salario: '',
      descripcion: '',
      email: '',
      workers: '',
      link: '',
      activa: true
    });
  };

  const openNewModal = () => {
    setEditingVacante(null);
    resetForm();
    setShowModal(true);
  };

  // Filtrar vacantes
  const filteredVacantes = vacantes.filter(vacante => {
    const matchesSearch = 
      vacante.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacante.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (vacante.descripcion && vacante.descripcion.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = 
      filterActiva === 'todas' ||
      (filterActiva === 'activas' && vacante.activa) ||
      (filterActiva === 'inactivas' && !vacante.activa);
    
    return matchesSearch && matchesFilter;
  });

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Vacantes</h1>
        <p className="text-gray-600">Administra las vacantes de trabajo disponibles en el sitio</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Building className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Vacantes</p>
              <p className="text-2xl font-bold text-gray-900">{vacantes.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Eye className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Vacantes Activas</p>
              <p className="text-2xl font-bold text-gray-900">{vacantes.filter(v => v.activa).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Eye className="h-8 w-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Vacantes Inactivas</p>
              <p className="text-2xl font-bold text-gray-900">{vacantes.filter(v => !v.activa).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Nuevas Hoy</p>
              <p className="text-2xl font-bold text-gray-900">
                {vacantes.filter(v => {
                  const today = new Date().toDateString();
                  const createdDate = new Date(v.creado_en).toDateString();
                  return createdDate === today;
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            {/* Búsqueda */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar por empresa, cargo o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filtro de estado */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterActiva}
                onChange={(e) => setFilterActiva(e.target.value as 'todas' | 'activas' | 'inactivas')}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="todas">Todas las vacantes</option>
                <option value="activas">Solo activas</option>
                <option value="inactivas">Solo inactivas</option>
              </select>
            </div>
          </div>

          {/* Botón agregar */}
          <button
            onClick={openNewModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Agregar Vacante
          </button>
        </div>
      </div>

      {/* Tabla de vacantes */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cargo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVacantes.map((vacante) => (
                <tr key={vacante.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Building className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{vacante.empresa}</div>
                        {vacante.email && (
                          <div className="text-sm text-gray-500">{vacante.email}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{vacante.cargo}</div>
                    {vacante.descripcion && (
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {vacante.descripcion}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm text-gray-900">{vacante.salario || 'No especificado'}</span>
                    </div>
                    {vacante.workers && (
                      <div className="flex items-center mt-1">
                        <Users className="h-4 w-4 text-blue-600 mr-1" />
                        <span className="text-sm text-gray-500">{vacante.workers} trabajadores</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleActiva(vacante.id, vacante.activa)}
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        vacante.activa
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {vacante.activa ? 'Activa' : 'Inactiva'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(vacante.creado_en).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      {vacante.link && (
                        <a
                          href={vacante.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-900"
                          title="Ver enlace"
                        >
                          <LinkIcon className="h-4 w-4" />
                        </a>
                      )}
                      <button
                        onClick={() => handleEdit(vacante)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(vacante.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredVacantes.length === 0 && (
          <div className="text-center py-8">
            <Building className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay vacantes</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filterActiva !== 'todas' 
                ? 'No se encontraron vacantes con los filtros aplicados.'
                : 'Comienza agregando una nueva vacante.'
              }
            </p>
            {!searchTerm && filterActiva === 'todas' && (
              <div className="mt-6">
                <button
                  onClick={openNewModal}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
                >
                  <Plus className="h-4 w-4" />
                  Agregar Primera Vacante
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal para agregar/editar vacante */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {editingVacante ? 'Editar Vacante' : 'Agregar Nueva Vacante'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Empresa *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.empresa}
                    onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nombre de la empresa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cargo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cargo}
                    onChange={(e) => setFormData({...formData, cargo: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Título del puesto"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salario
                  </label>
                  <input
                    type="text"
                    value={formData.salario}
                    onChange={(e) => setFormData({...formData, salario: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: $18.83/hora"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Trabajadores
                  </label>
                  <input
                    type="text"
                    value={formData.workers}
                    onChange={(e) => setFormData({...formData, workers: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: 8"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email de Contacto
                  </label>
                  <input
                    type="text"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="email@empresa.com o No especificado"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enlace Externo
                  </label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://ejemplo.com/vacante"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Descripción detallada del trabajo, responsabilidades, requisitos..."
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="activa"
                  checked={formData.activa}
                  onChange={(e) => setFormData({...formData, activa: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="activa" className="ml-2 block text-sm text-gray-900">
                  Vacante activa (visible en el sitio)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingVacante ? 'Actualizar' : 'Crear'} Vacante
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 