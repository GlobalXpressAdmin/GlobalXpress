/*
  Warnings:

  - You are about to drop the column `ultimo_acceso` on the `usuarios_global` table. All the data in the column will be lost.
  - You are about to drop the column `ultimo_acceso_anterior` on the `usuarios_global` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "usuarios_global" DROP COLUMN "ultimo_acceso",
DROP COLUMN "ultimo_acceso_anterior";
