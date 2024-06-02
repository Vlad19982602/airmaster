-- CreateTable
CREATE TABLE "Calculation" (
    "id" SERIAL NOT NULL,
    "question1" TEXT NOT NULL,
    "question2" TEXT NOT NULL,
    "question3" TEXT NOT NULL,
    "question4" TEXT NOT NULL,
    "question5" TEXT NOT NULL,

    CONSTRAINT "Calculation_pkey" PRIMARY KEY ("id")
);
