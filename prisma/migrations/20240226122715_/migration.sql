/*
  Warnings:

  - You are about to drop the column `fechatorneo` on the `Registro` table. All the data in the column will be lost.
  - Added the required column `fecharegistro` to the `Registro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Registro" DROP COLUMN "fechatorneo",
ADD COLUMN     "fecharegistro" TEXT NOT NULL;
