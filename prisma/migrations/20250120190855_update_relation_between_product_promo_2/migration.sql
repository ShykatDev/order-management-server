-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_promotion_id_fkey";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_promotion_id_fkey" FOREIGN KEY ("promotion_id") REFERENCES "Promotion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
