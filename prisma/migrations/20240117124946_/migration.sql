/*
  Warnings:

  - A unique constraint covering the columns `[key,value,userId,type]` on the table `Record` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subname]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Record_key_value_userId_type_key" ON "Record"("key", "value", "userId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "User_subname_key" ON "User"("subname");
