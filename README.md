# 🌐 GlobalXpress - Panel de Administración

Panel de administración completo para la gestión de usuarios, postulaciones, formularios y comunicaciones en GlobalXpress.

## 📋 Características Principales

### 🔐 Sistema de Autenticación y Autorización
- **NextAuth.js** para autenticación segura
- **Roles de usuario:** `USUARIO`, `ADMIN`, `SUPER_ADMIN`
- **Middleware** para protección de rutas
- **JWT** para manejo de sesiones

### 👥 Gestión de Usuarios
- Ver todos los usuarios registrados
- Buscar y filtrar usuarios por rol
- Editar información de usuarios
- Eliminar usuarios (con restricciones de seguridad)
- Ver estadísticas de actividad por usuario

### 📝 Gestión de Postulaciones
- Ver todas las postulaciones de trabajo
- Filtrar por estado (Pendiente, En Revisión, Aprobada, Rechazada)
- Actualizar estado de postulaciones
- Ver detalles completos de cada postulación
- Notificaciones automáticas al cambiar estado

### 📊 Dashboard Administrativo
- Estadísticas en tiempo real
- Actividad reciente
- Métricas clave del sistema
- Vista general del estado del sitio

### 🔔 Sistema de Notificaciones
- Notificaciones automáticas para cambios de estado
- Historial de notificaciones por usuario
- Gestión centralizada de comunicaciones

## 🚀 Configuración Inicial del Administrador

### Crear Usuario Administrador

Para crear el primer usuario administrador, ejecuta el siguiente comando en la terminal:

```bash
node scripts/create-admin.js
```

Este script creará automáticamente un usuario administrador con las siguientes credenciales:

- **Email:** `admin@globalxpress.com`
- **Contraseña:** `AdminGlobalXpress2024!`
- **Nombre:** `Administrador GlobalXpress`
- **Rol:** `ADMIN`

### Credenciales del Administrador

```
📧 Email: admin@globalxpress.com
🔑 Contraseña: AdminGlobalXpress2024!
```

**⚠️ IMPORTANTE:** 
- Guarda estas credenciales en un lugar seguro
- Cambia la contraseña después del primer inicio de sesión por seguridad
- El script verifica si el usuario ya existe para evitar duplicados

### Acceso al Panel de Administración

Una vez creado el usuario administrador, puedes acceder al panel en:
```
http://tu-dominio.com/admin
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- PostgreSQL
- npm o yarn

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Base de Datos
```bash
# Generar cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev

# (Opcional) Ver datos en la base de datos
npx prisma studio
```

### 3. Variables de Entorno
Crea un archivo `.env.local` con las siguientes variables:

```env
# Base de datos
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/globalxpress"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secret-muy-seguro"

# Google OAuth (opcional)
GOOGLE_CLIENT_ID="tu-google-client-id"
GOOGLE_CLIENT_SECRET="tu-google-client-secret"
```

### 4. Crear Usuario Administrador
```bash
node scripts/create-admin.js
```

### 5. Iniciar Servidor de Desarrollo
```bash
npm run dev
```

## 🔒 Seguridad

### Protección de Rutas
- **Middleware** protege todas las rutas `/admin/*`
- Solo usuarios con rol `ADMIN` o `SUPER_ADMIN` pueden acceder
- Redirección automática para usuarios no autorizados

### Validación de Roles
- Verificación de roles en cada API endpoint
- Prevención de escalación de privilegios
- Protección contra eliminación de super-administradores

### Encriptación
- Contraseñas encriptadas con bcrypt
- JWT seguros para sesiones
- Validación de entrada en todos los endpoints

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── admin/                 # Panel de administración
│   │   ├── layout.tsx        # Layout principal del admin
│   │   ├── page.tsx          # Dashboard principal
│   │   ├── usuarios/         # Gestión de usuarios
│   │   └── postulaciones/    # Gestión de postulaciones
│   ├── api/
│   │   ├── admin/            # APIs del panel admin
│   │   └── auth/             # APIs de autenticación
│   └── middleware.ts         # Middleware de protección
├── components/               # Componentes reutilizables
└── lib/                      # Utilidades y configuración
```

## 🎨 Diseño y UX

### Características del Diseño
- **Responsive** para todos los dispositivos
- **Dark/Light mode** automático
- **Interfaz intuitiva** y profesional
- **Navegación clara** con sidebar
- **Feedback visual** para todas las acciones

### Componentes Principales
- **Sidebar** con navegación
- **DataTables** para listas de datos
- **Modales** para edición y detalles
- **Cards** para estadísticas
- **Formularios** con validación

## 🔧 Tecnologías Utilizadas

### Frontend
- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **React Hook Form** - Manejo de formularios
- **Lucide React** - Iconos

### Backend
- **Next.js API Routes** - APIs del servidor
- **Prisma ORM** - Base de datos
- **PostgreSQL** - Base de datos
- **NextAuth.js** - Autenticación
- **bcryptjs** - Encriptación

### Herramientas
- **ESLint** - Linting de código
- **Prettier** - Formateo de código
- **Prisma Studio** - Gestión de base de datos

## 📊 Funcionalidades del Dashboard

### Estadísticas Principales
- **Total de usuarios** registrados
- **Usuarios nuevos** hoy
- **Postulaciones totales** y pendientes
- **Formularios de programa** enviados
- **Comunicaciones** activas

### Actividad Reciente
- **Nuevos usuarios** registrados
- **Postulaciones** recientes
- **Formularios** enviados
- **Comunicaciones** iniciadas

## 👥 Gestión de Usuarios

### Funcionalidades
- **Lista completa** de usuarios
- **Búsqueda** por nombre o email
- **Filtrado** por rol
- **Edición** de información
- **Eliminación** segura
- **Estadísticas** por usuario

### Restricciones de Seguridad
- No se pueden eliminar super-administradores
- Solo super-administradores pueden eliminar administradores
- Eliminación en cascada de datos relacionados

## 📝 Gestión de Postulaciones

### Funcionalidades
- **Lista completa** de postulaciones
- **Filtrado** por estado
- **Búsqueda** por nombre del candidato
- **Actualización** de estado
- **Vista detallada** de cada postulación
- **Notificaciones automáticas**

### Estados de Postulación
- **Pendiente** - Recién enviada
- **En Revisión** - En proceso de evaluación
- **Aprobada** - Aceptada
- **Rechazada** - No aceptada

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Ejecuta las migraciones de Prisma
4. Crea el usuario administrador

### Otros Proveedores
- **Netlify** - Compatible con Next.js
- **Railway** - Incluye PostgreSQL
- **Heroku** - Con add-on de PostgreSQL

### Variables de Entorno de Producción
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://tu-dominio.com"
NEXTAUTH_SECRET="secret-muy-seguro"
```

## 🔧 Mantenimiento

### Comandos Útiles
```bash
# Verificar estado de la base de datos
npx prisma db pull

# Generar nuevo cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate deploy

# Ver datos en la base de datos
npx prisma studio
```

### Logs y Monitoreo
- **Vercel Analytics** para métricas
- **Logs del servidor** para debugging
- **Prisma Studio** para gestión de datos

## 📞 Soporte

Para soporte técnico o preguntas sobre el panel de administración:

1. Revisa la documentación de Next.js
2. Consulta la documentación de Prisma
3. Verifica los logs del servidor
4. Contacta al equipo de desarrollo

---

**Desarrollado con ❤️ para GlobalXpress**
