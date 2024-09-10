/*
  Warnings:

  - You are about to drop the column `price` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "price",
ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'No category',
ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'No description',
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;
