# 🔧 Configuración del Usuario Administrador

## 📋 Resumen

Este documento explica cómo configurar el usuario administrador para el panel de administración de GlobalXpress.

## 🚀 Configuración Rápida

### 1. Ejecutar el script de configuración

```bash
node scripts/setup-admin.js
```

### 2. Credenciales de acceso

Una vez ejecutado el script, puedes acceder con:

- **Email:** `admin@globalxpress.com`
- **Contraseña:** `AdminGlobalXpress2024!`
- **URL:** `/admin`

## 🔧 Configuración Manual (Alternativa)

Si prefieres crear el usuario manualmente:

### Opción 1: Usar Prisma Studio

1. Ejecutar: `npx prisma studio`
2. Ir a la tabla `usuarios_global`
3. Hacer clic en "Add record"
4. Llenar los campos:

```json
{
  "email": "admin@globalxpress.com",
  "password": "$2b$12$SnsWdnI5sxq0qQ24D1jgRej4d4f1c7DGOn8s3gNaSCrv593ltVcuG",
  "nombre": "Administrador GlobalXpress",
  "rol": "ADMIN",
  "telefono": "",
  "genero": "",
  "fecha_nacimiento": null,
  "nacionalidad": "",
  "indicativo": ""
}
```

### Opción 2: Generar contraseña hasheada

```bash
node scripts/generate-admin-password.js
```

## 🌐 Configuración en Producción

Para configurar en producción (Vercel, etc.):

1. **Conectar a la base de datos de producción**
2. **Ejecutar migraciones:**
   ```bash
   npx prisma migrate deploy
   ```
3. **Crear usuario administrador:**
   ```bash
   node scripts/setup-admin.js
   ```
4. **Migrar vacantes:**
   ```bash
   node scripts/migrate-vacantes.js
   ```

## 🔒 Seguridad

- El usuario administrador tiene rol `ADMIN`
- La contraseña está hasheada con bcrypt
- Solo usuarios con rol `ADMIN` o `SUPER_ADMIN` pueden acceder al panel
- El middleware protege todas las rutas `/admin/*`

## 📁 Archivos Importantes

- `scripts/setup-admin.js` - Script principal de configuración
- `scripts/migrate-vacantes.js` - Migración de vacantes
- `src/middleware.ts` - Protección de rutas
- `src/app/admin/` - Panel de administración

## 🎯 Funcionalidades del Panel

- ✅ Gestión de usuarios
- ✅ Gestión de vacantes
- ✅ Revisión de postulaciones
- ✅ Gestión de formularios
- ✅ Comunicaciones
- ✅ Estadísticas del sistema

## 🆘 Solución de Problemas

### Error: "Usuario no encontrado"
- Verificar que las migraciones estén aplicadas
- Ejecutar: `npx prisma migrate status`

### Error: "No autorizado"
- Verificar que el usuario tenga rol `ADMIN`
- Verificar que la contraseña sea correcta

### Error: "Base de datos no conectada"
- Verificar variables de entorno
- Verificar conexión a la base de datos

## 📞 Soporte

Si tienes problemas, verifica:
1. Estado de las migraciones
2. Conexión a la base de datos
3. Variables de entorno
4. Logs del servidor 