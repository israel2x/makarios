/*
  Warnings:

  - Added the required column `fechaTope` to the `Programacion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Programacion" ADD COLUMN     "fechaTope" TEXT NOT NULL;
