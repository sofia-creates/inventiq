/*
  Warnings:

  - You are about to drop the column `itemname` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "itemname",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Nameless';
