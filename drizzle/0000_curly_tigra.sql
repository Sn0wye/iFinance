CREATE TABLE `transactions` (
	`id` varchar(36) PRIMARY KEY NOT NULL DEFAULT 'cljri4ygf0000gnwy7wa8hex8',
	`userId` varchar(36),
	`description` text,
	`transactionType` enum('INCOME','EXPENSE'),
	`category` varchar(255),
	`amount` float,
	`createdAt` datetime DEFAULT '2023-07-06 18:49:21.520');
--> statement-breakpoint
CREATE INDEX `userIdIndex` ON `transactions` (`userId`);