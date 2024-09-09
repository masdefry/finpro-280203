-- AlterTable
ALTER TABLE `user` ADD COLUMN `emailVerifyToken` VARCHAR(191) NULL,
    ADD COLUMN `isEmailVerified` BOOLEAN NOT NULL DEFAULT false;
