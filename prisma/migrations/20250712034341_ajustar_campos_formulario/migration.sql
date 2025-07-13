/*
  Warnings:

  - You are about to drop the column `ano_graduacion` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `anos_experiencia` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `certificaciones` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `codigo_postal` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `estado_civil` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `experiencia_laboral` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_nacimiento` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `genero` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `habilidades` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `idiomas` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `institucion` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `nacionalidad` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `nivel_educacion` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `nivel_ingles` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - Added the required column `aceptaComunicaciones` to the `PostulacionTrabajo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aceptaDatos` to the `PostulacionTrabajo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aceptaTerminos` to the `PostulacionTrabajo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `antecedentesMigratorios` to the `PostulacionTrabajo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `arrestado` to the `PostulacionTrabajo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `confirmaRecursos` to the `PostulacionTrabajo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conoceEEUU` to the `PostulacionTrabajo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quiereFinanciamiento` to the `PostulacionTrabajo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saldoMinimo` to the `PostulacionTrabajo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trabajoSinAutorizacion` to the `PostulacionTrabajo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visa` to the `PostulacionTrabajo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PostulacionTrabajo" DROP COLUMN "ano_graduacion",
DROP COLUMN "anos_experiencia",
DROP COLUMN "certificaciones",
DROP COLUMN "codigo_postal",
DROP COLUMN "estado",
DROP COLUMN "estado_civil",
DROP COLUMN "experiencia_laboral",
DROP COLUMN "fecha_nacimiento",
DROP COLUMN "genero",
DROP COLUMN "habilidades",
DROP COLUMN "idiomas",
DROP COLUMN "institucion",
DROP COLUMN "nacionalidad",
DROP COLUMN "nivel_educacion",
DROP COLUMN "nivel_ingles",
DROP COLUMN "titulo",
ADD COLUMN     "aceptaComunicaciones" TEXT NOT NULL,
ADD COLUMN     "aceptaDatos" TEXT NOT NULL,
ADD COLUMN     "aceptaTerminos" TEXT NOT NULL,
ADD COLUMN     "antecedentesMigratorios" TEXT NOT NULL,
ADD COLUMN     "arrestado" TEXT NOT NULL,
ADD COLUMN     "confirmaRecursos" TEXT NOT NULL,
ADD COLUMN     "conoceEEUU" TEXT NOT NULL,
ADD COLUMN     "quiereFinanciamiento" TEXT NOT NULL,
ADD COLUMN     "saldoMinimo" TEXT NOT NULL,
ADD COLUMN     "trabajoSinAutorizacion" TEXT NOT NULL,
ADD COLUMN     "visa" TEXT NOT NULL;
