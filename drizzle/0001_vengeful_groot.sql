CREATE TABLE `lesson_bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`student_name` varchar(255) NOT NULL,
	`student_email` varchar(320) NOT NULL,
	`teacher_name` varchar(255) NOT NULL,
	`duration` int NOT NULL,
	`status` enum('pending','confirmed','cancelled') NOT NULL DEFAULT 'pending',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lesson_bookings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `practice_room_bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`student_name` varchar(255) NOT NULL,
	`student_email` varchar(320) NOT NULL,
	`room_type` varchar(100) NOT NULL,
	`hours` int NOT NULL,
	`status` enum('pending','confirmed','cancelled') NOT NULL DEFAULT 'pending',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `practice_room_bookings_id` PRIMARY KEY(`id`)
);
