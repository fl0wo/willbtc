CREATE TABLE `account` (
	`userId` text NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`providerAccountId` text NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text,
	`scope` text,
	`id_token` text,
	`session_state` text,
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
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
	`turnOn` integer,
	`created_at` integer DEFAULT (cast (unixepoch () as int)),
	`updated_at` integer DEFAULT (cast (unixepoch () as int))
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text NOT NULL,
	`emailVerified` integer,
	`image` text,
	`customerId` text,
	`priceId` text,
	`hasAccess` integer DEFAULT (cast (0 as int))
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
--> statement-breakpoint
CREATE INDEX `user_accounts_id_idx` ON `account` (`userId`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `bot` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `url_slug_idx` ON `bot` (`urlSlug`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `bot` (`userId`);--> statement-breakpoint
CREATE INDEX `user_email_idx` ON `bot` (`userEmail`);--> statement-breakpoint
CREATE INDEX `user_session_id_idx` ON `session` (`userId`);--> statement-breakpoint
CREATE UNIQUE INDEX `email_idx` ON `user` (`email`);--> statement-breakpoint
CREATE INDEX `user_pr_id_idx` ON `user` (`id`);