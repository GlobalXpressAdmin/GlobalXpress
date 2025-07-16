/*
  Warnings:

  - Added the required column `cargo` to the `PostulacionTrabajo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empresa` to the `PostulacionTrabajo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PostulacionTrabajo" ADD COLUMN     "cargo" TEXT NOT NULL,
ADD COLUMN     "descripcion" TEXT,
ADD COLUMN     "emailVacante" TEXT,
ADD COLUMN     "empresa" TEXT NOT NULL,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "salario" TEXT,
ADD COLUMN     "workers" TEXT;
