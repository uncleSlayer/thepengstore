/*
  Warnings:

  - The values [SAMBALPURIPATA,SAMBALPURISAREE] on the enum `ProductCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProductCategory_new" AS ENUM ('CONSTRUCTION', 'INDUSTRIAL', 'FURNITURE', 'GIFTS', 'TELEVISION', 'HEALTH', 'ELECTRICALEQUIPS');
ALTER TABLE "Products" ALTER COLUMN "category" TYPE "ProductCategory_new" USING ("category"::text::"ProductCategory_new");
ALTER TYPE "ProductCategory" RENAME TO "ProductCategory_old";
ALTER TYPE "ProductCategory_new" RENAME TO "ProductCategory";
DROP TYPE "ProductCategory_old";
COMMIT;
