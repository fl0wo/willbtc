ALTER TABLE bot ADD `businessName` text;--> statement-breakpoint
CREATE UNIQUE INDEX `bot_urlSlug_unique` ON `bot` (`urlSlug`);