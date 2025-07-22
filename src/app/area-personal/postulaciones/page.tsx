'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import vacantes from '../../../components/vacantesData';
import { BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

// Definir el tipo de postulación para evitar errores de acceso a propiedades
type Postulacion = {
  id: string;
  empresa: string;
  cargo: string;
  creado_en: string;
  estado_postulacion: string;
  logo?: string;
};

type Formulario = {
  id: string;
  programa?: string;
  visa?: string;
  estado?: string;
  fechaEnvio?: string;
  fecha_envio?: string;
  creado_en?: string;
  // agrega aquí los campos que realmente usas en el render
};

function getVacanteInfo(empresa: string, cargo: string) {
  return vacantes.find(v => v.empresa === empresa && v.cargo === cargo);
}

export default function MisPostulaciones() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [postulaciones, setPostulaciones] = useState<Postulacion[]>([]);
  const [filtro, setFiltro] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState<{ tipo: 'ver' | 'editar', postulacion: Postulacion | Formulario | null } | null>(null);
  const [formularios, setFormularios] = useState<Formulario[]>([]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchPostulaciones();
      fetchFormularios();
    } else if (status === 'unauthenticated') {
      router.push('/ingreso-cliente');
    }
  }, [status, fetchFormularios, fetchPostulaciones, router]);

  async function fetchPostulaciones() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/postulaciones?email=' + session?.user?.email);
      const data = await res.json();
      if (data.ok && data.postulaciones) {
        setPostulaciones(data.postulaciones);
      } else {
        setPostulaciones([]);
      }
    } catch {
      setError('Error al cargar tus postulaciones.');
    }
    setLoading(false);
  }

  async function fetchFormularios() {
    try {
      const res = await fetch('/api/formularios-programa?email=' + session?.user?.email);
      const data = await res.json();
      if (data.ok && data.formularios) {
        setFormularios(data.formularios);
      } else {
        setFormularios([]);
      }
    } catch {
      // No mostrar error aquí, solo dejar vacío
      setFormularios([]);
    }
  }

  function handleFiltro(e: React.ChangeEvent<HTMLSelectElement>) {
    setFiltro(e.target.value);
  }
  function handleBusqueda(e: React.ChangeEvent<HTMLInputElement>) {
    setBusqueda(e.target.value);
  }

  // Función de edición eliminada porque no hay lógica de edición implementada actualmente..

  function getAllProcesos() {
    // Unifica postulaciones y formularios, normalizando campos
    const vacantes = postulaciones.map(p => ({
      id: p.id,
      tipo: 'Vacante',
      icon: <BriefcaseIcon className="h-5 w-5 text-blue-700" />,
      empresa: p.empresa,
      cargo: p.cargo,
      estado: p.estado_postulacion,
      fecha: String(p.creado_en ?? ''),
      detalles: p,
    }));
    const programas = formularios.map(f => ({
      id: f.id,
      tipo: 'Programa',
      icon: <AcademicCapIcon className="h-5 w-5 text-purple-700" />,
      empresa: f.programa,
      cargo: f.visa || '-',
      estado: f.estado,
      fecha: String(f.fechaEnvio ?? f.fecha_envio ?? f.creado_en ?? ''),
      detalles: f,
    }));
    // Unir y ordenar por fecha descendente
    return [...vacantes, ...programas].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  }

  return (
    <section className="w-full min-h-screen bg-white mb-16">
      <div className="w-full h-[300px] flex items-center justify-start relative bg-cover bg-center" style={{ backgroundImage: "url('/fondobannerpostulacion.png')" }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-start justify-center w-full h-full pl-2 md:pl-10 pt-20 md:pt-32">
          <h1 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow-lg uppercase leading-tight text-left">
            MIS POSTULACIONES
          </h1>
          <h2 className="text-xl md:text-2xl font-extrabold text-cyan-400 drop-shadow-lg uppercase mt-2 text-left">
            Historial y seguimiento de tus aplicaciones
          </h2>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 w-full px-2 md:px-0">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <input type="text" placeholder="Buscar por empresa o cargo..." value={busqueda} onChange={handleBusqueda} className="border rounded-lg px-4 py-2 w-full md:w-72" />
          <select value={filtro} onChange={handleFiltro} className="border rounded-lg px-4 py-2 w-full md:w-56">
            <option value="">Todos los estados</option>
            <option value="PENDIENTE">Pendiente</option>
            <option value="EN_REVISION">En revisión</option>
            <option value="ENTREVISTA">Entrevista</option>
            <option value="ACEPTADA">Aceptada</option>
            <option value="RECHAZADA">Rechazada</option>
          </select>
          <button className="bg-blue-800 text-white px-6 py-2 rounded-lg font-bold text-base shadow hover:bg-blue-900 transition-all" onClick={() => router.push('/todas-vacantes')}>Ver vacantes</button>
        </div>
        {loading ? (
          <div className="text-center py-20 text-lg text-blue-900 font-semibold">Cargando tus postulaciones...</div>
        ) : getAllProcesos().length === 0 ? (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-10 text-center text-blue-900 font-semibold text-xl shadow">
            <Image src="/file.svg" alt="Sin postulaciones" width={80} height={80} className="mx-auto mb-4" />
            Aún no has realizado ninguna postulación.<br />
            <span className="text-base font-normal text-gray-600">Explora nuestras vacantes y da el primer paso hacia tu futuro profesional.</span>
            <div className="mt-6">
              <button className="bg-blue-800 text-white px-8 py-2 rounded-lg font-bold text-lg shadow hover:bg-blue-900 transition-all" onClick={() => router.push('/todas-vacantes')}>Ver vacantes</button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow-md">
              <thead>
                <tr className="bg-[#054B74] text-white text-left">
                  <th className="px-6 py-4">Tipo</th>
                  <th className="px-6 py-4">Empresa/Programa</th>
                  <th className="px-6 py-4">Cargo/Modalidad</th>
                  <th className="px-6 py-4">Fecha</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {getAllProcesos().map((p) => (
                  <tr key={p.tipo + '-' + p.id} className="border-b hover:bg-blue-50 transition-all">
                    <td className="px-6 py-4 flex items-center gap-2 font-semibold">
                      {p.icon}
                      {p.tipo}
                    </td>
                    <td className="px-6 py-4">{p.empresa}</td>
                    <td className="px-6 py-4">{p.cargo}</td>
                    <td className="px-6 py-4">{p.fecha ? new Date(p.fecha).toLocaleDateString() : ''}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.estado === 'APROBADA' || p.estado === 'APROBADO' || p.estado === 'COMPLETADO' ? 'bg-green-100 text-green-700' : p.estado === 'RECHAZADA' || p.estado === 'RECHAZADO' ? 'bg-red-100 text-red-700' : p.estado === 'EN_REVISION' ? 'bg-blue-100 text-blue-700' : p.estado === 'EN_PROCESO' ? 'bg-yellow-100 text-yellow-700' : p.estado === 'FALTAN_DOCUMENTOS' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'}`}>{p.estado}</span>
                    </td>
                    <td className="px-6 py-4 flex gap-2 items-center">
                      <button className="text-blue-700 underline" onClick={() => setModal({ tipo: 'ver', postulacion: p.detalles })}>Ver</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-xs text-gray-500 mt-4">¿Tienes dudas sobre tus procesos? <a href="/contacto" className="text-blue-700 underline">Contáctanos aquí</a>.</div>
          </div>
        )}
        {error && <div className="text-red-600 text-center mt-4">{error}</div>}
        {/* Modal profesional para ver/editar */}
        {modal && modal.postulacion && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full relative p-8 animate-fade-in pointer-events-auto">
              <button className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold" onClick={() => setModal(null)} aria-label="Cerrar">×</button>
              {modal.tipo === 'ver' ? (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-blue-900">Detalles de la postulación</h2>
                  <div className="mb-4">
                    {'empresa' in modal.postulacion ? (
                      <>
                        <b>Empresa:</b> {modal.postulacion.empresa}<br />
                        <b>Cargo:</b> {modal.postulacion.cargo}<br />
                        <b>Fecha:</b> {modal.postulacion.creado_en ? new Date(modal.postulacion.creado_en).toLocaleDateString() : ''}<br />
                        <b>Estado:</b> {modal.postulacion.estado_postulacion}<br />
                        {getVacanteInfo(modal.postulacion.empresa, modal.postulacion.cargo) && (
                          <>
                            <b>Descripción:</b> {getVacanteInfo(modal.postulacion.empresa, modal.postulacion.cargo)?.descripcion}<br />
                            <b>Salario:</b> {getVacanteInfo(modal.postulacion.empresa, modal.postulacion.cargo)?.salario}<br />
                            <b>Email empresa:</b> {getVacanteInfo(modal.postulacion.empresa, modal.postulacion.cargo)?.email}<br />
                            <b>Vacantes:</b> {getVacanteInfo(modal.postulacion.empresa, modal.postulacion.cargo)?.workers}<br />
                            <b>Enlace:</b> <a href={getVacanteInfo(modal.postulacion.empresa, modal.postulacion.cargo)?.link} target="_blank" className="text-blue-700 underline">Ver oferta</a><br />
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <b>Programa:</b> {modal.postulacion.programa}<br />
                        <b>Visa:</b> {modal.postulacion.visa}<br />
                        <b>Fecha:</b> {typeof modal.postulacion.fechaEnvio === 'string' && modal.postulacion.fechaEnvio ? new Date(modal.postulacion.fechaEnvio).toLocaleDateString() : ''}<br />
                        <b>Estado:</b> {modal.postulacion.estado}<br />
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-blue-900">Editar postulación</h2>
                  {/* Formulario de edición profesional aquí, prellenado con modal.postulacion */}
                  {/* ... */}
                  {/* <button className="bg-green-700 text-white px-6 py-2 rounded font-bold mt-4" onClick={guardarEdicion}>Guardar cambios</button> */}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 