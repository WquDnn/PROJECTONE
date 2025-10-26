-- Active: 1760876032584@@127.0.0.1@3306@mydb
CREATE TABLE `products`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `desc` TEXT NOT NULL,
    `image` TEXT NOT NULL
);
CREATE TABLE `comments`(
    `id` INT NOT NULL,
    `post_id` INT NOT NULL,
    `author` VARCHAR(255) NOT NULL,
    `comment` TEXT NOT NULL,
    PRIMARY KEY(`id`)
);
ALTER TABLE
    `comments` ADD CONSTRAINT `comments_post_id_foreign` FOREIGN KEY(`post_id`) REFERENCES `products`(`id`);