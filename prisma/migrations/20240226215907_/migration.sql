/*
  Warnings:

  - You are about to drop the column `fechaTope` on the `Programacion` table. All the data in the column will be lost.
  - Added the required column `fechatope` to the `Programacion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Programacion" DROP COLUMN "fechaTope",
ADD COLUMN     "fechatope" TEXT NOT NULL;
