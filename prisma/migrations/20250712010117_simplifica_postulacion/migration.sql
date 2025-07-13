/*
  Warnings:

  - You are about to drop the column `certificados_tamaño` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `certificados_tipo` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `consentimiento_comunicaciones` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `consentimiento_datos` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `consentimiento_privacidad` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `consentimiento_terminos` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `cv_tamaño` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `cv_tipo` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `foto_tamaño` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `foto_tipo` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `pasaporte_tamaño` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `pasaporte_tipo` on the `PostulacionTrabajo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PostulacionTrabajo" DROP COLUMN "certificados_tamaño",
DROP COLUMN "certificados_tipo",
DROP COLUMN "consentimiento_comunicaciones",
DROP COLUMN "consentimiento_datos",
DROP COLUMN "consentimiento_privacidad",
DROP COLUMN "consentimiento_terminos",
DROP COLUMN "cv_tamaño",
DROP COLUMN "cv_tipo",
DROP COLUMN "foto_tamaño",
DROP COLUMN "foto_tipo",
DROP COLUMN "pasaporte_tamaño",
DROP COLUMN "pasaporte_tipo";
