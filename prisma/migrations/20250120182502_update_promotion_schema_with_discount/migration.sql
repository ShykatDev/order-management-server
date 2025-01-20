/*
  Warnings:

  - Added the required column `discount_amount` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discout_type` to the `Promotion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Promotion" ADD COLUMN     "discount_amount" TEXT NOT NULL,
ADD COLUMN     "discout_type" TEXT NOT NULL;
