-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('USUARIO', 'ADMIN', 'SUPER_ADMIN');

-- AlterTable
ALTER TABLE "usuarios_global" ADD COLUMN     "rol" "RolUsuario" NOT NULL DEFAULT 'USUARIO';
