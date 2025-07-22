"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import Image from 'next/image';

export default function Registro() {
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    genero: "",
    fecha_nacimiento: "",
    nacionalidad: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.nombre || !form.email || !form.password || !form.confirmPassword || !form.telefono) {
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }
    if (!passwordRegex.test(form.password)) {
      setError("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setLoading(true);
    // Separar indicativo y número
    let indicativo = '';
    let telefonoSolo = '';
    if (form.telefono.startsWith('+')) {
      const match = form.telefono.match(/^(\+\d{1,4})(.*)$/);
      if (match) {
        indicativo = match[1];
        telefonoSolo = match[2].replace(/\D/g, '');
      } else {
        telefonoSolo = form.telefono.replace(/\D/g, '');
      }
    } else if (form.telefono.length > 6) {
      // Si viene sin +, asume los primeros dígitos como indicativo
      indicativo = '+' + form.telefono.slice(0, form.telefono.length - 10);
      telefonoSolo = form.telefono.slice(-10);
    } else {
      telefonoSolo = form.telefono;
    }
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: form.nombre,
        email: form.email,
        password: form.password,
        indicativo,
        telefono: telefonoSolo,
        genero: form.genero,
        fecha_nacimiento: form.fecha_nacimiento,
        nacionalidad: form.nacionalidad,
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (!data.ok) {
      setError(data.error || "Error al registrar usuario.");
    } else {
      setSuccess("¡Registro exitoso! Ahora puedes iniciar sesión.");
      setTimeout(() => router.push("/ingreso-cliente"), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-2xl rounded-3xl overflow-hidden border border-blue-100 bg-white/80 backdrop-blur-md">
        {/* Logo a la izquierda en desktop, arriba en mobile */}
        <div className="flex justify-center items-center bg-white md:bg-transparent p-6 md:p-12 md:w-1/3 border-b md:border-b-0 md:border-r border-blue-100">
          <Image src="/logo_negro.png" alt="Logo GlobalXpress" width={180} height={180} className="mx-auto" />
        </div>
        {/* Formulario extendido horizontalmente */}
        <div className="flex-1 flex flex-col justify-center p-8 md:p-14">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-8 text-center tracking-tight drop-shadow">Crear cuenta</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit} autoComplete="off">
            {/* Nombre */}
            <div className="relative col-span-1">
              <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required className="peer w-full px-4 pt-6 pb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-transparent" placeholder="Nombre completo" />
              <label className="absolute left-4 top-2 text-blue-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm pointer-events-none">Nombre completo</label>
            </div>
            {/* Email */}
            <div className="relative col-span-1">
              <input type="email" name="email" value={form.email} onChange={handleChange} required className="peer w-full px-4 pt-6 pb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-transparent" placeholder="Correo electrónico" />
              <label className="absolute left-4 top-2 text-blue-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm pointer-events-none">Correo electrónico</label>
            </div>
            {/* Teléfono - ocupa toda la fila */}
            <div className="relative col-span-1 md:col-span-2">
              <label className="block text-blue-400 text-sm mb-1 ml-1">Teléfono</label>
              <PhoneInput
                country={'us'}
                onlyCountries={['us','ca','mx','co','ar','cl','pe','br','ec','ve','bo','py','uy','gt','cu','do','hn','sv','ni','cr','pa','pr']}
                value={form.telefono}
                onChange={telefono => setForm({ ...form, telefono })}
                inputClass="!pl-16 !pr-4 !py-3 !w-full !border !rounded-lg !focus:outline-none !focus:ring-2 !focus:ring-blue-400 !bg-blue-50 !text-base !font-normal"
                buttonClass="!bg-blue-50 !border-none !focus:outline-none !left-3 !top-1/2 !-translate-y-1/2 !absolute"
                containerClass="!relative"
                dropdownClass="!rounded-lg !shadow-lg"
                placeholder="Selecciona país e ingresa tu número"
                masks={{ us: '(...) ...-....' }}
                enableSearch
                disableSearchIcon={false}
                autoFormat
              />
              <span className="block text-xs text-blue-400 mt-2 ml-1">Haz clic en la bandera para cambiar el país/indicativo.</span>
            </div>
            {/* Fecha de nacimiento */}
            <div className="relative col-span-1">
              <input type="date" name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleChange} className="peer w-full px-4 pt-6 pb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-transparent" />
              <label className="absolute left-4 top-2 text-blue-400 text-sm transition-all peer-focus:top-2 peer-focus:text-sm pointer-events-none">Fecha de nacimiento</label>
            </div>
            {/* Género */}
            <div className="relative col-span-1">
              <select name="genero" value={form.genero} onChange={handleChange} className="peer w-full px-4 pt-6 pb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-transparent">
                <option value="">Género</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
              <label className="absolute left-4 top-2 text-blue-400 text-sm transition-all peer-focus:top-2 peer-focus:text-sm pointer-events-none">Género</label>
            </div>
            {/* Nacionalidad */}
            <div className="relative col-span-1">
              <input type="text" name="nacionalidad" value={form.nacionalidad} onChange={handleChange} placeholder="Nacionalidad" className="peer w-full px-4 pt-6 pb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-transparent" />
              <label className="absolute left-4 top-2 text-blue-400 text-sm transition-all peer-focus:top-2 peer-focus:text-sm pointer-events-none">Nacionalidad</label>
            </div>
            {/* Contraseña */}
            <div className="relative col-span-1">
              <input type="password" name="password" value={form.password} onChange={handleChange} required placeholder="Contraseña" className="peer w-full px-4 pt-6 pb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-transparent" />
              <label className="absolute left-4 top-2 text-blue-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm pointer-events-none">Contraseña</label>
            </div>
            {/* Confirmar contraseña */}
            <div className="relative col-span-1">
              <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required placeholder="Confirmar contraseña" className="peer w-full px-4 pt-6 pb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-transparent" />
              <label className="absolute left-4 top-2 text-blue-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm pointer-events-none">Confirmar contraseña</label>
            </div>
            {/* Mensajes de error y éxito */}
            <div className="col-span-1 md:col-span-2">
              {error && <div className="text-red-600 text-sm text-center font-semibold bg-red-50 border border-red-200 rounded-lg py-2">{error}</div>}
              {success && <div className="text-green-600 text-sm text-center font-semibold bg-green-50 border border-green-200 rounded-lg py-2">{success}</div>}
            </div>
            {/* Botón de registro */}
            <div className="col-span-1 md:col-span-2">
              <button type="submit" className="w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-800 hover:to-blue-600 transition-all duration-200" disabled={loading}>
                {loading ? "Registrando..." : "REGISTRARME"}
              </button>
            </div>
          </form>
          <div className="mt-8 text-center text-sm text-blue-700">
            ¿Ya tienes cuenta?{' '}
            <a href="/ingreso-cliente" className="text-blue-600 hover:underline font-semibold">Inicia sesión</a>
          </div>
        </div>
      </div>
    </div>
  );
} 