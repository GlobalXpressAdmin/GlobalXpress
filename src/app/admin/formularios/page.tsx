'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Search, User, Mail, Phone, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface FormularioPrograma {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  visa: string;
  mensaje?: string;
  terminos: boolean;
  programa: string;
  fechaEnvio: string;
  estado: string;
}

export default function FormulariosPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formularios, setFormularios] = useState<FormularioPrograma[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<'todos' | 'RECIBIDO' | 'EN_REVISION' | 'EN_PROCESO' | 'APROBADO' | 'RECHAZADO' | 'FALTAN_DOCUMENTOS' | 'CONTACTADO' | 'COMPLETADO'>('todos');
  const [filterPrograma, setFilterPrograma] = useState<'todos' | 'VISA_E2' | 'VISA_EB2_NIW' | 'VISA_EB3' | 'VISA_EB5' | 'DUAL_PLACEMENT' | 'GLOBAL_ACADEMIC' | 'SKY_MASTERS'>('todos');

  // Verificar permisos de administrador
  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session || (session.user?.rol !== 'ADMIN' && session.user?.rol !== 'SUPER_ADMIN')) {
      router.push('/ingreso-cliente');
      return;
    }
  }, [session, status, router]);

  // Cargar formularios
  useEffect(() => {
    if (session?.user?.rol === 'ADMIN' || session?.user?.rol === 'SUPER_ADMIN') {
      fetchFormularios();
    }
  }, [session]);

  const fetchFormularios = async () => {
    try {
      const response = await fetch('/api/admin/formularios');
      if (response.ok) {
        const data = await response.json();
        setFormularios(data);
      }
    } catch (error) {
      console.error('Error al cargar formularios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEstado = async (id: number, nuevoEstado: string) => {
    try {
      const response = await fetch(`/api/admin/formularios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (response.ok) {
        fetchFormularios();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      alert('Error al actualizar el estado');
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'RECIBIDO':
        return 'bg-blue-100 text-blue-800';
      case 'EN_REVISION':
        return 'bg-yellow-100 text-yellow-800';
      case 'EN_PROCESO':
        return 'bg-orange-100 text-orange-800';
      case 'APROBADO':
        return 'bg-green-100 text-green-800';
      case 'RECHAZADO':
        return 'bg-red-100 text-red-800';
      case 'FALTAN_DOCUMENTOS':
        return 'bg-purple-100 text-purple-800';
      case 'CONTACTADO':
        return 'bg-indigo-100 text-indigo-800';
      case 'COMPLETADO':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgramaLabel = (programa: string) => {
    switch (programa) {
      case 'VISA_E2':
        return 'Visa E-2';
      case 'VISA_EB2_NIW':
        return 'Visa EB-2 NIW';
      case 'VISA_EB3':
        return 'Visa EB-3';
      case 'VISA_EB5':
        return 'Visa EB-5';
      case 'DUAL_PLACEMENT':
        return 'Dual Placement';
      case 'GLOBAL_ACADEMIC':
        return 'Global Academic';
      case 'SKY_MASTERS':
        return 'Sky Masters';
      default:
        return programa;
    }
  };

  const getVisaLabel = (visa: string) => {
    switch (visa) {
      case 'SI':
        return 'Sí';
      case 'NO':
        return 'No';
      default:
        return visa;
    }
  };

  // Filtrar formularios
  const filteredFormularios = formularios.filter(formulario => {
    const matchesSearch = 
      formulario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formulario.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formulario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formulario.programa.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEstado = filterEstado === 'todos' || formulario.estado === filterEstado;
    const matchesPrograma = filterPrograma === 'todos' || formulario.programa === filterPrograma;
    
    return matchesSearch && matchesEstado && matchesPrograma;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Formularios de Programa</h1>
          <p className="mt-2 text-sm text-gray-600">
            Gestiona los formularios de programas enviados por los usuarios
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Formularios</dt>
                    <dd className="text-lg font-medium text-gray-900">{formularios.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-blue-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pendientes</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {formularios.filter(f => f.estado === 'RECIBIDO' || f.estado === 'EN_REVISION').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Aprobados</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {formularios.filter(f => f.estado === 'APROBADO' || f.estado === 'COMPLETADO').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-6 w-6 text-red-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Rechazados</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {formularios.filter(f => f.estado === 'RECHAZADO').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Buscar por nombre, email o programa..."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  id="estado"
                  value={filterEstado}
                  onChange={(e) => setFilterEstado(e.target.value as 'todos' | 'RECIBIDO' | 'EN_REVISION' | 'EN_PROCESO' | 'APROBADO' | 'RECHAZADO' | 'FALTAN_DOCUMENTOS' | 'CONTACTADO' | 'COMPLETADO')}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="todos">Todos los estados</option>
                  <option value="RECIBIDO">Recibido</option>
                  <option value="EN_REVISION">En Revisión</option>
                  <option value="EN_PROCESO">En Proceso</option>
                  <option value="APROBADO">Aprobado</option>
                  <option value="RECHAZADO">Rechazado</option>
                  <option value="FALTAN_DOCUMENTOS">Faltan Documentos</option>
                  <option value="CONTACTADO">Contactado</option>
                  <option value="COMPLETADO">Completado</option>
                </select>
              </div>

              <div>
                <label htmlFor="programa" className="block text-sm font-medium text-gray-700 mb-2">
                  Programa
                </label>
                <select
                  id="programa"
                  value={filterPrograma}
                  onChange={(e) => setFilterPrograma(e.target.value as 'todos' | 'VISA_E2' | 'VISA_EB2_NIW' | 'VISA_EB3' | 'VISA_EB5' | 'DUAL_PLACEMENT' | 'GLOBAL_ACADEMIC' | 'SKY_MASTERS')}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="todos">Todos los programas</option>
                  <option value="VISA_E2">Visa E-2</option>
                  <option value="VISA_EB2_NIW">Visa EB-2 NIW</option>
                  <option value="VISA_EB3">Visa EB-3</option>
                  <option value="VISA_EB5">Visa EB-5</option>
                  <option value="DUAL_PLACEMENT">Dual Placement</option>
                  <option value="GLOBAL_ACADEMIC">Global Academic</option>
                  <option value="SKY_MASTERS">Sky Masters</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Programa
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Visa
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
                  {filteredFormularios.map((formulario) => (
                    <tr key={formulario.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {formulario.nombre} {formulario.apellido}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail className="h-4 w-4 mr-1" />
                              {formulario.email}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              {formulario.telefono}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getProgramaLabel(formulario.programa)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getVisaLabel(formulario.visa)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(formulario.estado)}`}>
                          {formulario.estado.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(formulario.fechaEnvio).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <select
                          value={formulario.estado}
                          onChange={(e) => handleUpdateEstado(formulario.id, e.target.value)}
                          className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="RECIBIDO">Recibido</option>
                          <option value="EN_REVISION">En Revisión</option>
                          <option value="EN_PROCESO">En Proceso</option>
                          <option value="APROBADO">Aprobado</option>
                          <option value="RECHAZADO">Rechazado</option>
                          <option value="FALTAN_DOCUMENTOS">Faltan Documentos</option>
                          <option value="CONTACTADO">Contactado</option>
                          <option value="COMPLETADO">Completado</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredFormularios.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No se encontraron formularios que coincidan con los filtros.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 