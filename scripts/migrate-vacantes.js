const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Datos de vacantes del archivo original
const vacantesData = [
  {
    empresa: "Arlene Resource Management LLC",
    descripcion: "Trabajo agrícola con papas: siembra, cultivo, cosecha y empaque.",
    cargo: "Trabajador Agrícola",
    salario: "$18.83/hora",
    email: "office@arleneresourcemanagement.com",
    workers: "8",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25143-014831"
  },
  {
    empresa: "Fresh Harvest, Inc.",
    descripcion: "Cosecha y cultivo de cebollas, remolachas, nabos y otros vegetales.",
    cargo: "Trabajador de Campo",
    salario: "$17.04/hora",
    email: "No especificado",
    workers: "135",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-24334-507521"
  },
  {
    empresa: "CSS Farms LLC",
    descripcion: "Clasificación de papas por tamaño, forma y calidad; carga de camiones.",
    cargo: "Clasificador de Productos Agrícolas",
    salario: "$18.83/hora",
    email: "No especificado",
    workers: "7",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25030-655764"
  },
  {
    empresa: "Nature's Choice Inc.",
    descripcion: "Trabajos generales en granja con cultivo de frutas y vegetales.",
    cargo: "Trabajador Agrícola",
    salario: "$16.08/hora",
    email: "No especificado",
    workers: "56",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25154-048563"
  },
  {
    empresa: "P. MARIN HARVESTING, INC.",
    descripcion: "Cosecha de manzanas en plantaciones; incluye trepar escaleras y cargar.",
    cargo: "Trabajador Agrícola",
    salario: "$16.16/hora",
    email: "primo.harvest@outlook.com",
    workers: "21",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25092-820948"
  },
  {
    empresa: "Six Flags Great America",
    descripcion: "Preparación y venta de alimentos en parque de diversiones.",
    cargo: "Trabajador de Servicio de Alimentos",
    salario: "$14.28/hora",
    email: "SFGRAMHR@sftp.com",
    workers: "155",
    link: "https://seasonaljobs.dol.gov/jobs/H-400-24002-601886"
  },
  {
    empresa: "The Red Inn at Provincetown Inc",
    descripcion: "Lavado de platos, utensilios, limpieza de cocina en restaurante turístico.",
    cargo: "Lavaplatos",
    salario: "$17.03–$20.00/hora",
    email: "No especificado",
    workers: "10",
    link: "https://seasonaljobs.dol.gov/jobs/H-400-24002-605141"
  },
  {
    empresa: "The Everglades Club, Inc.",
    descripcion: "Preparación de alimentos en cocina de club privado.",
    cargo: "Cocinero",
    salario: "$20.00/hora",
    email: "No especificado",
    workers: "8",
    link: "https://seasonaljobs.dol.gov/jobs/H-400-24185-174184"
  },
  {
    empresa: "Brickman Group Ltd LLC",
    descripcion: "Tareas de paisajismo, mantenimiento de jardines y zonas verdes.",
    cargo: "Paisajista",
    salario: "$18.05/hora",
    email: "No especificado",
    workers: "65",
    link: "https://seasonaljobs.dol.gov/jobs/H-400-24191-187945"
  },
  {
    empresa: "GIII HARVESTING, LLC",
    descripcion: "Trabajo agrícola general en la cosecha de cultivos diversos.",
    cargo: "Trabajador Agrícola",
    salario: "$16.16 por hora",
    email: "No especificado",
    workers: "30",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25143-010841"
  }
];

async function migrateVacantes() {
  try {
    console.log('🚀 Iniciando migración de vacantes...');
    
    // Verificar si ya existen vacantes
    const existingVacantes = await prisma.vacante.count();
    
    if (existingVacantes > 0) {
      console.log(`⚠️  Ya existen ${existingVacantes} vacantes en la base de datos.`);
      console.log('Si quieres migrar de nuevo, primero elimina las vacantes existentes.');
      return;
    }

    // Crear las vacantes
    const createdVacantes = [];
    
    for (const vacanteData of vacantesData) {
      const vacante = await prisma.vacante.create({
        data: {
          empresa: vacanteData.empresa,
          cargo: vacanteData.cargo,
          salario: vacanteData.salario,
          descripcion: vacanteData.descripcion,
          email: vacanteData.email === "No especificado" ? null : vacanteData.email,
          workers: vacanteData.workers,
          link: vacanteData.link,
          activa: true,
        }
      });
      
      createdVacantes.push(vacante);
      console.log(`✅ Creada vacante: ${vacante.empresa} - ${vacante.cargo}`);
    }

    console.log('');
    console.log('🎉 Migración completada exitosamente!');
    console.log(`📊 Total de vacantes migradas: ${createdVacantes.length}`);
    console.log('');
    console.log('🌐 Las vacantes ahora están disponibles en:');
    console.log('- Panel de administración: /admin/vacantes');
    console.log('- API pública: /api/vacantes');
    console.log('');
    console.log('💡 Puedes agregar más vacantes desde el panel de administración.');

  } catch (error) {
    console.error('❌ Error durante la migración:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar la migración
migrateVacantes(); 