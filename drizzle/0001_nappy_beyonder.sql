ALTER TABLE `transactions` MODIFY COLUMN `id` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `transactions` MODIFY COLUMN `userId` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `transactions` MODIFY COLUMN `description` text NOT NULL;--> statement-breakpoint
ALTER TABLE `transactions` MODIFY COLUMN `transactionType` enum('INCOME','EXPENSE') NOT NULL;--> statement-breakpoint
ALTER TABLE `transactions` MODIFY COLUMN `category` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `transactions` MODIFY COLUMN `amount` float NOT NULL;--> statement-breakpoint
ALTER TABLE `transactions` MODIFY COLUMN `createdAt` datetime NOT NULL DEFAULT '2023-07-06 19:43:16.666';