CREATE TABLE `bot` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`userId` text,
	`userEmail` text,
	`urlSlug` text,
	`ctaRedirect` text,
	`ctaRedirectUrl` text,
	`googleSearch` text,
	`frequency` integer,
	`tone` text NOT NULL,
	`imgGpt` text,
	`wantCoverImg` integer DEFAULT (cast (0 as int)),
	`length` text,
	`type` text,
	`task` text,
	`topic` text,
	`lang` text,
	`skill` text,
	`hasAccess` integer,
	`turnOn` integer
);
--> statement-breakpoint
CREATE INDEX `id_idx` ON `bot` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `url_slug_idx` ON `bot` (`urlSlug`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `bot` (`userId`);--> statement-breakpoint
CREATE INDEX `user_email_idx` ON `bot` (`userEmail`);