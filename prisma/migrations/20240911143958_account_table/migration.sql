-- CreateEnum
CREATE TYPE "RecordType" AS ENUM ('ADDRESS', 'TEXT');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "subname" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "RecordType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "verifier_address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "profile_image" TEXT,
    "username" TEXT,
    "subscriptions" TEXT[],
    "first_name" TEXT,
    "last_name" TEXT,
    "country" TEXT,
    "got_airdropped" BOOLEAN,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_subname_key" ON "User"("subname");

-- CreateIndex
CREATE UNIQUE INDEX "Record_key_value_userId_type_key" ON "Record"("key", "value", "userId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Account_address_key" ON "Account"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Account_verifier_address_key" ON "Account"("verifier_address");

-- CreateIndex
CREATE INDEX "Account_address_idx" ON "Account"("address");

-- CreateIndex
CREATE INDEX "Account_verifier_address_idx" ON "Account"("verifier_address");

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
