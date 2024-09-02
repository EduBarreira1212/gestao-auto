/*
  Warnings:

  - A unique constraint covering the columns `[car_id]` on the table `Sell` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Sell" DROP CONSTRAINT "Sell_car_id_fkey";

-- DropForeignKey
ALTER TABLE "Sell" DROP CONSTRAINT "Sell_user_id_fkey";

-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "expenses" SET DEFAULT 0.00;

-- AlterTable
ALTER TABLE "Sell" ALTER COLUMN "profit" SET DEFAULT 0.0;

-- CreateIndex
CREATE INDEX "Car_user_id_idx" ON "Car"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Sell_car_id_key" ON "Sell"("car_id");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sell" ADD CONSTRAINT "Sell_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sell" ADD CONSTRAINT "Sell_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;
