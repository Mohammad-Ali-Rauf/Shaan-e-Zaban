/*
  Warnings:

  - You are about to drop the column `learningUnitId` on the `UserProgress` table. All the data in the column will be lost.
  - You are about to drop the `Chapter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LearningUnit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lesson` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,storyId]` on the table `UserProgress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `storyId` to the `UserProgress` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StoryLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_courseId_fkey";

-- DropForeignKey
ALTER TABLE "LearningUnit" DROP CONSTRAINT "LearningUnit_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "UserProgress" DROP CONSTRAINT "UserProgress_learningUnitId_fkey";

-- DropIndex
DROP INDEX "UserProgress_userId_learningUnitId_key";

-- AlterTable
ALTER TABLE "UserProgress" DROP COLUMN "learningUnitId",
ADD COLUMN     "storyId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Chapter";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "LearningUnit";

-- DropTable
DROP TABLE "Lesson";

-- DropEnum
DROP TYPE "LearningType";

-- DropEnum
DROP TYPE "Level";

-- CreateTable
CREATE TABLE "Story" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "level" "StoryLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sentence" (
    "id" SERIAL NOT NULL,
    "urdu" TEXT NOT NULL,
    "english" TEXT NOT NULL,
    "audioUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "storyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sentence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProgress_userId_storyId_key" ON "UserProgress"("userId", "storyId");

-- AddForeignKey
ALTER TABLE "Sentence" ADD CONSTRAINT "Sentence_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProgress" ADD CONSTRAINT "UserProgress_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
