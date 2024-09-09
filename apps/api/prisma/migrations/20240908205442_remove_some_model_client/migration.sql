/*
  Warnings:

  - You are about to drop the column `accountNumber` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `bankName` on the `client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `client` DROP COLUMN `accountNumber`,
    DROP COLUMN `bankName`;
