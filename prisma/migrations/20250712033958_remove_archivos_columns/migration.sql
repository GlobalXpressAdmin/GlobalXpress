/*
  Warnings:

  - You are about to drop the column `certificados_nombre` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `certificados_url` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `cv_nombre` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `cv_url` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `foto_nombre` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `foto_url` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `pasaporte_nombre` on the `PostulacionTrabajo` table. All the data in the column will be lost.
  - You are about to drop the column `pasaporte_url` on the `PostulacionTrabajo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PostulacionTrabajo" DROP COLUMN "certificados_nombre",
DROP COLUMN "certificados_url",
DROP COLUMN "cv_nombre",
DROP COLUMN "cv_url",
DROP COLUMN "foto_nombre",
DROP COLUMN "foto_url",
DROP COLUMN "pasaporte_nombre",
DROP COLUMN "pasaporte_url";
