/*
  Warnings:

  - You are about to drop the column `imagesUrl` on the `Products` table. All the data in the column will be lost.
  - Added the required column `category` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('SAMBALPURIPATA', 'SAMBALPURISAREE');

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "imagesUrl",
ADD COLUMN     "category" "ProductCategory" NOT NULL;

-- CreateTable
CREATE TABLE "imagesUrl" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "productsId" INTEGER NOT NULL,

    CONSTRAINT "imagesUrl_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "imagesUrl_id_key" ON "imagesUrl"("id");

-- AddForeignKey
ALTER TABLE "imagesUrl" ADD CONSTRAINT "imagesUrl_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
