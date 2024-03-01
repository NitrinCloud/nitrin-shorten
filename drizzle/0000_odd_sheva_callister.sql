CREATE TABLE `short_url` (
	`id` int AUTO_INCREMENT NOT NULL,
	`url` text NOT NULL,
	`slug` varchar(16) NOT NULL,
	CONSTRAINT `short_url_id` PRIMARY KEY(`id`),
	CONSTRAINT `short_url_slug_unique` UNIQUE(`slug`)
);
