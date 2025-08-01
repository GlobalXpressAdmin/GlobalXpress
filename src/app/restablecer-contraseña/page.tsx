"use client";
import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function RestablecerContrasenaInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!password || !confirm) {
      setError("Por favor, completa ambos campos.");
      return;
    }
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== confirm) {
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
      const data = await res.json();
      setLoading(false);
      if (data.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Error al restablecer la contraseña.");
      }
    } catch {
      setLoading(false);
      setError("Ocurrió un error. Intenta nuevamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 border border-blue-100">
        <h2 className="text-2xl font-extrabold text-blue-900 mb-8 text-center tracking-tight drop-shadow">Restablecer contraseña</h2>
        {success ? (
          <div className="text-center text-green-700 font-semibold">
            ¡Tu contraseña ha sido restablecida exitosamente!<br />
            <a href="/ingreso-cliente" className="text-blue-600 hover:underline font-semibold">Iniciar sesión</a>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="peer w-full px-4 pt-6 pb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-transparent pr-12"
                placeholder="Nueva contraseña"
              />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg focus:outline-none" tabIndex={-1} onClick={() => setShowPassword(v => !v)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <label className="absolute left-4 top-2 text-blue-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm pointer-events-none">
                Nueva contraseña
              </label>
            </div>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirm"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                className="peer w-full px-4 pt-6 pb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-transparent pr-12"
                placeholder="Confirmar contraseña"
              />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg focus:outline-none" tabIndex={-1} onClick={() => setShowConfirm(v => !v)}>
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
              <label className="absolute left-4 top-2 text-blue-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm pointer-events-none">
                Confirmar contraseña
              </label>
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
        )}
      </div>
    </div>
  );
}

export default function RestablecerContrasena() {
  return (
    <Suspense fallback={<div className="text-center py-10">Cargando...</div>}>
      <RestablecerContrasenaInner />
    </Suspense>
  );
} 