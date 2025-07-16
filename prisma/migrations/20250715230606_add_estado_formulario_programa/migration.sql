-- CreateEnum
CREATE TYPE "EstadoFormularioPrograma" AS ENUM ('RECIBIDO', 'EN_REVISION', 'EN_PROCESO', 'APROBADO', 'RECHAZADO', 'FALTAN_DOCUMENTOS', 'CONTACTADO', 'COMPLETADO');

-- AlterTable
ALTER TABLE "FormularioPrograma" ADD COLUMN     "estado" "EstadoFormularioPrograma" NOT NULL DEFAULT 'RECIBIDO';
