-- CreateEnum
CREATE TYPE "EstadoComunicacion" AS ENUM ('PENDIENTE', 'RESPONDIDO', 'CERRADO');

-- CreateEnum
CREATE TYPE "RolAutor" AS ENUM ('USUARIO', 'ADMIN');

-- CreateTable
CREATE TABLE "Comunicacion" (
    "id" UUID NOT NULL,
    "creado_en" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMPTZ(6) NOT NULL,
    "usuario_id" UUID NOT NULL,
    "asunto" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "estado" "EstadoComunicacion" NOT NULL DEFAULT 'PENDIENTE',

    CONSTRAINT "Comunicacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RespuestaComunicacion" (
    "id" UUID NOT NULL,
    "creado_en" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comunicacion_id" UUID NOT NULL,
    "autor" "RolAutor" NOT NULL,
    "mensaje" TEXT NOT NULL,

    CONSTRAINT "RespuestaComunicacion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comunicacion" ADD CONSTRAINT "Comunicacion_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios_global"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RespuestaComunicacion" ADD CONSTRAINT "RespuestaComunicacion_comunicacion_id_fkey" FOREIGN KEY ("comunicacion_id") REFERENCES "Comunicacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
