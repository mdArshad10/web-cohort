/*
  Warnings:

  - You are about to drop the column `passwordRest` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `refreshTokenExpire` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "passwordRest",
DROP COLUMN "refreshToken",
DROP COLUMN "refreshTokenExpire",
ADD COLUMN     "restPasswordToken" TEXT,
ADD COLUMN     "restPasswordTokenExpire" TIMESTAMP(3),
ADD COLUMN     "verifyToken" TEXT;
