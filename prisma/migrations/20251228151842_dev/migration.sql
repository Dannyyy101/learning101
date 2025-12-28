-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_subjectId_fkey";

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
