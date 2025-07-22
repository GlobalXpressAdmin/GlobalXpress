'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { 
  CameraIcon
} from '@heroicons/react/24/outline';

type FieldErrors = {
  nombre?: string;
  telefono?: string;
  indicativo?: string;
  // agrega aquí los campos que validas
};

export default function PerfilPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    indicativo: '',
    telefono: '',
    fechaNacimiento: '',
    nacionalidad: '',
    genero: '',
    image: '',
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const INDICATIVOS = [
    { code: '+1', country: 'EE.UU./Canadá' },
    { code: '+34', country: 'España' },
    { code: '+52', country: 'México' },
    { code: '+57', country: 'Colombia' },
    { code: '+51', country: 'Perú' },
    { code: '+54', country: 'Argentina' },
    { code: '+56', country: 'Chile' },
    { code: '+593', country: 'Ecuador' },
    { code: '+55', country: 'Brasil' },
    { code: '+507', country: 'Panamá' },
    // ...otros países relevantes
  ];
  const INDICATIVOS_CODES = INDICATIVOS.map(i => i.code);

  const camposObligatorios = [
    { key: 'nombre', label: 'Nombre completo' },
    { key: 'telefono', label: 'Teléfono' },
    { key: 'nacionalidad', label: 'Nacionalidad' },
    { key: 'fechaNacimiento', label: 'Fecha de nacimiento' },
    { key: 'genero', label: 'Género' },
  ];
  const totalCampos = camposObligatorios.length;
  const camposCompletos = [
    formData.nombre,
    formData.telefono,
    formData.nacionalidad,
    formData.fechaNacimiento,
    formData.genero
  ].filter(Boolean);
  const completitud = Math.round((camposCompletos.length / totalCampos) * 100);
  const camposFaltantes: string[] = [];
  if (!formData.nombre) camposFaltantes.push('Nombre completo');
  if (!formData.telefono) camposFaltantes.push('Teléfono');
  if (!formData.nacionalidad) camposFaltantes.push('Nacionalidad');
  if (!formData.fechaNacimiento) camposFaltantes.push('Fecha de nacimiento');
  if (!formData.genero) camposFaltantes.push('Género');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/ingreso-cliente');
    }
  }, [status, router]);

  // Cargar datos del perfil desde la API
  useEffect(() => {
    const cargarPerfil = async () => {
      if (session?.user?.email) {
        try {
          console.log('Email de la sesión:', session.user.email);
          
          // Primero verificar la base de datos
          const resDB = await fetch('/api/debug/database');
          const dataDB = await resDB.json();
          console.log('Estado de la base de datos:', dataDB);
          
          // Usar directamente el email de la sesión del cliente
          const res = await fetch('/api/usuario/perfil', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: session.user.email })
          });
          
          const data = await res.json();
          console.log('Respuesta del servidor:', data);
          
          if (data.ok) {
            console.log('Datos del perfil cargados:', data.usuario);
            // Limpiar indicativo si no es válido o si tiene texto adicional
            let indicativoValido = '';
            if (typeof data.usuario.indicativo === 'string') {
              const code = data.usuario.indicativo.match(/^\+\d+/)?.[0] || '';
              if (INDICATIVOS_CODES.includes(code)) indicativoValido = code;
            }
            setFormData({
              nombre: data.usuario.nombre || '',
              email: data.usuario.email || '',
              indicativo: indicativoValido,
              telefono: data.usuario.telefono || '',
              fechaNacimiento: data.usuario.fechaNacimiento || '',
              nacionalidad: data.usuario.nacionalidad || '',
              genero: data.usuario.genero || '',
              image: data.usuario.image || '',
            });
          } else {
            console.error('Error al cargar perfil:', data.error);
            if (data.debug) {
              console.log('Información de debug:', data.debug);
            }
            setErrorMsg(data.error || 'Error al cargar el perfil.');
          }
        } catch (error) {
          console.error('Error al cargar perfil:', error);
          setErrorMsg('Error de conexión al cargar el perfil.');
        } finally {
          setIsLoading(false);
        }
      } else {
        console.log('No hay email en la sesión:', session);
        setIsLoading(false);
      }
    };

    if (session) {
      cargarPerfil();
    }
  }, [session]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};
    if (!formData.nombre.trim()) errors.nombre = 'El nombre es obligatorio.';
    if (formData.telefono && !/^[0-9]{6,15}$/.test(formData.telefono)) errors.telefono = 'El número debe tener solo dígitos y entre 6 y 15 caracteres.';
    if (formData.telefono && !formData.indicativo) errors.indicativo = 'Selecciona el indicativo.';
    if (formData.indicativo && !INDICATIVOS_CODES.includes(formData.indicativo)) errors.indicativo = 'Selecciona un indicativo válido.';
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    
    if (!session?.user?.email) {
      setErrorMsg('No hay email en la sesión. Por favor, inicia sesión nuevamente.');
      return;
    }
    
    try {
      console.log('PATCH formData:', formData);
      const res = await fetch('/api/usuario/perfil', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session.user.email,
          nombre: formData.nombre,
          indicativo: formData.indicativo,
          telefono: formData.telefono,
          nacionalidad: formData.nacionalidad,
          genero: formData.genero,
          fechaNacimiento: formData.fechaNacimiento,
          image: formData.image,
        }),
      });
      
      const data = await res.json();
      console.log('Respuesta de actualización:', data);
      
      if (data.ok) {
        setSuccessMsg('¡Perfil actualizado exitosamente!');
        setIsEditing(false);
        
        // Actualizar la sesión de NextAuth para reflejar los cambios
        await update({
          ...session,
          user: {
            ...session.user,
            nombre: formData.nombre
          }
        });
        
        // Recargar los datos del perfil para asegurar sincronización
        const resPerfil = await fetch('/api/usuario/perfil', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: session.user.email })
        });
        const dataPerfil = await resPerfil.json();
        
        if (dataPerfil.ok) {
          setFormData({
            nombre: dataPerfil.usuario.nombre || '',
            email: dataPerfil.usuario.email || '',
            indicativo: dataPerfil.usuario.indicativo || '',
            telefono: dataPerfil.usuario.telefono || '',
            fechaNacimiento: dataPerfil.usuario.fechaNacimiento || '',
            nacionalidad: dataPerfil.usuario.nacionalidad || '',
            genero: dataPerfil.usuario.genero || '',
            image: dataPerfil.usuario.image || '',
          });
        }
      } else {
        setErrorMsg(data.error || 'Error al actualizar el perfil.');
      }
    } catch (err) {
      console.error('Error al actualizar perfil:', err);
      setErrorMsg('Error de red o del servidor.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      // Si es el campo indicativo, limpiar cualquier texto adicional y dejar solo el código
      if (name === 'indicativo') {
        const code = value.match(/^\+\d+/)?.[0] || '';
        return { ...prev, [name]: code };
      }
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && session?.user?.email) {
      const formDataImg = new FormData();
      formDataImg.append('email', session.user.email);
      formDataImg.append('file', file);
      
      try {
        const res = await fetch('/api/usuario/perfil/upload-image', {
          method: 'POST',
          body: formDataImg,
        });
        const data = await res.json();
        
        if (data.ok) {
          setFormData(prev => ({ ...prev, image: data.imageUrl }));
          setSuccessMsg('Imagen de perfil actualizada.');
          
          // Refrescar la Navbar
          if (typeof window !== 'undefined' && (window as { refreshNavbarProfile?: () => void }).refreshNavbarProfile) {
            (window as { refreshNavbarProfile?: () => void }).refreshNavbarProfile?.();
          }
          
          // Recargar los datos del perfil para asegurar sincronización
          const resPerfil = await fetch('/api/usuario/perfil', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: session.user.email })
          });
          const dataPerfil = await resPerfil.json();
          
          if (dataPerfil.ok) {
            setFormData(prev => ({
              ...prev,
              image: dataPerfil.usuario.image || data.imageUrl
            }));
          }
        } else {
          setErrorMsg(data.error || 'Error al subir la imagen.');
        }
      } catch (error) {
        console.error('Error al subir imagen:', error);
        setErrorMsg('Error de conexión al subir la imagen.');
      }
    }
  };

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Log para depuración
  console.log('Render - formData.image:', formData.image);
  
  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col items-center px-2 py-8">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-blue-100 px-6 sm:px-10 py-10 flex flex-col gap-8 animate-fadein">
        {/* Avatar y nombre */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
            {formData.image ? (
              <div className="h-28 w-28 rounded-full shadow-lg border-4 border-white/80 overflow-hidden">
                <Image 
                  src={formData.image} 
                  alt="Avatar" 
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="h-28 w-28 bg-blue-600 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg border-4 border-white/80">
                {formData.nombre?.charAt(0) || session.user?.nombre?.charAt(0) || 'U'}
              </div>
            )}
            {isEditing && (
              <>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <CameraIcon className="h-8 w-8 text-white" />
                </div>
              </>
            )}
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mt-2 text-center">
            {formData.nombre || 'Usuario'}
          </h2>
          <p className="text-gray-500 text-center">{formData.email}</p>
          <p className="text-xs text-gray-400 mt-1">Miembro desde 2024</p>
        </div>

        {/* Mensaje de éxito o error */}
        {successMsg && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-2 text-center text-sm animate-fadein">{successMsg}</div>}
        {errorMsg && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-2 text-center text-sm animate-fadein">{errorMsg}</div>}

        {/* Barra de progreso de completitud de perfil */}
        <div className="w-full bg-gray-100 rounded-full h-4 mb-4">
          <div className="bg-blue-500 h-4 rounded-full transition-all duration-500" style={{ width: `${completitud}%` }}></div>
        </div>
        <p className="text-sm text-gray-500 mb-2">Tu perfil está {completitud}% completo.</p>
        {completitud < 100 && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg px-4 py-2 text-center text-sm animate-fadein mb-4">
            <span className="font-semibold">¡Completa tu perfil!</span> Faltan los siguientes campos: {camposFaltantes.join(', ')}
          </div>
        )}

        {/* Card de datos personales */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border ${fieldErrors.nombre ? 'border-red-400' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 text-base transition-all`}
                placeholder="Nombre completo"
                autoComplete="off"
              />
              {fieldErrors.nombre && <span className="text-xs text-red-500 mt-1">{fieldErrors.nombre}</span>}
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-base"
              />
            </div>
            {/* Indicativo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Indicativo</label>
              <select
                name="indicativo"
                value={formData.indicativo}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border ${fieldErrors.indicativo ? 'border-red-400' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 text-base transition-all`}
              >
                <option value="">Selecciona</option>
                {INDICATIVOS.map((item) => (
                  <option key={item.code} value={item.code}>{`${item.code} (${item.country})`}</option>
                ))}
              </select>
              {fieldErrors.indicativo && <span className="text-xs text-red-500 mt-1">{fieldErrors.indicativo}</span>}
            </div>
            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border ${fieldErrors.telefono ? 'border-red-400' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 text-base transition-all`}
                placeholder="Número sin indicativo"
                autoComplete="off"
              />
              {fieldErrors.telefono && <span className="text-xs text-red-500 mt-1">{fieldErrors.telefono}</span>}
            </div>
            {/* Fecha de nacimiento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Nacimiento</label>
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 text-base transition-all"
              />
            </div>
            {/* Nacionalidad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nacionalidad</label>
              <input
                type="text"
                name="nacionalidad"
                value={formData.nacionalidad}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 text-base transition-all"
                placeholder="Nacionalidad"
                autoComplete="off"
              />
            </div>
            {/* Género */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Género</label>
              <select
                name="genero"
                value={formData.genero}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 text-base transition-all"
              >
                <option value="">Selecciona</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>
          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end mt-4">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-colors text-base w-full sm:w-auto"
              >
                Editar Perfil
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => { setIsEditing(false); setErrorMsg(''); setSuccessMsg(''); setFieldErrors({}); }}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-base w-full sm:w-auto"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={false}
                  className={`px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-colors text-base w-full sm:w-auto ${Object.keys(fieldErrors).length > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Guardar Cambios
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
} 