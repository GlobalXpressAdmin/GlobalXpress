'use client';
import { useSearchParams } from "next/navigation";
import vacantes from "../../components/vacantesData";
import React, { useState } from "react";
import { FaPhone } from 'react-icons/fa';

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
          <MultiStepForm />
        </div>
      )}
      {/* Aquí irá el contenido de la página de postulación */}
    </section>
  );
}

// Componente de formulario multipaso
function MultiStepForm() {
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
    conoceEEUU: null as boolean | null,
    trabajoSinAutorizacion: null as boolean | null,
    antecedentesMigratorios: null as boolean | null,
    antecedentesMigratoriosDetalle: '',
    arrestado: null as boolean | null,
    arrestadoDetalle: '',
    saldoMinimo: null as boolean | null,
    quiereFinanciamiento: null as boolean | null,
    confirmaRecursos: false,
    aceptaTerminos: false,
    aceptaComunicaciones: false,
    aceptaDatos: false,
  });
  const [progreso, setProgreso] = useState(20);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => {
    setStep(s => Math.min(s + 1, 4));
    setProgreso(p => Math.min(p + 20, 100));
  };
  const prevStep = () => {
    setStep(s => Math.max(s - 1, 1));
    setProgreso(p => Math.max(p - 20, 20));
  };

  return (
    <div className="bg-[#f5f5f5] rounded shadow p-8 mt-8 max-w-4xl mx-auto">
      {step === 1 && (
        <div>
          <h3 className="text-2xl font-bold mb-2 text-[#054B74]">Paso 1: Datos Personales</h3>
          <p className="mb-4 text-[#223]">Ingrese sus datos personales tal como aparecen en su pasaporte. Esta información será utilizada para validar su postulación.<br/>Los campos marcados con * son obligatorios.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="font-semibold">Nombre*</label>
              <input name="nombre" value={form.nombre} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="font-semibold">Apellidos*</label>
              <input name="apellidos" value={form.apellidos} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
          </div>
          <div className="mb-4">
            <label className="font-semibold">Correo*</label>
            <input name="correo" value={form.correo} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="mb-4 flex gap-2">
            <select name="pais" value={form.pais} onChange={handleChange} className="border rounded px-3 py-2">
              <option value="">País*</option>
              <option value="CO">Colombia</option>
              <option value="MX">México</option>
              <option value="PE">Perú</option>
              <option value="EC">Ecuador</option>
              <option value="AR">Argentina</option>
              <option value="CL">Chile</option>
            </select>
            <div className="flex items-center border rounded px-3 py-2 flex-1 bg-white">
              <FaPhone className="text-gray-400 mr-2" />
              <span className="text-gray-700 font-semibold mr-2">+57</span>
              <input name="telefono" value={form.telefono} onChange={handleChange} className="flex-1 outline-none border-none bg-transparent" placeholder="Teléfono*" />
            </div>
          </div>
          <div className="mb-4">
            <label className="font-semibold">¿Cuál ciudad?*</label>
            <input name="ciudad" value={form.ciudad} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="mb-4">
            <label className="font-semibold">¿Dispone de visa?</label>
            <select name="visa" value={form.visa} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="">Seleccione</option>
              <option value="SI">Sí</option>
              <option value="NO">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="font-semibold">Dirección completa*</label>
            <input name="direccion" value={form.direccion} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded h-2 mb-2">
              <div className="bg-[#054B74] h-2 rounded" style={{width: `${progreso}%`}}></div>
            </div>
            <span className="text-sm font-semibold">{progreso}%</span>
          </div>
          <div className="flex justify-end">
            <button type="button" className="bg-[#054B74] text-white px-6 py-2 rounded font-bold" onClick={nextStep}>Siguiente</button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <h3 className="text-2xl font-bold mb-2 text-[#054B74]">Paso 2: Historial Migratorio</h3>
          <p className="mb-4 text-[#223]">Responda las siguientes preguntas con honestidad. Esta información es clave para evaluar su elegibilidad en el programa EB-3.</p>
          <div className="mb-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <label className="font-semibold flex-1">¿Conoce los Estados Unidos?</label>
              <select name="conoceEEUU" value={form.conoceEEUU === true ? 'SI' : form.conoceEEUU === false ? 'NO' : ''} onChange={e => setForm(prev => ({ ...prev, conoceEEUU: e.target.value === 'SI' ? true : e.target.value === 'NO' ? false : null }))} className="border rounded px-3 py-2">
                <option value="">Seleccione</option>
                <option value="SI">Sí</option>
                <option value="NO">No</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <label className="font-semibold flex-1">¿Ha trabajado en EE. UU. sin autorización?</label>
              <select name="trabajoSinAutorizacion" value={form.trabajoSinAutorizacion === true ? 'SI' : form.trabajoSinAutorizacion === false ? 'NO' : ''} onChange={e => setForm(prev => ({ ...prev, trabajoSinAutorizacion: e.target.value === 'SI' ? true : e.target.value === 'NO' ? false : null }))} className="border rounded px-3 py-2">
                <option value="">Seleccione</option>
                <option value="SI">Sí</option>
                <option value="NO">No</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <label className="font-semibold flex-1">¿Tiene antecedentes migratorios?</label>
              <select name="antecedentesMigratorios" value={form.antecedentesMigratorios === true ? 'SI' : form.antecedentesMigratorios === false ? 'NO' : ''} onChange={e => setForm(prev => ({ ...prev, antecedentesMigratorios: e.target.value === 'SI' ? true : e.target.value === 'NO' ? false : null, antecedentesMigratoriosDetalle: '' }))} className="border rounded px-3 py-2">
                <option value="">Seleccione</option>
                <option value="SI">Sí</option>
                <option value="NO">No</option>
              </select>
            </div>
            {form.antecedentesMigratorios === true && (
              <div className="flex items-center gap-4 mt-2">
                <label className="font-semibold flex-1" />
                <input type="text" name="antecedentesMigratoriosDetalle" value={form.antecedentesMigratoriosDetalle} onChange={handleChange} className="border rounded px-3 py-2 flex-1" placeholder="Describa los antecedentes migratorios..." />
              </div>
            )}
            <div className="flex items-center gap-4 mt-4">
              <label className="font-semibold flex-1">¿Ha sido arrestado o acusado de un delito?</label>
              <select name="arrestado" value={form.arrestado === true ? 'SI' : form.arrestado === false ? 'NO' : ''} onChange={e => setForm(prev => ({ ...prev, arrestado: e.target.value === 'SI' ? true : e.target.value === 'NO' ? false : null, arrestadoDetalle: '' }))} className="border rounded px-3 py-2">
                <option value="">Seleccione</option>
                <option value="SI">Sí</option>
                <option value="NO">No</option>
              </select>
            </div>
            {form.arrestado === true && (
              <div className="flex items-center gap-4 mt-2">
                <label className="font-semibold flex-1" />
                <input type="text" name="arrestadoDetalle" value={form.arrestadoDetalle} onChange={handleChange} className="border rounded px-3 py-2 flex-1" placeholder="Describa la situación..." />
              </div>
            )}
          </div>
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded h-2 mb-2">
              <div className="bg-[#054B74] h-2 rounded" style={{width: `${progreso + 20}%`}}></div>
            </div>
            <span className="text-sm font-semibold">{progreso + 20}%</span>
          </div>
          <div className="flex justify-between">
            <button type="button" className="bg-gray-300 text-[#054B74] px-6 py-2 rounded font-bold" onClick={prevStep}>Anterior</button>
            <button type="button" className="bg-[#054B74] text-white px-6 py-2 rounded font-bold" onClick={nextStep}>Siguiente</button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div>
          <h3 className="text-2xl font-bold mb-2 text-[#054B74]">Paso 3: Capacidad Financiera</h3>
          <p className="mb-4 text-[#223]">Confirme si cuenta con los recursos económicos para completar el proceso de migración.</p>
          <div className="mb-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <label className="font-semibold flex-1">¿Cuenta con el saldo mínimo para todo el proceso EB-3?</label>
              <select name="saldoMinimo" value={form.saldoMinimo === true ? 'SI' : form.saldoMinimo === false ? 'NO' : ''} onChange={e => setForm(prev => ({ ...prev, saldoMinimo: e.target.value === 'SI' ? true : e.target.value === 'NO' ? false : null }))} className="border rounded px-3 py-2">
                <option value="">Seleccione</option>
                <option value="SI">Sí</option>
                <option value="NO">No</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <label className="font-semibold flex-1">¿Quisiera conocer nuestros métodos de financiamiento?</label>
              <select name="quiereFinanciamiento" value={form.quiereFinanciamiento === true ? 'SI' : form.quiereFinanciamiento === false ? 'NO' : ''} onChange={e => setForm(prev => ({ ...prev, quiereFinanciamiento: e.target.value === 'SI' ? true : e.target.value === 'NO' ? false : null }))} className="border rounded px-3 py-2">
                <option value="">Seleccione</option>
                <option value="SI">Sí</option>
                <option value="NO">No</option>
              </select>
            </div>
            {form.quiereFinanciamiento === true && (
              <div className="flex items-center gap-4 mt-2">
                <label className="font-semibold flex-1" />
                <button type="button" className="bg-[#054B74] text-white px-6 py-2 rounded font-bold">Planes de financiamiento</button>
              </div>
            )}
          </div>
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded h-2 mb-2">
              <div className="bg-[#054B74] h-2 rounded" style={{width: `${progreso + 40}%`}}></div>
            </div>
            <span className="text-sm font-semibold">{progreso + 40}%</span>
          </div>
          <div className="flex justify-between">
            <button type="button" className="bg-gray-300 text-[#054B74] px-6 py-2 rounded font-bold" onClick={prevStep}>Anterior</button>
            <button type="button" className="bg-[#054B74] text-white px-6 py-2 rounded font-bold" onClick={nextStep}>Siguiente</button>
          </div>
        </div>
      )}
      {step === 4 && (
        <div>
          <h3 className="text-2xl font-bold mb-2 text-[#054B74]">Paso 4: Confirmación y Envío</h3>
          <p className="mb-4 text-[#223]">Una vez enviada, su aplicación será revisada por nuestros especialistas.</p>
          <div className="mb-4 flex flex-col gap-2">
            <label className="flex items-center gap-2"><input type="checkbox" name="confirmaRecursos" checked={form.confirmaRecursos} onChange={handleChange}/>El usuario confirma que cuenta con los recursos para el proceso*</label>
            <label className="flex items-center gap-2"><input type="checkbox" name="aceptaTerminos" checked={form.aceptaTerminos} onChange={handleChange}/>Confirmo que he leído y acepto los términos del proceso EB-3*</label>
            <label className="flex items-center gap-2"><input type="checkbox" name="aceptaComunicaciones" checked={form.aceptaComunicaciones} onChange={handleChange}/>Acepto recibir otras comunicaciones de Global Express Recruiting Colombia*</label>
            <label className="flex items-center gap-2"><input type="checkbox" name="aceptaDatos" checked={form.aceptaDatos} onChange={handleChange}/>Acepto que Global Express Recruiting Colombia almacene y trate mis datos personales*</label>
          </div>
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded h-2 mb-2">
              <div className="bg-[#054B74] h-2 rounded" style={{width: `100%`}}></div>
            </div>
            <span className="text-sm font-semibold">100%</span>
          </div>
          <div className="flex justify-between">
            <button type="button" className="bg-gray-300 text-[#054B74] px-6 py-2 rounded font-bold" onClick={prevStep}>Anterior</button>
            <button type="button" className="bg-[#054B74] text-white px-6 py-2 rounded font-bold opacity-60 cursor-not-allowed" disabled>Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
} 