CREATE TABLE `workflow_job` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text,
	`created_at` integer DEFAULT (cast (unixepoch () as int)),
	`updated_at` integer DEFAULT (cast (unixepoch () as int)),
	`repoName` text,
	`eventName` text,
	`botId` text,
	`conclusion` text,
	`started_at` integer,
	`completed_at` integer,
	FOREIGN KEY (`botId`) REFERENCES `bot`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `workflow_step` (
	`id` text PRIMARY KEY NOT NULL,
	`jobId` text,
	`name` text,
	`status` text,
	`conclusion` text,
	`number` integer,
	`started_at` integer,
	`completed_at` integer,
	FOREIGN KEY (`jobId`) REFERENCES `workflow_job`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `job_id_idx` ON `workflow_job` (`id`);--> statement-breakpoint
CREATE INDEX `job_bot_id_idx` ON `workflow_job` (`botId`);--> statement-breakpoint
CREATE INDEX `job_started_at_idx` ON `workflow_job` (`started_at`);--> statement-breakpoint
CREATE INDEX `step_id_idx` ON `workflow_step` (`id`);--> statement-breakpoint
CREATE INDEX `step_job_id_idx` ON `workflow_step` (`jobId`);--> statement-breakpoint
CREATE INDEX `step_started_at_idx` ON `workflow_step` (`started_at`);