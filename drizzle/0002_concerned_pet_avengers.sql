CREATE TABLE `events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`event_date` varchar(10) NOT NULL,
	`event_time` varchar(5),
	`venue` varchar(255),
	`event_type` enum('upcoming','past') NOT NULL,
	`image_url` text,
	`video_url` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `practice_room_calendar_bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`student_name` varchar(255) NOT NULL,
	`student_email` varchar(320) NOT NULL,
	`student_phone` varchar(20),
	`booking_date` varchar(10) NOT NULL,
	`start_time` varchar(5) NOT NULL,
	`end_time` varchar(5) NOT NULL,
	`duration_hours` int NOT NULL,
	`room_type` varchar(100) NOT NULL,
	`status` enum('pending','confirmed','cancelled') NOT NULL DEFAULT 'pending',
	`access_token` varchar(64) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `practice_room_calendar_bookings_id` PRIMARY KEY(`id`),
	CONSTRAINT `practice_room_calendar_bookings_access_token_unique` UNIQUE(`access_token`)
);
