-- CreateEnum
CREATE TYPE "EstadoVisa" AS ENUM ('SI', 'NO');

-- CreateEnum
CREATE TYPE "ProgramaTipo" AS ENUM ('EB5', 'E2', 'SKY_MASTERS', 'EB2_NIW', 'GLOBAL_ACADEMIC', 'DUAL_PLACEMENT');

-- CreateTable
CREATE TABLE "FormularioPrograma" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "visa" "EstadoVisa" NOT NULL,
    "mensaje" TEXT,
    "terminos" BOOLEAN NOT NULL,
    "programa" "ProgramaTipo" NOT NULL,
    "fechaEnvio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FormularioPrograma_pkey" PRIMARY KEY ("id")
);
