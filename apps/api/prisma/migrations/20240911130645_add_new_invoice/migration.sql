/*
  Warnings:

  - You are about to drop the column `paymentDue` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoiceitem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `invoiceitem` DROP FOREIGN KEY `InvoiceItem_invoiceId_fkey`;

-- DropForeignKey
ALTER TABLE `invoiceitem` DROP FOREIGN KEY `InvoiceItem_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_categoryId_fkey`;

-- AlterTable
ALTER TABLE `invoice` DROP COLUMN `paymentDue`,
    DROP COLUMN `status`,
    ADD COLUMN `balanceDue` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `billToAddress` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `billToEmail` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `billToFax` VARCHAR(191) NULL,
    ADD COLUMN `billToMobile` VARCHAR(191) NULL,
    ADD COLUMN `billToName` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `billToPhone` VARCHAR(191) NULL,
    ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `fromAddress` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `fromBusinessNumber` VARCHAR(191) NULL,
    ADD COLUMN `fromEmail` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `fromName` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `fromPhone` VARCHAR(191) NULL,
    ADD COLUMN `notes` VARCHAR(191) NULL,
    ADD COLUMN `subtotal` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `terms` VARCHAR(191) NULL,
    MODIFY `totalAmount` DOUBLE NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `category`;

-- DropTable
DROP TABLE `invoiceitem`;

-- DropTable
DROP TABLE `product`;
