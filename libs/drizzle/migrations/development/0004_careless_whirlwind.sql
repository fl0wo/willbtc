ALTER TABLE bot ADD `created_at` integer DEFAULT (cast (unixepoch () as int));--> statement-breakpoint
ALTER TABLE bot ADD `updated_at` integer DEFAULT (cast (unixepoch () as int));