-- CreateEnum
CREATE TYPE "NotificacionTipo" AS ENUM ('POSTULACION_ESTADO', 'FORMULARIO_PROGRAMA_ESTADO', 'RESPUESTA_SOPORTE', 'RECORDATORIO_PERFIL', 'RECORDATORIO_DOCUMENTO', 'ADMINISTRATIVA', 'PAGO');

-- CreateTable
CREATE TABLE "Notificacion" (
    "id" TEXT NOT NULL,
    "usuario_id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "leida" BOOLEAN NOT NULL DEFAULT false,
    "tipo" "NotificacionTipo" NOT NULL,
    "creada_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "referencia" TEXT,

    CONSTRAINT "Notificacion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notificacion" ADD CONSTRAINT "Notificacion_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios_global"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
