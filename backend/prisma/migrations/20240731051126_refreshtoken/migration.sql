/*
  Warnings:

  - You are about to alter the column `username` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - Added the required column `refreshToken` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "refreshToken" TEXT NOT NULL,
ALTER COLUMN "username" SET DATA TYPE VARCHAR(32),
ALTER COLUMN "password" DROP NOT NULL;
