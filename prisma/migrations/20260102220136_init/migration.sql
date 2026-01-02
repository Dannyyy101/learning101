/*
  Warnings:

  - Added the required column `color` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parentId` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "parentId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SubjectRelations" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,

    CONSTRAINT "SubjectRelations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectRelations" ADD CONSTRAINT "SubjectRelations_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectRelations" ADD CONSTRAINT "SubjectRelations_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
