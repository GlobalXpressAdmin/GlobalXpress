'use client';

import { useEffect, useState } from 'react';
import { 
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

type Usuario = {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  nacionalidad?: string;
  creado_en: string;
  rol?: string;
};

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete'>('view');

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      setError('');
      
      const res = await fetch('/api/admin/usuarios');
      const data = await res.json();
      
      if (data.ok) {
        setUsuarios(data.usuarios);
      } else {
        setError(data.error || 'Error al cargar usuarios');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (usuarioId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/usuarios/${usuarioId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      
      if (data.ok) {
        setUsuarios(usuarios.filter(u => u.id !== usuarioId));
        setShowModal(false);
      } else {
        setError(data.error || 'Error al eliminar usuario');
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  const handleUpdateUsuario = async (usuarioId: string, updatedData: Partial<Usuario>) => {
    try {
      const res = await fetch(`/api/admin/usuarios/${usuarioId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      
      if (data.ok) {
        setUsuarios(usuarios.map(u => 
          u.id === usuarioId ? { ...u, ...updatedData } : u
        ));
        setShowModal(false);
      } else {
        setError(data.error || 'Error al actualizar usuario');
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.nacionalidad?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="mt-2 text-gray-600">
            Administra los usuarios registrados en la plataforma
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nacionalidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsuarios.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {usuario.nombre?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {usuario.nombre || 'Sin nombre'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {usuario.rol || 'USER'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {usuario.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {usuario.telefono || 'No especificado'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {usuario.nacionalidad || 'No especificado'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {usuario.creado_en ? new Date(usuario.creado_en).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUsuario(usuario);
                          setModalType('view');
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUsuario(usuario);
                          setModalType('edit');
                          setShowModal(true);
                        }}
                        className="text-green-600 hover:text-green-900"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUsuario(usuario);
                          setModalType('delete');
                          setShowModal(true);
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedUsuario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            {modalType === 'view' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Detalles del Usuario</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nombre:</label>
                    <p className="text-sm text-gray-900">{selectedUsuario.nombre || 'No especificado'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email:</label>
                    <p className="text-sm text-gray-900">{selectedUsuario.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Teléfono:</label>
                    <p className="text-sm text-gray-900">{selectedUsuario.telefono || 'No especificado'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nacionalidad:</label>
                    <p className="text-sm text-gray-900">{selectedUsuario.nacionalidad || 'No especificado'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Rol:</label>
                    <p className="text-sm text-gray-900">{selectedUsuario.rol || 'USER'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Fecha de registro:</label>
                    <p className="text-sm text-gray-900">
                      {selectedUsuario.creado_en ? new Date(selectedUsuario.creado_en).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {modalType === 'edit' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Editar Usuario</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleUpdateUsuario(selectedUsuario.id, {
                    nombre: formData.get('nombre') as string,
                    telefono: formData.get('telefono') as string,
                    nacionalidad: formData.get('nacionalidad') as string,
                    rol: formData.get('rol') as string,
                  });
                }}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nombre</label>
                      <input
                        type="text"
                        name="nombre"
                        defaultValue={selectedUsuario.nombre || ''}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                      <input
                        type="text"
                        name="telefono"
                        defaultValue={selectedUsuario.telefono || ''}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nacionalidad</label>
                      <input
                        type="text"
                        name="nacionalidad"
                        defaultValue={selectedUsuario.nacionalidad || ''}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Rol</label>
                      <select
                        name="rol"
                        defaultValue={selectedUsuario.rol || 'USER'}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="USER">Usuario</option>
                        <option value="ADMIN">Administrador</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {modalType === 'delete' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Eliminar Usuario</h3>
                <p className="text-sm text-gray-600 mb-4">
                  ¿Estás seguro de que quieres eliminar al usuario <strong>{selectedUsuario.nombre || selectedUsuario.email}</strong>?
                  Esta acción no se puede deshacer.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleDelete(selectedUsuario.id)}
                    className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900">Total Usuarios</h3>
          <p className="text-3xl font-bold text-blue-600">{usuarios.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900">Usuarios Activos</h3>
          <p className="text-3xl font-bold text-green-600">{usuarios.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900">Administradores</h3>
          <p className="text-3xl font-bold text-purple-600">
            {usuarios.filter(u => u.rol === 'ADMIN').length}
          </p>
        </div>
      </div>
    </div>
  );
}