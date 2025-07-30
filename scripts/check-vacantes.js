const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkVacantes() {
  try {
    console.log('Verificando vacantes en la base de datos...\n');
    
    // Obtener todas las vacantes
    const vacantes = await prisma.vacante.findMany({
      orderBy: { creado_en: 'desc' },
      select: {
        id: true,
        empresa: true,
        cargo: true,
        salario: true,
        activa: true,
        creado_en: true,
      }
    });
    
    console.log(`Total de vacantes en la base de datos: ${vacantes.length}\n`);
    
    // Mostrar las primeras 10 vacantes como ejemplo
    console.log('Primeras 10 vacantes:');
    console.log('=====================');
    
    vacantes.slice(0, 10).forEach((vacante, index) => {
      console.log(`${index + 1}. ${vacante.empresa}`);
      console.log(`   Cargo: ${vacante.cargo}`);
      console.log(`   Salario: ${vacante.salario || 'No especificado'}`);
      console.log(`   Estado: ${vacante.activa ? 'Activa' : 'Inactiva'}`);
      console.log(`   Fecha: ${vacante.creado_en.toLocaleDateString()}`);
      console.log('');
    });
    
    // Estadísticas
    const activas = vacantes.filter(v => v.activa).length;
    const inactivas = vacantes.filter(v => !v.activa).length;
    
    console.log('Estadísticas:');
    console.log(`- Vacantes activas: ${activas}`);
    console.log(`- Vacantes inactivas: ${inactivas}`);
    console.log(`- Total: ${vacantes.length}`);
    
    // Verificar que hay suficientes vacantes
    if (vacantes.length >= 50) {
      console.log('\n✅ ¡Excelente! Hay suficientes vacantes en la base de datos.');
    } else {
      console.log('\n⚠️  Advertencia: Hay menos de 50 vacantes en la base de datos.');
    }
    
  } catch (error) {
    console.error('Error al verificar vacantes:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkVacantes(); 