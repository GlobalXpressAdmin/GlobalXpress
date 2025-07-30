# Panel de Administrador - Global Express Recruiting

## 🚀 Configuración Inicial

### 1. Configurar el Primer Administrador

1. **Accede a la página de configuración:**
   ```
   http://localhost:3000/setup-admin
   ```

2. **Ingresa el email de un usuario existente** que quieras convertir en administrador

3. **Haz clic en "Convertir en Administrador"**

4. **Elimina la página de configuración** después de configurar el primer admin:
   ```bash
   rm src/app/setup-admin/page.tsx
   rm src/app/api/admin/setup-admin/route.ts
   ```

### 2. Acceder al Panel de Administración

Una vez configurado el administrador, accede a:
```
http://localhost:3000/admin
```

## 📊 Funcionalidades del Panel

### Dashboard Principal (`/admin`)
- **Estadísticas en tiempo real:**
  - Total de usuarios registrados
  - Postulaciones pendientes
  - Formularios de programa pendientes
  - Comunicaciones pendientes
  - Usuarios nuevos hoy

- **Actividad reciente:**
  - Últimos usuarios registrados
  - Postulaciones recientes
  - Formularios enviados
  - Comunicaciones nuevas

- **Acciones rápidas:**
  - Gestionar usuarios
  - Revisar postulaciones
  - Responder mensajes
  - Ver estadísticas

### Gestión de Usuarios (`/admin/usuarios`)
- **Ver todos los usuarios** con información detallada
- **Buscar usuarios** por nombre, email o nacionalidad
- **Filtrar por rol** (Usuario, Admin, Super Admin)
- **Editar información** de usuarios
- **Cambiar roles** de usuarios
- **Eliminar usuarios** (con confirmación)
- **Ver estadísticas** de actividad por usuario

### Gestión de Postulaciones (`/admin/postulaciones`)
- **Ver todas las postulaciones** con detalles completos
- **Buscar postulaciones** por candidato o empresa
- **Filtrar por estado** (Pendiente, En Revisión, Aprobada, Rechazada, En Proceso)
- **Cambiar estado** de postulaciones
- **Ver detalles completos** de cada postulación
- **Notificaciones automáticas** a usuarios cuando se actualiza el estado

### Gestión de Formularios Programa (`/admin/formularios-programa`)
- **Ver todos los formularios** de programas enviados
- **Gestionar estados** de formularios
- **Filtrar por programa** (EB5, E2, Sky Masters, etc.)
- **Responder a solicitudes** de información

### Gestión de Comunicaciones (`/admin/comunicaciones`)
- **Ver todos los mensajes** de soporte
- **Responder a usuarios** directamente
- **Gestionar tickets** de soporte
- **Marcar como resueltos**

### Notificaciones (`/admin/notificaciones`)
- **Ver todas las notificaciones** del sistema
- **Enviar notificaciones** masivas o individuales
- **Gestionar tipos** de notificaciones

### Estadísticas (`/admin/estadisticas`)
- **Gráficos detallados** de actividad
- **Reportes de crecimiento** de usuarios
- **Análisis de postulaciones** por programa
- **Métricas de conversión**

### Configuración (`/admin/configuracion`)
- **Configuración del sistema**
- **Gestión de roles** y permisos
- **Configuración de notificaciones**

## 🔐 Sistema de Roles

### USUARIO (Por defecto)
- Acceso al área personal
- Ver sus propias postulaciones
- Enviar mensajes de soporte
- Actualizar su perfil

### ADMIN
- Todas las funciones de USUARIO
- Acceso completo al panel de administración
- Gestionar usuarios, postulaciones, formularios
- Enviar notificaciones
- Ver estadísticas

### SUPER_ADMIN
- Todas las funciones de ADMIN
- Eliminar otros super administradores
- Configuración avanzada del sistema
- Acceso a logs del sistema

## 🛡️ Seguridad

### Middleware de Protección
- Todas las rutas `/admin/*` están protegidas
- Solo usuarios con rol ADMIN o SUPER_ADMIN pueden acceder
- Redirección automática a login si no está autenticado
- Redirección a área personal si no tiene permisos

### Validaciones
- Verificación de sesión en todas las APIs
- Validación de roles en cada operación
- Protección contra eliminación de super admins
- Transacciones seguras en la base de datos

## 📱 Diseño Responsivo

El panel está completamente optimizado para:
- **Desktop** (1280px+)
- **Tablet** (768px - 1279px)
- **Mobile** (320px - 767px)

### Características del Diseño
- **Sidebar colapsible** en móviles
- **Tablas responsivas** con scroll horizontal
- **Modales adaptativos** para diferentes pantallas
- **Iconos y botones** optimizados para touch

## 🎨 Interfaz Profesional

### Características de UX/UI
- **Diseño limpio y moderno** con Tailwind CSS
- **Iconos consistentes** de Heroicons
- **Colores profesionales** y accesibles
- **Animaciones suaves** y feedback visual
- **Estados de carga** claros
- **Mensajes de error** informativos

### Componentes Reutilizables
- **Tablas de datos** con filtros y búsqueda
- **Modales** para edición y detalles
- **Cards de estadísticas** con iconos
- **Formularios** consistentes
- **Botones** con estados de hover y focus

## 🔧 Tecnologías Utilizadas

### Frontend
- **Next.js 14** con App Router
- **React 18** con hooks
- **TypeScript** para type safety
- **Tailwind CSS** para estilos
- **Heroicons** para iconografía

### Backend
- **Next.js API Routes**
- **Prisma ORM** para base de datos
- **PostgreSQL** como base de datos
- **NextAuth.js** para autenticación

### Base de Datos
- **Modelos relacionados** con integridad referencial
- **Transacciones** para operaciones críticas
- **Índices optimizados** para consultas rápidas
- **Enums** para estados y roles

## 📈 Escalabilidad

### Arquitectura Preparada para Crecimiento
- **Separación clara** de responsabilidades
- **APIs modulares** y reutilizables
- **Componentes reutilizables** en frontend
- **Middleware escalable** para autenticación
- **Base de datos normalizada** para eficiencia

### Funcionalidades Futuras
- **Dashboard con gráficos** interactivos
- **Sistema de reportes** exportables
- **Notificaciones en tiempo real** con WebSockets
- **API pública** para integraciones
- **Sistema de auditoría** de cambios

## 🚀 Deployment

### Variables de Entorno Requeridas
```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
NEXTAUTH_SECRET="tu-secret-aqui"
GOOGLE_CLIENT_ID="tu-google-client-id"
GOOGLE_CLIENT_SECRET="tu-google-client-secret"
```

### Comandos de Deployment
```bash
# Instalar dependencias
npm install

# Generar cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate deploy

# Construir para producción
npm run build

# Iniciar servidor
npm start
```

## 📞 Soporte

Para soporte técnico o preguntas sobre el panel de administrador:
- **Email:** soporte@globalexpressrecruiting.com
- **Documentación:** Este archivo README
- **Issues:** Crear issue en el repositorio del proyecto

---

**Desarrollado con ❤️ para Global Express Recruiting** 