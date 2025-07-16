import React from 'react';
import { ClockIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function PagosProximamente() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 animate-fadein">
      <div className="bg-white/80 border-2 border-blue-100 rounded-3xl shadow-2xl px-10 py-16 flex flex-col items-center gap-6 animate-fadein" style={{backdropFilter: 'blur(8px)'}}>
        <div className="flex flex-col items-center gap-2 animate-bounce-slow">
          <SparklesIcon className="h-16 w-16 text-blue-500 drop-shadow-lg animate-pulse" />
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm">¡Próximamente!</h1>
        </div>
        <p className="text-lg text-gray-600 font-medium text-center max-w-xl animate-fadein">
          Estamos trabajando en el módulo de pagos para ofrecerte una experiencia aún más profesional, segura y conveniente. Muy pronto podrás gestionar tus pagos directamente desde tu área personal.
        </p>
        <div className="flex items-center gap-2 mt-4 animate-fadein">
          <ClockIcon className="h-6 w-6 text-blue-400 animate-spin-slow" />
          <span className="text-base text-blue-700 font-semibold">En desarrollo</span>
        </div>
        <div className="mt-6 text-sm text-gray-400 text-center animate-fadein">
          Tu tranquilidad es nuestra prioridad. <br />Esta sección estará disponible muy pronto.<br />¡Gracias por tu confianza!
        </div>
      </div>
    </div>
  );
}

// Animaciones personalizadas
// Agrega en tu CSS global:
// .animate-bounce-slow { animation: bounce 2.5s infinite; }
// .animate-spin-slow { animation: spin 2.5s linear infinite; }
// .animate-fadein { animation: fadeIn 1.2s ease; } 