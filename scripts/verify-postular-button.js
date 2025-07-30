const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function verifyPostularButton() {
  try {
    console.log('Verificando que todas las vacantes tengan funcionalidad de postulación...\n');
    
    // Obtener todas las vacantes
    const vacantes = await prisma.vacante.findMany({
      orderBy: { creado_en: 'desc' },
      select: {
        id: true,
        empresa: true,
        cargo: true,
        link: true,
        activa: true,
      }
    });
    
    console.log(`Total de vacantes en la base de datos: ${vacantes.length}\n`);
    
    // Verificar que todas las vacantes tengan ID (necesario para el botón "Postular ahora")
    const vacantesConId = vacantes.filter(v => v.id);
    const vacantesSinId = vacantes.filter(v => !v.id);
    
    console.log('Estadísticas de funcionalidad de postulación:');
    console.log(`- Vacantes con ID (pueden postularse): ${vacantesConId.length}`);
    console.log(`- Vacantes sin ID (no pueden postularse): ${vacantesSinId.length}`);
    console.log(`- Total: ${vacantes.length}`);
    
    if (vacantesSinId.length > 0) {
      console.log('\n⚠️  ADVERTENCIA: Algunas vacantes no tienen ID y no pueden postularse:');
      vacantesSinId.forEach(v => {
        console.log(`  - ${v.empresa} - ${v.cargo}`);
      });
    }
    
    // Mostrar ejemplos de vacantes con y sin link
    const vacantesConLink = vacantes.filter(v => v.link && v.link !== 'No especificado');
    const vacantesSinLink = vacantes.filter(v => !v.link || v.link === 'No especificado');
    
    console.log('\nEstadísticas de enlaces:');
    console.log(`- Vacantes con enlace externo: ${vacantesConLink.length}`);
    console.log(`- Vacantes sin enlace externo: ${vacantesSinLink.length}`);
    
    // Mostrar las primeras 5 vacantes como ejemplo
    console.log('\nPrimeras 5 vacantes (ejemplo de funcionalidad):');
    console.log('==============================================');
    
    vacantes.slice(0, 5).forEach((vacante, index) => {
      console.log(`${index + 1}. ${vacante.empresa}`);
      console.log(`   Cargo: ${vacante.cargo}`);
      console.log(`   ID: ${vacante.id ? '✅ Sí' : '❌ No'}`);
      console.log(`   Link: ${vacante.link ? '✅ Sí' : '❌ No'}`);
      console.log(`   Estado: ${vacante.activa ? 'Activa' : 'Inactiva'}`);
      console.log(`   URL Postulación: /postulacion?vacante=${vacante.id}`);
      console.log('');
    });
    
    // Verificar que todas las vacantes puedan postularse
    if (vacantesConId.length === vacantes.length) {
      console.log('✅ ¡Excelente! Todas las vacantes pueden postularse.');
      console.log('✅ El botón "Postular ahora" aparecerá en todas las vacantes.');
    } else {
      console.log('❌ Problema: Algunas vacantes no pueden postularse.');
    }
    
    // Verificar que las vacantes activas sean las que se muestran
    const vacantesActivas = vacantes.filter(v => v.activa);
    console.log(`\nVacantes activas (se muestran al público): ${vacantesActivas.length}`);
    console.log(`Vacantes inactivas (no se muestran): ${vacantes.length - vacantesActivas.length}`);
    
  } catch (error) {
    console.error('Error al verificar funcionalidad de postulación:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyPostularButton(); 