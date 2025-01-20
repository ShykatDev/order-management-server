/*
  Warnings:

  - You are about to drop the column `is_enable` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "is_enable",
ADD COLUMN     "is_enabled" BOOLEAN NOT NULL DEFAULT true;
