-- AlterTable
ALTER TABLE "PostulacionTrabajo" ADD COLUMN     "vacante_id" UUID;

-- CreateTable
CREATE TABLE "Vacante" (
    "id" UUID NOT NULL,
    "creado_en" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "empresa" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "salario" TEXT,
    "descripcion" TEXT,
    "email" TEXT,
    "workers" TEXT,
    "link" TEXT,
    "activa" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Vacante_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostulacionTrabajo" ADD CONSTRAINT "PostulacionTrabajo_vacante_id_fkey" FOREIGN KEY ("vacante_id") REFERENCES "Vacante"("id") ON DELETE SET NULL ON UPDATE CASCADE;
