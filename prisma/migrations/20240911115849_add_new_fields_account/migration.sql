/*
  Warnings:

  - You are about to drop the column `verifier` on the `Account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[verifier_address]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `verifier_address` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Account_verifier_idx";

-- DropIndex
DROP INDEX "Account_verifier_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "verifier",
ADD COLUMN     "country" TEXT,
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "got_airdropped" BOOLEAN,
ADD COLUMN     "last_name" TEXT,
ADD COLUMN     "subscriptions" TEXT[],
ADD COLUMN     "verifier_address" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_verifier_address_key" ON "Account"("verifier_address");

-- CreateIndex
CREATE INDEX "Account_verifier_address_idx" ON "Account"("verifier_address");
