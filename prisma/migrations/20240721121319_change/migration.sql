/*
  Warnings:

  - A unique constraint covering the columns `[StudentID]` on the table `Players` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Players_StudentID_key" ON "Players"("StudentID");
