'use client';
import { useSearchParams } from "next/navigation";
import vacantes from "../../components/vacantesData";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Postulacion() {
  const searchParams = useSearchParams();
  const idx = parseInt(searchParams.get("idx") || "", 10);
  const vacante = !isNaN(idx) && vacantes[idx] ? vacantes[idx] : null;

  return (
    <section className="w-full min-h-screen bg-white mb-16">
      <div
        className="w-full h-[400px] md:h-[400px] flex items-center justify-start relative bg-cover bg-center"
        style={{
          backgroundImage: "url('/fondobannerpostulacion.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-start justify-center w-full h-full pl-2 md:pl-10 pt-20 md:pt-32">
          <h1 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow-lg uppercase leading-tight text-left">
            FORMULARIO DE<br />SOLICITUD – RESIDENCIA
          </h1>
          <h2 className="text-xl md:text-2xl font-extrabold text-cyan-400 drop-shadow-lg uppercase mt-2 text-left">
            BASADA EN EL EMPLEO EB-3
          </h2>
        </div>
      </div>
      {/* Tabla de vacante seleccionada */}
      {vacante && (
        <div className="max-w-7xl mx-auto mt-10 w-full px-2 md:px-0">
          <div className="grid grid-cols-2 md:grid-cols-4 bg-white rounded overflow-hidden shadow">
            <div className="bg-[#054B74] text-white flex items-center gap-2 px-6 py-4 font-bold text-lg">
              Empresa
            </div>
            <div className="bg-gray-100 flex items-center px-6 py-4 text-lg">{vacante.empresa}</div>
            <div className="bg-[#054B74] text-white flex items-center gap-2 px-6 py-4 font-bold text-lg">
              Salario
            </div>
            <div className="bg-gray-100 flex items-center px-6 py-4 text-lg">{vacante.salario}</div>
            <div className="bg-[#054B74] text-white flex items-center gap-2 px-6 py-4 font-bold text-lg border-t border-white">
              Puesto
            </div>
            <div className="bg-gray-100 flex items-center px-6 py-4 text-lg border-t border-white">{vacante.cargo}</div>
            <div className="bg-[#054B74] text-white flex items-center gap-2 px-6 py-4 font-bold text-lg border-t border-white">
              Descripción
            </div>
            <div className="bg-gray-100 flex items-center px-6 py-4 text-lg border-t border-white">{vacante.descripcion || 'No especificado'}</div>
            <div className="bg-[#054B74] text-white flex items-center gap-2 px-6 py-4 font-bold text-lg border-t border-white">
              Email
            </div>
            <div className="bg-gray-100 flex items-center px-6 py-4 text-lg border-t border-white">{vacante.email || 'No especificado'}</div>
            <div className="bg-[#054B74] text-white flex items-center gap-2 px-6 py-4 font-bold text-lg border-t border-white">
              Número de plazas
            </div>
            <div className="bg-gray-100 flex items-center px-6 py-4 text-lg border-t border-white">{vacante.workers || 'No especificado'}</div>
          </div>
          {/* Formulario multipaso debajo de la descripción */}
          <MultiStepForm vacante={vacante} />
        </div>
      )}
      {/* Aquí irá el contenido de la página de postulación */}
    </section>
  );
}

// Implementación multipaso profesional de MultiStepForm según las imágenes y requerimientos del usuario.
function MultiStepForm({ vacante }: { vacante: {
  empresa: string;
  cargo: string;
  salario: string;
  descripcion: string;
  email: string;
  workers: string;
  link: string;
} }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    pais: '',
    ciudad: '',
    visa: '',
    direccion: '',
    conoceEEUU: false,
    trabajoSinAutorizacion: false,
    antecedentesMigratorios: false,
    arrestado: false,
    saldoMinimo: false,
    quiereFinanciamiento: false,
    docIdentidad: null,
    docCV: null,
    confirmaRecursos: false,
    aceptaTerminos: false,
    aceptaComunicaciones: false,
    aceptaDatos: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value, type } = target;
    if (type === 'checkbox' && target instanceof HTMLInputElement) {
      setForm(prev => ({ ...prev, [name]: target.checked }));
    } else if (type === 'file' && target instanceof HTMLInputElement) {
      setForm(prev => ({ ...prev, [name]: target.files && target.files[0] ? target.files[0] : null }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const progressByStep = [0, 20, 40, 60, 80, 100];

  const nextStep = async () => {
    let hayError = false;
    // Validación paso 1
    if (step === 1) {
      if (!form.nombre) {
        hayError = true;
      }
      if (!form.correo) {
        hayError = true;
      }
      if (!form.telefono) {
        hayError = true;
      }
      if (hayError) {
        return;
      }
    }
    // Validación de aceptación de datos en el último paso
    if (step === 5) {
      if (!form.confirmaRecursos) {
        return;
      }
      if (!form.aceptaTerminos) {
        return;
      }
      if (!form.aceptaComunicaciones) {
        return;
      }
      if (!form.aceptaDatos) {
        return;
      }
      // Aquí se envían los datos finales
      const datosEnviar = {
        ...form,
        conoceEEUU: form.conoceEEUU ? 'SI' : 'NO',
        trabajoSinAutorizacion: form.trabajoSinAutorizacion ? 'SI' : 'NO',
        antecedentesMigratorios: form.antecedentesMigratorios ? 'SI' : 'NO',
        arrestado: form.arrestado ? 'SI' : 'NO',
        saldoMinimo: form.saldoMinimo ? 'SI' : 'NO',
        quiereFinanciamiento: form.quiereFinanciamiento ? 'SI' : 'NO',
        confirmaRecursos: form.confirmaRecursos ? 'SI' : 'NO',
        aceptaTerminos: form.aceptaTerminos ? 'SI' : 'NO',
        aceptaComunicaciones: form.aceptaComunicaciones ? 'SI' : 'NO',
        aceptaDatos: form.aceptaDatos ? 'SI' : 'NO',
        // Datos de la vacante:
        empresa: vacante.empresa,
        cargo: vacante.cargo,
        salario: vacante.salario,
        descripcion: vacante.descripcion,
        emailVacante: vacante.email,
        workers: vacante.workers,
        link: vacante.link,
      };
      
      // Enviar datos al backend
      try {
        const response = await fetch('/api/postulaciones', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datosEnviar),
        });
        
        const result = await response.json();
        
        if (result.ok) {
          // Éxito - avanzar al paso final
          setStep(s => Math.min(s + 1, 6));
        } else {
          // setErrorGeneral(result.error || 'Error al enviar la postulación.'); // Original line commented out
        }
      } catch {
        // Error de conexión al enviar la postulación.
      }
      return;
    }
    setStep(s => Math.min(s + 1, 6));
  };
  const prevStep = () => {
    setStep(s => Math.max(s - 1, 1));
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-10 mt-10 max-w-2xl mx-auto border border-blue-100 flex flex-col items-center w-full">
      {step === 1 && (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2 text-left w-full">Paso 1: Datos Personales</h2>
          <p className="text-gray-600 mb-6 text-left w-full">Ingrese sus datos personales tal como aparecen en su pasaporte. Esta información será utilizada para validar su postulación.</p>
          <div className="w-full flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input name="nombre" value={form.nombre} onChange={handleChange} className="peer w-full px-4 pt-6 pb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-transparent text-base" placeholder="Nombre" />
                <label className="absolute left-4 top-2 text-blue-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm pointer-events-none">Nombre</label>
              </div>
              <div className="relative">
                <input name="apellidos" value={form.apellidos} onChange={handleChange} className="peer w-full px-4 pt-6 pb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-transparent text-base" placeholder="Apellidos" />
                <label className="absolute left-4 top-2 text-blue-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm pointer-events-none">Apellidos</label>
              </div>
            </div>
            <div className="relative">
              <input name="correo" value={form.correo} onChange={handleChange} className="peer w-full px-4 pt-6 pb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-transparent text-base" placeholder="Correo electrónico" />
              <label className="absolute left-4 top-2 text-blue-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm pointer-events-none">Correo electrónico</label>
            </div>
            <div className="relative">
              <label className="block text-blue-500 text-sm mb-1 ml-1 font-semibold">Número de teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-base"
                placeholder="Número de teléfono"
              />
            </div>
            <div className="relative">
              <input name="pais" value={form.pais} onChange={handleChange} className="peer w-full px-4 pt-6 pb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-transparent text-base" placeholder="País" />
              <label className="absolute left-4 top-2 text-blue-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm pointer-events-none">País</label>
            </div>
            <div className="relative">
              <input name="ciudad" value={form.ciudad} onChange={handleChange} className="peer w-full px-4 pt-6 pb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-transparent text-base" placeholder="¿Cuál ciudad?" />
              <label className="absolute left-4 top-2 text-blue-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm pointer-events-none">¿Cuál ciudad?</label>
            </div>
            <div className="relative">
              <select name="visa" value={form.visa} onChange={handleChange} className="border rounded-lg px-4 py-3 bg-blue-50 text-base focus:ring-2 focus:ring-blue-400 w-full">
                <option value="">¿Dispone de visa?</option>
                <option value="SI">Sí</option>
                <option value="NO">No</option>
              </select>
            </div>
            <div className="relative">
              <input name="direccion" value={form.direccion} onChange={handleChange} className="peer w-full px-4 pt-6 pb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-transparent text-base" placeholder="Dirección completa" />
              <label className="absolute left-4 top-2 text-blue-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm pointer-events-none">Dirección completa</label>
            </div>
            <div className="flex items-center justify-between w-full mt-4">
              <span className="text-base font-semibold text-blue-900">{progressByStep[step - 1]}%</span>
              <button type="button" className="bg-blue-800 text-white px-8 py-2 rounded-lg font-bold text-lg shadow hover:bg-blue-900 transition-all" onClick={nextStep}>Siguiente</button>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
              <div className="h-2 bg-blue-800 rounded-full" style={{ width: `${progressByStep[step - 1]}%` }}></div>
            </div>
          </div>
        </>
      )}
      {step > 1 && step < 6 && step !== 5 && (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2 text-left w-full">Paso {step}: {step === 2 ? 'Historial Migratorio' : step === 3 ? 'Capacidad Financiera' : 'Subida de Documentos'}</h2>
          <p className="text-gray-600 mb-6 text-left w-full">Responda las siguientes preguntas con honestidad. Esta información es clave para evaluar su elegibilidad en el programa EB-3.</p>
          <div className="flex flex-col gap-4 w-full">
            {step === 2 && (
              <>
                <label className="flex items-center gap-3 text-lg text-gray-800">
                  <input type="checkbox" name="conoceEEUU" checked={form.conoceEEUU} onChange={handleChange} className="accent-blue-700 w-5 h-5" />
                  ¿Conoce los Estados Unidos?
                </label>
                <label className="flex items-center gap-3 text-lg text-gray-800">
                  <input type="checkbox" name="trabajoSinAutorizacion" checked={form.trabajoSinAutorizacion} onChange={handleChange} className="accent-blue-700 w-5 h-5" />
                  ¿Ha trabajado en EE. UU. sin autorización?
                </label>
                <label className="flex items-center gap-3 text-lg text-gray-800">
                  <input type="checkbox" name="antecedentesMigratorios" checked={form.antecedentesMigratorios} onChange={handleChange} className="accent-blue-700 w-5 h-5" />
                  ¿Tiene antecedentes migratorios?
                </label>
                <label className="flex items-center gap-3 text-lg text-gray-800">
                  <input type="checkbox" name="arrestado" checked={form.arrestado} onChange={handleChange} className="accent-blue-700 w-5 h-5" />
                  ¿Ha sido arrestado o acusado de un delito?
                </label>
              </>
            )}
            {step === 3 && (
              <>
                <label className="flex items-center gap-3 text-lg text-gray-800">
                  <input type="checkbox" name="saldoMinimo" checked={form.saldoMinimo} onChange={handleChange} className="accent-blue-700 w-5 h-5" />
                  ¿Cuenta con el saldo mínimo para todo el proceso EB-3?
                </label>
                <label className="flex items-center gap-3 text-lg text-gray-800">
                  <input type="checkbox" name="quiereFinanciamiento" checked={form.quiereFinanciamiento} onChange={handleChange} className="accent-blue-700 w-5 h-5" />
                  ¿Quisiera conocer nuestros métodos de financiamiento?
                </label>
              </>
            )}
            {step === 4 && (
              <>
                <label className="text-lg text-gray-800 font-semibold">Documento Nacional de Identidad (Pasaporte o DNI, documento PDF)</label>
                <input type="file" name="docIdentidad" accept="application/pdf" onChange={handleChange} className="block w-full text-base text-gray-700 border border-blue-200 rounded-lg cursor-pointer bg-blue-50 focus:outline-none" />
                <label className="text-lg text-gray-800 font-semibold">Historial de trabajo & Estudios (Currículum o CV, documento PDF)</label>
                <input type="file" name="docCV" accept="application/pdf" onChange={handleChange} className="block w-full text-base text-gray-700 border border-blue-200 rounded-lg cursor-pointer bg-blue-50 focus:outline-none" />
                <span className="text-xs text-gray-500 mt-2">* Una vez suba sus datos, personal capacitado y con experiencia revisará cada uno de sus documentos.</span>
              </>
            )}
            <div className="flex items-center justify-between w-full mt-4">
              <button type="button" className="bg-blue-800 text-white px-8 py-2 rounded-lg font-bold text-lg shadow hover:bg-blue-900 transition-all" onClick={prevStep}>Anterior</button>
              <span className="text-base font-semibold text-blue-900">{progressByStep[step - 1]}%</span>
              <button type="button" className="bg-blue-800 text-white px-8 py-2 rounded-lg font-bold text-lg shadow hover:bg-blue-900 transition-all" onClick={nextStep}>Siguiente</button>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
              <div className="h-2 bg-blue-800 rounded-full" style={{ width: `${progressByStep[step - 1]}%` }}></div>
            </div>
          </div>
        </>
      )}
      {step === 5 && (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2 text-left w-full">Paso 5: Confirmación y Envío</h2>
          <p className="text-gray-600 mb-6 text-left w-full">Una vez enviada, su aplicación será revisada por nuestros especialistas.</p>
          <div className="flex flex-col gap-4 w-full">
            <label className="flex items-center gap-3 text-base text-gray-800 font-medium">
              <input type="checkbox" name="confirmaRecursos" checked={form.confirmaRecursos || false} onChange={handleChange} className="accent-blue-700 w-5 h-5" />
              El usuario confirma que cuenta con los recursos para el proceso<span className="text-red-500 ml-1">*</span>
            </label>
            <label className="flex items-center gap-3 text-base text-gray-800 font-medium">
              <input type="checkbox" name="aceptaTerminos" checked={form.aceptaTerminos || false} onChange={handleChange} className="accent-blue-700 w-5 h-5" />
              Confirmo que he leído y acepto los términos del proceso EB-3<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="text-gray-800 text-base font-semibold mt-2 mb-2">
              Global Express Recruiting Colombia se compromete a proteger y respetar tu privacidad, y solo usaremos tu información personal para administrar tu cuenta y proporcionar los productos y servicios que nos solicitaste. De vez en cuando, nos gustaría ponernos en contacto contigo acerca de nuestros productos y servicios, así como sobre otros contenidos que puedan interesarte. Si aceptas que nos comuniquemos contigo para este fin, marca la casilla a continuación para indicar cómo deseas que nos comuniquemos:
            </div>
            <label className="flex items-center gap-3 text-base text-gray-800 font-medium">
              <input type="checkbox" name="aceptaComunicaciones" checked={form.aceptaComunicaciones || false} onChange={handleChange} className="accent-blue-700 w-5 h-5" />
              Acepto recibir otras comunicaciones de Global Express Recruiting Colombia.<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="text-gray-800 text-base font-semibold mt-2 mb-2">
              Para poder darte acceso al contenido solicitado, debemos almacenar y tratar tus datos personales. Si aceptas que almacenemos tus datos para este fin, marca la casilla que aparece abajo.
            </div>
            <label className="flex items-center gap-3 text-base text-gray-800 font-medium">
              <input type="checkbox" name="aceptaDatos" checked={form.aceptaDatos || false} onChange={handleChange} className="accent-blue-700 w-5 h-5" />
              Acepto que Global Express Recruiting Colombia almacene y trate mis datos personales.<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="text-gray-600 text-sm mt-2">
              Puedes darte de baja de estas comunicaciones en cualquier momento. Para obtener más información sobre cómo darte de baja, nuestras prácticas de privacidad y cómo nos comprometemos a proteger y respetar tu privacidad, consulta nuestra Política de privacidad.
            </div>
            <div className="flex w-full justify-between items-center mt-8">
              <button type="button" className="bg-blue-800 text-white px-8 py-2 rounded-lg font-bold text-lg shadow hover:bg-blue-900 transition-all" onClick={prevStep}>Anterior</button>
              <button type="button" className="bg-blue-800 text-white px-8 py-2 rounded-lg font-bold text-lg shadow hover:bg-blue-900 transition-all" onClick={nextStep}>Enviar</button>
            </div>
            <div className="w-full flex justify-center items-center mt-4">
              <span className="text-base font-semibold text-blue-900">80%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
              <div className="h-2 bg-blue-800 rounded-full" style={{ width: `${progressByStep[step - 1]}%` }}></div>
            </div>
          </div>
        </>
      )}
      {step === 6 && (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2 text-left w-full">¡Postulación enviada!</h2>
          <p className="text-gray-600 mb-6 text-left w-full">¡Gracias por completar tu postulación! Nuestro equipo revisará tu información y se pondrá en contacto contigo.</p>
          <div className="flex items-center justify-center w-full mt-4">
            <button
              type="button"
              className="bg-blue-800 text-white px-8 py-2 rounded-lg font-bold text-lg shadow hover:bg-blue-900 transition-all"
              onClick={() => router.push('/todas-vacantes')}
            >
              Enviar otra postulación
            </button>
          </div>
        </>
      )}
    </div>
  );
} 