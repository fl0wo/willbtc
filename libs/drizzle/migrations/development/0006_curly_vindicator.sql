ALTER TABLE bot ADD `alreadyTurnedOn` integer DEFAULT (cast (0 as int));--> statement-breakpoint
ALTER TABLE bot ADD `github` text;--> statement-breakpoint
ALTER TABLE user ADD `aws` text;