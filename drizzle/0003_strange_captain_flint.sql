CREATE TABLE `blocked_time_slots` (
	`id` int AUTO_INCREMENT NOT NULL,
	`block_date` varchar(10) NOT NULL,
	`start_time` varchar(5) NOT NULL,
	`end_time` varchar(5) NOT NULL,
	`reason` text,
	`room_type` varchar(100),
	`created_by` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blocked_time_slots_id` PRIMARY KEY(`id`)
);
