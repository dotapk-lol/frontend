CREATE TABLE `p2p_limits` (
	`bucket` integer PRIMARY KEY NOT NULL,
	`requests` integer NOT NULL,
	`creates` integer NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `p2p_limits_expires_idx` ON `p2p_limits` (`expires`);