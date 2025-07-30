const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function setupAdmin() {
  try {
    console.log('🔧 Configurando usuario administrador...');
    
    // Verificar si el usuario ya existe
    const existingUser = await prisma.usuarios_global.findUnique({
      where: { email: 'admin@globalxpress.com' }
    });

    if (existingUser) {
      console.log('✅ Usuario administrador ya existe');
      console.log('📧 Email:', existingUser.email);
      console.log('👤 Nombre:', existingUser.nombre);
      console.log('🔐 Rol:', existingUser.rol);
      
      // Verificar si tiene el rol correcto
      if (existingUser.rol !== 'ADMIN' && existingUser.rol !== 'SUPER_ADMIN') {
        console.log('🔄 Actualizando rol a ADMIN...');
        await prisma.usuarios_global.update({
          where: { email: 'admin@globalxpress.com' },
          data: { rol: 'ADMIN' }
        });
        console.log('✅ Rol actualizado');
      }
    } else {
      console.log('🚀 Creando nuevo usuario administrador...');
      
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
      console.log('🆔 ID:', adminUser.id);
    }
    
    console.log('');
    console.log('🎉 Configuración completada');
    console.log('🌐 Credenciales de acceso:');
    console.log('📧 Email: admin@globalxpress.com');
    console.log('🔑 Contraseña: AdminGlobalXpress2024!');
    console.log('🔗 Panel de administración: /admin');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupAdmin(); 