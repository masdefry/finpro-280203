-- AlterTable
ALTER TABLE `invoice` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `invoiceTitle` VARCHAR(191) NOT NULL DEFAULT 'Invoice';
