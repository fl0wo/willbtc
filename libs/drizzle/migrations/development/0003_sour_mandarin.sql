ALTER TABLE user ADD `priceId` text;--> statement-breakpoint
ALTER TABLE user ADD `hasAccess` integer DEFAULT (cast (0 as int));--> statement-breakpoint
CREATE INDEX `user_accounts_id_idx` ON `account` (`userId`);--> statement-breakpoint
CREATE INDEX `user_session_id_idx` ON `session` (`userId`);--> statement-breakpoint
CREATE UNIQUE INDEX `email_idx` ON `user` (`email`);--> statement-breakpoint
CREATE INDEX `user_pr_id_idx` ON `user` (`id`);