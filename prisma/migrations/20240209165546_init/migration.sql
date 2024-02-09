/*
  Warnings:

  - You are about to drop the column `email` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apellidos` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cedula` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `celular` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ciudad` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `condicion` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `direccion` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaNacimiento` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genero` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombres` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pais` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Profile_email_key";

-- DropIndex
DROP INDEX "Profile_username_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "username",
ADD COLUMN     "apellidos" TEXT NOT NULL,
ADD COLUMN     "cedula" TEXT NOT NULL,
ADD COLUMN     "celular" TEXT NOT NULL,
ADD COLUMN     "ciudad" TEXT NOT NULL,
ADD COLUMN     "condicion" TEXT NOT NULL,
ADD COLUMN     "direccion" TEXT NOT NULL,
ADD COLUMN     "fechaNacimiento" TEXT NOT NULL,
ADD COLUMN     "genero" TEXT NOT NULL,
ADD COLUMN     "nombres" TEXT NOT NULL,
ADD COLUMN     "pais" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Torneo" (
    "id" SERIAL NOT NULL,
    "actividad" TEXT NOT NULL,
    "fechatorneo" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "pagado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "defaultAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Torneo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actividad" (
    "id" SERIAL NOT NULL,
    "actividad" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "defaultAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Actividad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horario" (
    "id" SERIAL NOT NULL,
    "horario" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "defaultAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Horario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registro" (
    "id" SERIAL NOT NULL,
    "fechatorneo" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "pagado" BOOLEAN NOT NULL DEFAULT false,
    "actividadId" INTEGER NOT NULL,
    "profileId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "defaultAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Registro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Registro_actividadId_key" ON "Registro"("actividadId");

-- CreateIndex
CREATE UNIQUE INDEX "Registro_profileId_key" ON "Registro"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registro" ADD CONSTRAINT "Registro_actividadId_fkey" FOREIGN KEY ("actividadId") REFERENCES "Actividad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registro" ADD CONSTRAINT "Registro_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
