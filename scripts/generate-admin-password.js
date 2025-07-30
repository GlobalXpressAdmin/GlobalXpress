const bcrypt = require('bcryptjs');

async function generatePassword() {
  try {
    const password = 'AdminGlobalXpress2024!';
    const hashedPassword = await bcrypt.hash(password, 12);
    
    console.log('🔑 Contraseña hasheada generada:');
    console.log('');
    console.log('📧 Email: admin@globalxpress.com');
    console.log('🔑 Contraseña original: AdminGlobalXpress2024!');
    console.log('🔐 Contraseña hasheada:');
    console.log(hashedPassword);
    console.log('');
    console.log('📋 Copia y pega esta contraseña hasheada en Prisma Studio o en tu base de datos');
    console.log('');
    console.log('📝 Datos completos del usuario:');
    console.log('{');
    console.log('  email: "admin@globalxpress.com",');
    console.log('  password: "' + hashedPassword + '",');
    console.log('  nombre: "Administrador GlobalXpress",');
    console.log('  rol: "ADMIN",');
    console.log('  telefono: "",');
    console.log('  genero: "",');
    console.log('  fecha_nacimiento: null,');
    console.log('  nacionalidad: "",');
    console.log('  indicativo: ""');
    console.log('}');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

generatePassword(); 