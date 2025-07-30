# 🔐 Instrucciones para Crear Usuario Administrador

## ⚠️ IMPORTANTE - LEE ANTES DE PROCEDER

Este documento contiene las instrucciones para crear el primer usuario administrador en GlobalXpress. **Sigue estos pasos exactamente** para garantizar la seguridad del sistema.

## 📋 Prerrequisitos

1. **Base de datos configurada** y migraciones ejecutadas
2. **Variables de entorno** configuradas correctamente
3. **Acceso a la terminal** del servidor
4. **Permisos de escritura** en la base de datos

## 🚀 Pasos para Crear el Administrador

### Paso 1: Verificar Configuración
```bash
# Verificar que las migraciones están aplicadas
npx prisma migrate status

# Verificar conexión a la base de datos
npx prisma db pull
```

### Paso 2: Ejecutar Script de Creación
```bash
# Ejecutar el script de creación del administrador
node scripts/create-admin.js
```

### Paso 3: Verificar Creación
El script mostrará un mensaje de éxito con las credenciales:

```
✅ Usuario administrador creado exitosamente!
📧 Email: admin@globalxpress.com
🔑 Contraseña: AdminGlobalXpress2024!
🆔 ID del usuario: [uuid]
👤 Nombre: Administrador GlobalXpress
🔐 Rol: ADMIN
```

## 🔑 Credenciales del Administrador

**Email:** `admin@globalxpress.com`  
**Contraseña:** `AdminGlobalXpress2024!`

## 🌐 Acceso al Panel

Una vez creado el usuario, accede a:
```
http://tu-dominio.com/admin
```

## 🔒 Medidas de Seguridad

### Inmediatamente después de crear el administrador:

1. **Cambia la contraseña** desde el panel de administración
2. **Verifica el acceso** a todas las funcionalidades
3. **Revisa los logs** para confirmar que no hay errores
4. **Elimina o protege** el script de creación si es necesario

### Recomendaciones adicionales:

- **Usa una contraseña fuerte** al cambiarla
- **Habilita autenticación de dos factores** si es posible
- **Monitorea los accesos** al panel de administración
- **Mantén backups** regulares de la base de datos

## 🚨 Solución de Problemas

### Error: "El usuario administrador ya existe"
- El usuario ya fue creado anteriormente
- Puedes usar las credenciales existentes
- Si olvidaste la contraseña, puedes resetearla desde la base de datos

### Error: "Error de conexión a la base de datos"
- Verifica la variable `DATABASE_URL` en `.env.local`
- Asegúrate de que la base de datos esté ejecutándose
- Verifica las credenciales de la base de datos

### Error: "No se pudo encriptar la contraseña"
- Verifica que `bcryptjs` esté instalado: `npm install bcryptjs`
- Asegúrate de tener permisos de escritura en el directorio

## 📞 Soporte

Si encuentras problemas durante el proceso:

1. Revisa los logs del servidor
2. Verifica la configuración de la base de datos
3. Consulta la documentación de Prisma
4. Contacta al equipo de desarrollo

---

**⚠️ IMPORTANTE:** Estas credenciales son sensibles. No las compartas ni las dejes en archivos de texto plano. 