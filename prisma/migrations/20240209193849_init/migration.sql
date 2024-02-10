/*
  Warnings:

  - You are about to drop the column `horario` on the `Registro` table. All the data in the column will be lost.
  - You are about to drop the `Torneo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[horarioId]` on the table `Registro` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `estado` to the `Actividad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horarioId` to the `Registro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Actividad" ADD COLUMN     "estado" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Horario" ADD COLUMN     "estado" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Registro" DROP COLUMN "horario",
ADD COLUMN     "horarioId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Torneo";

-- CreateIndex
CREATE UNIQUE INDEX "Registro_horarioId_key" ON "Registro"("horarioId");

-- AddForeignKey
ALTER TABLE "Registro" ADD CONSTRAINT "Registro_horarioId_fkey" FOREIGN KEY ("horarioId") REFERENCES "Horario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
