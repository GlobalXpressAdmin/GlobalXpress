-- CreateEnum
CREATE TYPE "EstadoPostulacion" AS ENUM ('PENDIENTE', 'EN_REVISION', 'APROBADA', 'RECHAZADA', 'EN_PROCESO');

-- CreateEnum
CREATE TYPE "ProgramaEmpleo" AS ENUM ('EB3', 'DUAL_PLACEMENT', 'SKY_MASTERS', 'GLOBAL_ACADEMIC');

-- CreateTable
CREATE TABLE "PostulacionTrabajo" (
    "id" UUID NOT NULL,
    "creado_en" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "fecha_nacimiento" DATE NOT NULL,
    "nacionalidad" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "estado_civil" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "codigo_postal" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "experiencia_laboral" TEXT NOT NULL,
    "anos_experiencia" TEXT NOT NULL,
    "habilidades" TEXT NOT NULL,
    "idiomas" TEXT NOT NULL,
    "nivel_ingles" TEXT NOT NULL,
    "nivel_educacion" TEXT NOT NULL,
    "titulo" TEXT,
    "institucion" TEXT,
    "ano_graduacion" TEXT,
    "certificaciones" TEXT,
    "cv_url" TEXT,
    "cv_nombre" TEXT,
    "cv_tamaño" INTEGER,
    "cv_tipo" TEXT,
    "pasaporte_url" TEXT,
    "pasaporte_nombre" TEXT,
    "pasaporte_tamaño" INTEGER,
    "pasaporte_tipo" TEXT,
    "foto_url" TEXT,
    "foto_nombre" TEXT,
    "foto_tamaño" INTEGER,
    "foto_tipo" TEXT,
    "certificados_url" TEXT,
    "certificados_nombre" TEXT,
    "certificados_tamaño" INTEGER,
    "certificados_tipo" TEXT,
    "consentimiento_datos" TEXT NOT NULL,
    "consentimiento_terminos" TEXT NOT NULL,
    "consentimiento_privacidad" TEXT NOT NULL,
    "consentimiento_comunicaciones" TEXT NOT NULL,
    "estado_postulacion" "EstadoPostulacion" NOT NULL DEFAULT 'PENDIENTE',
    "programa" "ProgramaEmpleo" NOT NULL,
    "notas_admin" TEXT,
    "usuario_id" UUID,

    CONSTRAINT "PostulacionTrabajo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostulacionTrabajo" ADD CONSTRAINT "PostulacionTrabajo_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios_global"("id") ON DELETE SET NULL ON UPDATE CASCADE;
