-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);
