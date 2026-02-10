CREATE TABLE `Event` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`shortDescription` text,
	`description` text,
	`time` integer NOT NULL,
	`address` text NOT NULL,
	`songs` text,
	`participants` text
);
--> statement-breakpoint
CREATE TABLE `Media` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`titel` text NOT NULL,
	`description` text,
	`slug` text,
	`path` text NOT NULL,
	`displayed` integer NOT NULL,
	`role` integer,
	`eventId` integer,
	FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Media_slug_unique` ON `Media` (`slug`);--> statement-breakpoint
CREATE TABLE `PageContent` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text,
	`description` text,
	`subpageId` integer NOT NULL,
	`mediaId` integer,
	FOREIGN KEY (`subpageId`) REFERENCES `Subpage`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`mediaId`) REFERENCES `Media`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `Subpage` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `Session` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sessionKey` text NOT NULL,
	`lastSeen` integer NOT NULL,
	`userId` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Session_sessionKey_unique` ON `Session` (`sessionKey`);--> statement-breakpoint
CREATE TABLE `User` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`passwordHash` text NOT NULL
);
