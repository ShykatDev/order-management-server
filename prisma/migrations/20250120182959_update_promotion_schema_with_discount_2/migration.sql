/*
  Warnings:

  - You are about to drop the column `discout_type` on the `Promotion` table. All the data in the column will be lost.
  - Added the required column `discount_type` to the `Promotion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Promotion" DROP COLUMN "discout_type",
ADD COLUMN     "discount_type" TEXT NOT NULL;
