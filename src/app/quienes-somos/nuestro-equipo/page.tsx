'use client';
import Image from 'next/image';
import { useState } from 'react';
import { 
  UserGroupIcon, 
  AcademicCapIcon, 
  GlobeAltIcon, 
  HeartIcon,
  StarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function NuestroEquipo() {
  const [activeTab, setActiveTab] = useState('directivos');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const equipo = {
    directivos: [
      {
        nombre: "Carlos Mendoza",
        cargo: "Director General",
        experiencia: "15+ años en inmigración",
        especialidad: "Visas EB-5 y E-2",
        imagen: "/carlosmendoza.png",
        descripcion: "Líder visionario con amplia experiencia en programas de inversión y desarrollo empresarial internacional."
      },
      {
        nombre: "María González",
        cargo: "Directora de Operaciones",
        experiencia: "12+ años en consultoría",
        especialidad: "Gestión de procesos",
        imagen: "/mariagonzales.png",
        descripcion: "Especialista en optimización de procesos y atención al cliente con enfoque en resultados."
      },
      {
        nombre: "Roberto Jiménez",
        cargo: "Director Legal",
        experiencia: "18+ años en derecho migratorio",
        especialidad: "Derecho internacional",
        imagen: "/robertojimenez.png",
        descripcion: "Abogado especializado en derecho migratorio con amplia experiencia en casos complejos."
      }
    ],
    consultores: [
      {
        nombre: "Ana Castillo",
        cargo: "Consultora Senior",
        experiencia: "10+ años en visas",
        especialidad: "EB-2 NIW y EB-3",
        imagen: "/logotransparente.png",
        descripcion: "Experta en visas de trabajo y programas de excelencia profesional."
      },
      {
        nombre: "Luis Herrera",
        cargo: "Consultor de Inversiones",
        experiencia: "8+ años en finanzas",
        especialidad: "Análisis de proyectos",
        imagen: "/logotransparente.png",
        descripcion: "Especialista en evaluación de proyectos de inversión y desarrollo económico."
      },
      {
        nombre: "Valentina Vega",
        cargo: "Consultora Académica",
        experiencia: "6+ años en educación",
        especialidad: "Global Academic",
        imagen: "/logotransparente.png",
        descripcion: "Experta en programas educativos y asesoría para estudiantes internacionales."
      }
    ],
    especialistas: [
      {
        nombre: "Diego Morales",
        cargo: "Especialista en Aviación",
        experiencia: "12+ años en aviación",
        especialidad: "Sky Masters",
        imagen: "/logotransparente.png",
        descripcion: "Piloto comercial con amplia experiencia en programas de formación aeronáutica."
      },
      {
        nombre: "Isabella Silva",
        cargo: "Especialista en Salud",
        experiencia: "9+ años en sector salud",
        especialidad: "Credenciales médicas",
        imagen: "/logotransparente.png",
        descripcion: "Experta en homologación de credenciales médicas y visas para profesionales de la salud."
      },
      {
        nombre: "Andrés Torres",
        cargo: "Especialista en Tecnología",
        experiencia: "7+ años en IT",
        especialidad: "Visas H-1B y EB-1",
        imagen: "/logotransparente.png",
        descripcion: "Especialista en visas para profesionales de tecnología y emprendedores."
      }
    ]
  };

  const valores = [
    {
      icono: HeartIcon,
      titulo: "Compromiso",
      descripcion: "Nos comprometemos con el éxito de cada cliente"
    },
    {
      icono: StarIcon,
      titulo: "Excelencia",
      descripcion: "Buscamos la excelencia en cada proceso y servicio"
    },
    {
      icono: CheckCircleIcon,
      titulo: "Transparencia",
      descripcion: "Procesos claros y comunicación honesta"
    },
    {
      icono: GlobeAltIcon,
      titulo: "Experiencia Global",
      descripcion: "Conocimiento profundo de mercados internacionales"
    }
  ];

  // Componente individual para cada tarjeta de miembro
  function TarjetaMiembro({ miembro }: { miembro: any }) {
    const [hover, setHover] = useState(false);
    return (
      <div
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="h-64 bg-gradient-to-br from-[#0D4A7A] to-[#1161A9] flex items-center justify-center">
          <Image
            src={miembro.imagen}
            alt={miembro.nombre}
            width={160}
            height={160}
            className="rounded-xl border-4 border-white object-cover"
            style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)' }}
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-[#0D4A7A] mb-1">{miembro.nombre}</h3>
          <p className="text-[#00E6F6] font-semibold mb-2">{miembro.cargo}</p>
          {hover && (
            <div className="animate-fade-in mt-2">
              <div className="space-y-2 mb-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Experiencia:</span> {miembro.experiencia}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Especialidad:</span> {miembro.especialidad}
                </p>
              </div>
              <p className="text-gray-700 text-sm">{miembro.descripcion}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-[#0D4A7A] to-[#1161A9] overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Nuestro <span className="text-[#00E6F6]">Equipo</span>
            </h1>
            <p className="text-lg md:text-xl max-w-4xl mx-auto text-center text-white leading-relaxed mt-4">
              Nuestro equipo está conformado por profesionales de amplia trayectoria internacional, especializados en migración, inversión, educación y asesoría legal. Nos dedicamos a acompañar a cada cliente en su proceso, brindando soluciones integrales y personalizadas para alcanzar sus metas en Estados Unidos con confianza y seguridad.
            </p>
          </div>
        </div>
        {/* Clip path overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-white" style={{
          clipPath: 'polygon(0 100%, 100% 100%, 100% 0)'
        }}></div>
      </section>

      {/* Equipo */}
      <section className="py-16 px-4 md:px-24 -mt-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0D4A7A] mb-12">
            Conoce a Nuestro <span className="text-[#00E6F6]">Equipo</span>
          </h2>
          
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {[
                { id: 'directivos', label: 'Directivos', icon: UserGroupIcon },
                { id: 'consultores', label: 'Consultores', icon: AcademicCapIcon },
                { id: 'especialistas', label: 'Especialistas', icon: GlobeAltIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#0D4A7A] text-white shadow-lg'
                      : 'text-gray-600 hover:text-[#0D4A7A] hover:bg-gray-200'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Miembros del equipo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {equipo[activeTab as keyof typeof equipo].map((miembro, index) => (
              <TarjetaMiembro key={index} miembro={miembro} />
            ))}
          </div>
        </div>
      </section>

      {/* Valores del Equipo (ahora al final) */}
      <section className="py-16 px-4 md:px-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0D4A7A] mb-12">
            Nuestros <span className="text-[#00E6F6]">Valores</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valores.map((valor, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-[#00E6F6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <valor.icono className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0D4A7A] mb-2">{valor.titulo}</h3>
                <p className="text-gray-600">{valor.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-24 bg-[#0D4A7A]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para Trabajar con Nuestro <span className="text-[#00E6F6]">Equipo?</span>
          </h2>
          <p className="text-xl mb-8">
            Nuestros expertos están listos para guiarte en tu camino hacia el éxito en Estados Unidos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#00E6F6] text-[#0D4A7A] px-8 py-3 rounded-full font-bold hover:bg-[#00E6F6]/90 transition-colors">
              Solicitar Consulta
            </button>
            <button className="border-2 border-[#00E6F6] text-[#00E6F6] px-8 py-3 rounded-full font-bold hover:bg-[#00E6F6] hover:text-[#0D4A7A] transition-colors">
              Ver Programas
            </button>
          </div>
        </div>
      </section>
    </div>
  );
} 