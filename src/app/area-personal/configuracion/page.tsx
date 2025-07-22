"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function Configuracion() {
  const router = useRouter();
  const { data: session } = useSession();
  const [showDelete, setShowDelete] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");
  const [confirmNueva, setConfirmNueva] = useState("");
  const [loading, setLoading] = useState(false);

  // Visibilidad de contraseñas
  const [showActual, setShowActual] = useState(false);
  const [showNueva, setShowNueva] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Validación de contraseña segura
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  // Estado de validación de contraseña actual
  const [actualValida, setActualValida] = useState<null | boolean>(null);

  // Nuevo estado para saber si el usuario tiene contraseña local
  const [tienePassword, setTienePassword] = useState<boolean | null>(null);

  // Al cargar, consultar si el usuario tiene contraseña local
  useEffect(() => {
    const fetchTienePassword = async () => {
      if (!session?.user?.email) return;
      try {
        const res = await fetch("/api/usuario/perfil/tiene-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: session.user.email })
        });
        const data = await res.json();
        setTienePassword(!!data.tienePassword);
      } catch {
        setTienePassword(null);
      }
    };
    fetchTienePassword();
  }, [session?.user?.email]);

  // Validar contraseña actual contra el backend
  const validarActual = async () => {
    if (!actual || !session?.user?.email) {
      setActualValida(null);
      return;
    }
    try {
      const res = await fetch("/api/usuario/perfil/cambiar-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email, actual, nueva: "dummy123A" }) // nueva dummy válida
      });
      const data = await res.json();
      // Si la contraseña actual es incorrecta, el backend responde con error 401
      if (data.error && data.error.includes("actual")) {
        setActualValida(false);
      } else {
        setActualValida(true);
      }
    } catch {
      setActualValida(null);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    // No permitir submit si la contraseña actual ya se sabe que es incorrecta
    if (actualValida === false) {
      setErrorMsg(""); // No mostrar error general arriba
      return;
    }
    if (!actual || !nueva || !confirmNueva) {
      setErrorMsg("Completa todos los campos.");
      return;
    }
    if (nueva !== confirmNueva) {
      setErrorMsg("Las contraseñas nuevas no coinciden.");
      return;
    }
    if (!passwordRegex.test(nueva)) {
      setErrorMsg("La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/usuario/perfil/cambiar-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session?.user?.email,
          actual,
          nueva
        })
      });
      const data = await res.json();
      setLoading(false);
      if (data.ok) {
        setSuccessMsg("Contraseña actualizada exitosamente.");
        setActual(""); setNueva(""); setConfirmNueva("");
        setActualValida(null);
      } else {
        // Si el error es de contraseña actual, mostrar debajo del campo y resaltar
        if (data.error && data.error.includes("actual")) {
          setActualValida(false);
        }
        setErrorMsg(data.error || "Error al cambiar la contraseña.");
      }
    } catch {
      setLoading(false);
      setErrorMsg("Error de conexión. Intenta nuevamente.");
    }
  };

  // Simulación de eliminar cuenta
  const handleDeleteAccount = () => {
    setShowDelete(false);
    setSuccessMsg("Cuenta eliminada (simulado). Se cerrará la sesión.");
    setTimeout(() => router.push("/"), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col items-center px-2 py-8">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-blue-100 px-6 sm:px-10 py-10 flex flex-col gap-8 animate-fadein">
        <h1 className="text-3xl font-extrabold text-blue-900 text-center mb-2">Configuración de la cuenta</h1>
        <p className="text-center text-gray-500 mb-6">Personaliza tu experiencia y gestiona la seguridad de tu cuenta.</p>

        {/* Mensajes de éxito o error */}
        {successMsg && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-2 text-center text-sm animate-fadein">{successMsg}</div>}
        {errorMsg && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-2 text-center text-sm animate-fadein">{errorMsg}</div>}

        {/* Seguridad */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-blue-800 mb-2">Seguridad</h2>
          {tienePassword === null ? (
            <div className="text-gray-500 text-center py-6">Cargando información de seguridad...</div>
          ) : tienePassword ? (
            <form onSubmit={handlePasswordChange} className="flex flex-col gap-5 w-full max-w-lg mx-auto">
              {/* Contraseña actual */}
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
                <input
                  type={showActual ? "text" : "password"}
                  placeholder="Contraseña actual"
                  className={`w-full pl-12 pr-20 py-3 border ${actualValida === false ? 'border-red-400' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-blue-50 placeholder-gray-400 transition-all shadow-sm`}
                  required
                  value={actual}
                  onChange={e => { setActual(e.target.value); setActualValida(null); }}
                  onBlur={validarActual}
                  disabled={loading}
                  autoComplete="current-password"
                />
                {/* Icono de validación, solo si ya se validó y hay valor */}
                {actual && actualValida !== null && (
                  <span className="absolute right-12 top-1/2 -translate-y-1/2">
                    {actualValida ? (
                      <FaCheckCircle className="text-green-500 text-lg" />
                    ) : (
                      <FaTimesCircle className="text-red-500 text-lg" />
                    )}
                  </span>
                )}
                {/* Icono de ojo siempre visible, bien alineado */}
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg focus:outline-none" tabIndex={-1} onClick={() => setShowActual(v => !v)}>
                  {showActual ? <FaEyeSlash /> : <FaEye />}
                </button>
                {/* Mensaje de error específico debajo del campo */}
                {actualValida === false && (
                  <div className="text-red-600 text-xs mt-1 ml-1 font-semibold">La contraseña actual es incorrecta.</div>
                )}
              </div>
              {/* Nueva contraseña */}
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
                <input
                  type={showNueva ? "text" : "password"}
                  placeholder="Nueva contraseña"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-blue-50 placeholder-gray-400 transition-all shadow-sm"
                  required
                  value={nueva}
                  onChange={e => setNueva(e.target.value)}
                  disabled={loading}
                  autoComplete="new-password"
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg focus:outline-none" tabIndex={-1} onClick={() => setShowNueva(v => !v)}>
                  {showNueva ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {/* Confirmar nueva contraseña */}
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirmar nueva contraseña"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-blue-50 placeholder-gray-400 transition-all shadow-sm"
                  required
                  value={confirmNueva}
                  onChange={e => setConfirmNueva(e.target.value)}
                  disabled={loading}
                  autoComplete="new-password"
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg focus:outline-none" tabIndex={-1} onClick={() => setShowConfirm(v => !v)}>
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-all duration-200 mt-2"
                disabled={loading}
              >
                {loading ? "Cambiando..." : "Cambiar contraseña"}
              </button>
            </form>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-6 py-6 text-center text-blue-800 font-semibold text-base shadow-sm">
              Tu cuenta está protegida por Google. <br />
              Inicias sesión de forma segura con tu cuenta de Google y no necesitas una contraseña local aquí.<br />
              Si deseas agregar una contraseña local para acceder también con email y contraseña, contáctanos.
            </div>
          )}
        </section>

        {/* Notificaciones */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-blue-800 mb-2">Notificaciones</h2>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="accent-blue-600 w-5 h-5" defaultChecked />
              <span className="text-gray-700">Recibir emails de novedades</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="accent-blue-600 w-5 h-5" defaultChecked />
              <span className="text-gray-700">Recibir emails de actividad de mi cuenta</span>
            </label>
          </div>
        </section>

        {/* Privacidad */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-blue-800 mb-2">Privacidad</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="accent-blue-600 w-5 h-5" />
            <span className="text-gray-700">Permitir que otros usuarios vean mi perfil</span>
          </label>
        </section>

        {/* Acciones de cuenta */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-blue-800 mb-2">Cuenta</h2>
          <button
            onClick={() => setShowDelete(true)}
            className="px-6 py-2 bg-red-100 text-red-700 rounded-lg font-semibold shadow hover:bg-red-200 transition-colors text-base border border-red-200 w-full sm:w-auto"
          >
            Eliminar cuenta
          </button>
          {showDelete && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center gap-6 border-2 border-red-100 animate-fadein">
                <h3 className="text-xl font-bold text-red-700">¿Estás seguro?</h3>
                <p className="text-gray-600 text-center">Esta acción eliminará tu cuenta de forma permanente. ¿Deseas continuar?</p>
                <div className="flex gap-4 w-full">
                  <button onClick={handleDeleteAccount} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">Sí, eliminar</button>
                  <button onClick={() => setShowDelete(false)} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">Cancelar</button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
} 