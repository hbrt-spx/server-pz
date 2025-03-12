/*
  Warnings:

  - The values [EM_PROGESSO] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `criadorId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `dataAtualizacao` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `dataCriacao` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `projetoId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `responsavelId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `Task` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('PENDENTE', 'EM_PROGRESSO', 'CONCLUIDA');
ALTER TABLE "Task" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_criadorId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_projetoId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_responsavelId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "criadorId",
ADD COLUMN     "creatorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "dataAtualizacao",
DROP COLUMN "dataCriacao",
DROP COLUMN "descricao",
DROP COLUMN "projetoId",
DROP COLUMN "responsavelId",
DROP COLUMN "titulo",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "projectId" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "_ProjectMember" ADD CONSTRAINT "_ProjectMember_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ProjectMember_AB_unique";

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
