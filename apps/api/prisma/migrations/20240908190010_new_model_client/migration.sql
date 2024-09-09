-- AlterTable
ALTER TABLE `client` ADD COLUMN `accountNumber` VARCHAR(191) NULL,
    ADD COLUMN `bankName` VARCHAR(191) NULL,
    ADD COLUMN `paymentMethod` VARCHAR(191) NULL;
