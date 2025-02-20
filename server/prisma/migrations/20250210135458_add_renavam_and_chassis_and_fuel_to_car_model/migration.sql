/*
  Warnings:

  - Added the required column `chassis` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuel` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `renavam` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "chassis" TEXT NOT NULL,
ADD COLUMN     "fuel" TEXT NOT NULL,
ADD COLUMN     "renavam" INTEGER NOT NULL;
