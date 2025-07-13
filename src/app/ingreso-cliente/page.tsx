"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function IngresoCliente() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setLoading(false);
    if (res?.ok && !res?.error) {
      window.location.href = "/area-personal";
    } else {
      setError("Correo o contraseña incorrectos o error interno. Por favor, verifica tus datos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-5xl shadow-lg rounded-lg overflow-hidden">
        {/* Sección de imagen y mensaje */}
        <div className="hidden md:flex md:w-1/2 relative min-h-[500px] flex flex-col justify-center p-12" style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='40' height='40' fill='%231e3a8a'/><path d='M0 40L40 0M-10 30L30 -10M10 50L50 10' stroke='%234f8ef7' stroke-width='2' stroke-opacity='0.15'/></svg>')`,
          backgroundRepeat: 'repeat',
          backgroundColor: '#1e3a8a',
        }}>
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">Bienvenido a GlobalXpress</h2>
          <p className="text-lg text-gray-200 mb-6 drop-shadow-lg">
            Accede a tu área personal, gestiona tus procesos y aprovecha al máximo nuestros servicios globales.
          </p>
          <Link href="/registro" className="bg-transparent border border-white text-white px-6 py-2 rounded hover:bg-white hover:text-black transition font-semibold w-max drop-shadow-lg">
            EMPEZAR YA
          </Link>
        </div>
        {/* Panel de login */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Iniciar sesión</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="nombre@tucorreo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-gray-700 mb-1">Contraseña</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-3 top-[70%] -translate-y-1/2 text-blue-400 text-2xl focus:outline-none"
                tabIndex={-1}
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                style={{ background: 'none', border: 'none', padding: 0, margin: 0 }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {error && <div className="text-red-600 text-sm text-center">{error}</div>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Validando..." : "INICIAR SESIÓN"}
            </button>
          </form>
          <button
            onClick={() => signIn('google')}
            className="w-full mt-4 flex items-center justify-center gap-2 border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
            type="button"
            disabled={loading}
          >
            <svg width="20" height="20" viewBox="0 0 48 48" className="inline-block"><g><path fill="#4285F4" d="M43.611 20.083h-1.611v-.083H24v8h11.303c-1.623 4.377-5.789 7.5-11.303 7.5-6.627 0-12-5.373-12-12s5.373-12 12-12c2.993 0 5.728 1.07 7.868 2.824l6.071-6.071C34.058 5.527 29.284 3.5 24 3.5 12.954 3.5 4 12.454 4 23.5s8.954 20 20 20c11.046 0 20-8.954 20-20 0-1.341-.138-2.651-.389-3.917z"/><path fill="#34A853" d="M6.306 14.691l6.571 4.819C14.655 16.104 19.001 13.5 24 13.5c2.993 0 5.728 1.07 7.868 2.824l6.071-6.071C34.058 5.527 29.284 3.5 24 3.5c-7.732 0-14.313 4.41-17.694 10.691z"/><path fill="#FBBC05" d="M24 43.5c5.284 0 10.058-2.027 13.736-5.324l-6.357-5.217C29.728 35.43 27.007 36.5 24 36.5c-5.497 0-10.162-3.513-11.803-8.377l-6.523 5.032C9.627 39.09 16.208 43.5 24 43.5z"/><path fill="#EA4335" d="M43.611 20.083h-1.611v-.083H24v8h11.303c-.698 1.885-2.011 3.49-3.668 4.576l.001-.001 6.357 5.217C40.373 39.09 44 32.954 44 24c0-1.341-.138-2.651-.389-3.917z"/></g></svg>
            Iniciar sesión con Google
          </button>
          <div className="flex justify-between mt-4 text-sm">
            <Link href="/ingreso-cliente/restablecer" className="text-blue-600 hover:underline">¿Has olvidado tu contraseña?</Link>
            <Link href="/registro" className="text-blue-600 hover:underline">Crear cuenta</Link>
          </div>
        </div>
      </div>
    </div>
  );
} 