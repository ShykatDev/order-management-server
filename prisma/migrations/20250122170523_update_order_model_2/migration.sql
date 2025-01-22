/*
  Warnings:

  - You are about to drop the column `order_id` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_order_id_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "order_id";

-- CreateTable
CREATE TABLE "_OrdersToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_OrdersToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_OrdersToProduct_B_index" ON "_OrdersToProduct"("B");

-- AddForeignKey
ALTER TABLE "_OrdersToProduct" ADD CONSTRAINT "_OrdersToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrdersToProduct" ADD CONSTRAINT "_OrdersToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
