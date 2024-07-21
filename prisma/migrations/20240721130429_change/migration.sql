/*
  Warnings:

  - A unique constraint covering the columns `[UUID]` on the table `Stages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Stages_UUID_key" ON "Stages"("UUID");
