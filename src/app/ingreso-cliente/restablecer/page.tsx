"use client";
import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function RestablecerInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Si hay token, mostrar el formulario de nueva contraseñaa
  if (token) {
    return <NuevaPasswordForm token={token} />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setLoading(false);
      setEnviado(true);
    } catch {
      setLoading(false);
      setError("Ocurrió un error. Intenta nuevamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 border border-blue-100">
        <h2 className="text-2xl font-extrabold text-blue-900 mb-8 text-center tracking-tight drop-shadow">¿Restablecer tu contraseña?</h2>
        {enviado ? (
          <div className="text-center text-blue-700 font-semibold">
            Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.<br />
            Revisa tu bandeja de entrada y correo no deseado.
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
            <div className="relative">
              <input
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="peer w-full px-4 pt-6 pb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-transparent"
                placeholder="Correo electrónico"
              />
              <label className="absolute left-4 top-2 text-blue-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm pointer-events-none">
                Correo electrónico
              </label>
            </div>
            {error && <div className="text-red-600 text-sm text-center font-semibold bg-red-50 border border-red-200 rounded-lg py-2">{error}</div>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-800 hover:to-blue-600 transition-all duration-200"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar enlace de recuperación"}
            </button>
          </form>
        )}
        <div className="mt-8 text-center text-sm text-blue-700">
          <a href="/ingreso-cliente" className="text-blue-600 hover:underline font-semibold">Volver a iniciar sesión</a>
        </div>
      </div>
    </div>
  );
}

export default function Restablecer() {
  return (
    <Suspense fallback={<div className="text-center py-10">Cargando...</div>}>
      <RestablecerInner />
    </Suspense>
  );
}

function NuevaPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!passwordRegex.test(password)) {
      setError("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        setError("No se pudo restablecer la contraseña. El enlace puede haber expirado.");
      }
    } catch {
      setError("Ocurrió un error. Intenta nuevamente.");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="text-center text-green-700 font-semibold">
        ¡Contraseña restablecida correctamente!<br />
        <a href="/ingreso-cliente" className="text-blue-600 hover:underline font-semibold">Iniciar sesión</a>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="peer w-full px-4 pt-6 pb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-transparent"
          placeholder="Nueva contraseña"
        />
        <label className="absolute left-4 top-2 text-blue-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm pointer-events-none">
          Nueva contraseña
        </label>
        <button
          type="button"
          className="absolute right-4 top-4 text-blue-400"
          onClick={() => setShowPassword(v => !v)}
          tabIndex={-1}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <div className="relative">
        <input
          type={showConfirm ? "text" : "password"}
          name="confirmPassword"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
          className="peer w-full px-4 pt-6 pb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-transparent"
          placeholder="Confirmar contraseña"
        />
        <label className="absolute left-4 top-2 text-blue-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm pointer-events-none">
          Confirmar contraseña
        </label>
        <button
          type="button"
          className="absolute right-4 top-4 text-blue-400"
          onClick={() => setShowConfirm(v => !v)}
          tabIndex={-1}
        >
          {showConfirm ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {error && <div className="text-red-600 text-sm text-center font-semibold bg-red-50 border border-red-200 rounded-lg py-2">{error}</div>}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-800 hover:to-blue-600 transition-all duration-200"
        disabled={loading}
      >
        {loading ? "Restableciendo..." : "Restablecer contraseña"}
      </button>
    </form>
  );
} 