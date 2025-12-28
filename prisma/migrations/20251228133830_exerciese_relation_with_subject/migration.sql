/*
  Warnings:

  - You are about to drop the column `content` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `solution` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Exercise` table. All the data in the column will be lost.
  - Added the required column `answer` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectId` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "content",
DROP COLUMN "description",
DROP COLUMN "solution",
DROP COLUMN "title",
ADD COLUMN     "answer" JSONB NOT NULL,
ADD COLUMN     "question" TEXT NOT NULL,
ADD COLUMN     "subjectId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
