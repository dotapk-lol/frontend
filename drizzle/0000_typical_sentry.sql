CREATE TABLE `p2p_rooms` (
	`code` text PRIMARY KEY NOT NULL,
	`host_hash` text NOT NULL,
	`guest_hash` text,
	`offer` text NOT NULL,
	`answer` text,
	`version` text NOT NULL,
	`policy` text NOT NULL,
	`created` integer NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `p2p_rooms_expires_idx` ON `p2p_rooms` (`expires`);