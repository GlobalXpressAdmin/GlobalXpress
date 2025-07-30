const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    console.log('🚀 Creando usuario administrador con Prisma...');
    
    // Generar contraseña hasheada
    const hashedPassword = await bcrypt.hash('AdminGlobalXpress2024!', 12);
    
    // Crear el usuario administrador
    const adminUser = await prisma.usuarios_global.create({
      data: {
        email: 'admin@globalxpress.com',
        password: hashedPassword,
        nombre: 'Administrador GlobalXpress',
        rol: 'ADMIN',
        telefono: '',
        genero: '',
        fecha_nacimiento: null,
        nacionalidad: '',
        indicativo: ''
      }
    });
    
    console.log('✅ Usuario administrador creado exitosamente!');
    console.log('📧 Email:', adminUser.email);
    console.log('👤 Nombre:', adminUser.nombre);
    console.log('🔐 Rol:', adminUser.rol);
    console.log('🆔 ID:', adminUser.id);
    console.log('');
    console.log('🌐 Credenciales para acceder:');
    console.log('📧 Email: admin@globalxpress.com');
    console.log('🔑 Contraseña: AdminGlobalXpress2024!');
    console.log('🔗 URL: /admin');
    
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('⚠️  El usuario administrador ya existe');
      console.log('📧 Email: admin@globalxpress.com');
      console.log('🔑 Contraseña: AdminGlobalXpress2024!');
    } else {
      console.error('❌ Error:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser(); 