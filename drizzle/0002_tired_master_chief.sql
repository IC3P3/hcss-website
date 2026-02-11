PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_Media` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`titel` text NOT NULL,
	`description` text,
	`slug` text,
	`path` text NOT NULL,
	`role` integer DEFAULT 0,
	`eventId` integer,
	FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_Media`("id", "titel", "description", "slug", "path", "role", "eventId") SELECT "id", "titel", "description", "slug", "path", "role", "eventId" FROM `Media`;--> statement-breakpoint
DROP TABLE `Media`;--> statement-breakpoint
ALTER TABLE `__new_Media` RENAME TO `Media`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `Media_slug_unique` ON `Media` (`slug`);