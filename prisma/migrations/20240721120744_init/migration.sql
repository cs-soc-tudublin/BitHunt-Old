-- CreateTable
CREATE TABLE "Players" (
    "ID" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "StudentID" TEXT NOT NULL,
    "Privacy" BOOLEAN NOT NULL,
    "Event" TEXT NOT NULL,
    "Score" INTEGER NOT NULL,
    "Target" TEXT NOT NULL,
    "CompletedStages" TEXT NOT NULL,
    "FinishedEvent" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Players_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Stages" (
    "ID" SERIAL NOT NULL,
    "Clue" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Event" TEXT NOT NULL,
    "UUID" TEXT NOT NULL,

    CONSTRAINT "Stages_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Puzzles" (
    "ID" SERIAL NOT NULL,
    "Event" TEXT NOT NULL,
    "Puzzle" TEXT NOT NULL,

    CONSTRAINT "Puzzles_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Completion" (
    "StudentID" TEXT NOT NULL,
    "Event" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Overall" (
    "Event" TEXT NOT NULL,
    "ParticipantCount" INTEGER NOT NULL,
    "StageCount" INTEGER NOT NULL,
    "PuzzleCount" INTEGER NOT NULL,
    "PrizeCount" INTEGER NOT NULL,
    "StagesComplete" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Events" (
    "ID" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Date" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Prize" TEXT NOT NULL,
    "PrizeCount" INTEGER NOT NULL,
    "Active" BOOLEAN NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Playerstages" (
    "PlayerStagesID" SERIAL NOT NULL,
    "StudentID" INTEGER NOT NULL,
    "Event" TEXT NOT NULL,
    "StageID" INTEGER NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Playerstages_pkey" PRIMARY KEY ("PlayerStagesID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Completion_StudentID_key" ON "Completion"("StudentID");

-- CreateIndex
CREATE UNIQUE INDEX "Completion_Event_key" ON "Completion"("Event");

-- CreateIndex
CREATE UNIQUE INDEX "Overall_Event_key" ON "Overall"("Event");

-- AddForeignKey
ALTER TABLE "Playerstages" ADD CONSTRAINT "Playerstages_StudentID_fkey" FOREIGN KEY ("StudentID") REFERENCES "Players"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Playerstages" ADD CONSTRAINT "Playerstages_StageID_fkey" FOREIGN KEY ("StageID") REFERENCES "Stages"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
