-- Create a database
CREATE DATABASE IF NOT EXISTS RUhungry;

-- Use the mydatabase database
USE RUhungry;

-- Create a table named User if it does not already exist
CREATE TABLE IF NOT EXISTS User (
  user_id INT NOT NULL AUTO_INCREMENT, -- User ID, used as the primary key and auto-incremented
  name VARCHAR(30) NOT NULL, -- User's name
  username VARCHAR(30) NOT NULL, -- User's username, unique index
  password VARCHAR(255) NOT NULL, -- User's password
  email VARCHAR(255) NOT NULL, -- User's email address, unique index
  -- token VARCHAR(255) DEFAULT NULL, -- User's token, can be NULL
  user_pics TEXT NOT NULL,
  is_online BOOLEAN NOT NULL DEFAULT 0, -- Whether the user is online, stored as BOOLEAN type, default is 0 (not online)
  user_type VARCHAR(5) DEFAULT "User",

  addr_phone VARCHAR(20), -- Phone number
  addr_name VARCHAR(30), -- Recipient's name
  addr_address VARCHAR(255), -- Address line 1

  PRIMARY KEY (user_id), -- Set user_id column as the primary key
  UNIQUE KEY (username), -- Set username column as a unique index
  UNIQUE KEY (email) -- Set email column as a unique index
);

-- Create a table named Product if it does not already exist
CREATE TABLE IF NOT EXISTS Product (
  product_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_pic TEXT NOT NULL,
  product_price DECIMAL(10, 2) NOT NULL,
  product_description TEXT NOT NULL,
  product_is_stock BOOLEAN NOT NULL,
  product_type VARCHAR(50) NOT NULL,
  product_reminder TEXT,
  PRIMARY KEY (product_id),
  UNIQUE KEY (product_id),
  FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE
);

-- Create a table named Order if it does not already exist
CREATE TABLE IF NOT EXISTS OrderRepo (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `order_content` TEXT NOT NULL,
  `recipient_address` VARCHAR(255) NOT NULL,
  `recipient_phone` VARCHAR(20) NOT NULL,
  `recipient_name` VARCHAR(50) NOT NULL,
  `order_price` DECIMAL(10, 2) NOT NULL,
  `order_status` ENUM('PaymentWaiting', 'Received', 'Order Rejected', 'Cooking', 'Delivering', 'Delivered', 'Refunding', 'Refunded', 'Refund Rejected') NOT NULL,
  PRIMARY KEY (`order_id`),
  UNIQUE KEY (`order_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE
);

-- Insert a new row of data into the User table
INSERT INTO User (name, username, password, email, user_pics, user_type) 
VALUES ('XINLEI', 'R U Hungry', 'c1f22ea5c67759fe6f6d565307f87083', 'matthewzxl@outlook.com', "https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/userIcon/elem.jpeg", "Shop"), 
    ('XINLEI', 'W220026', 'c1f22ea5c67759fe6f6d565307f87083', 'W220026@outlook.com', "https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/userIcon/elem.jpeg", "User"),
    ('XINLEI', 'W220027', 'c1f22ea5c67759fe6f6d565307f87083', 'W220027@outlook.com', "https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/userIcon/elem.jpeg", "User"),
    ('XINLEI', 'W220028', 'c1f22ea5c67759fe6f6d565307f87083', 'W220028@outlook.com', "https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/userIcon/elem.jpeg", "User"),
    ('XINLEI', 'W220029', 'c1f22ea5c67759fe6f6d565307f87083', 'W220029@outlook.com', "https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/userIcon/elem.jpeg", "User");

INSERT INTO Product (user_id, product_pic, product_price, product_description, product_is_stock, product_type, product_reminder)
VALUES
    (1, 'https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/dish/SpicyIndiaCurry.jpeg', 10.99, 'Spicy Indian Curry', true, 'Indian Cuisine', 'Vegetarian-friendly, Gluten-free, No nuts, No dairy, No shellfish, No soy'),
    (1, 'https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/dish/ChineseFriedRice.jpeg', 8.99, 'Chinese Fried Rice', true, 'Chinese Cuisine', 'Vegetarian-friendly, Contains eggs, No nuts, No dairy, No shellfish, No soy'),
    (1, 'https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/dish/ButterChicken.jpeg', 12.99, 'Butter Chicken',false, 'Indian Cuisine', 'Gluten-free, No nuts, No shellfish, No soy'),
    (1, 'https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/dish/KungPaoChicken.jpeg', 6.99, 'Kung Pao Chicken', true, 'Chinese Cuisine', 'Contains peanuts, No dairy, No shellfish'),
    (1, 'https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/dish/TandooriChicken.jpeg', 9.99, 'Tandoori Chicken', true, 'Indian Cuisine', 'No gluten, No nuts, No shellfish, No soy'),
    (1, 'https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/dish/BeefNoodleSoup.jpeg', 7.99, 'Beef Noodle Soup', false, 'Chinese Cuisine', 'No nuts, No dairy, No shellfish, No soy'),
    (1, 'https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/dish/PalakPanner.jpeg', 11.99, 'Palak Paneer', true, 'Indian Cuisine', 'Vegetarian-friendly, Gluten-free, No nuts, No dairy, No shellfish, No soy'),
    (1, 'https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/dish/HotAndSourSoup.jpeg', 5.99, 'Hot and Sour Soup', true, 'Chinese Cuisine', 'Vegetarian-friendly, No nuts, No dairy, No shellfish, No soy'),
    (1, 'https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/dish/Samosa.jpeg', 13.99, 'Samosa', false, 'Indian Cuisine', 'Vegetarian-friendly, No gluten, No nuts, No shellfish, No soy'),
    (1, 'https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/dish/SichuanPork.jpeg', 9.99, 'Sichuan Pork', true, 'Chinese Cuisine', 'No gluten, Contains peanuts, No dairy, No shellfish'),
    (1, 'https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/dish/TomYumSoup.jpeg', 12.99, 'Tom Yum Soup', true, 'Thai Cuisine', 'Spicy, Contains shrimp'),
    (1, 'https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/dish/PadThai.jpeg', 15.99, 'Pad Thai', true, 'Thai Cuisine', 'Contains peanuts'),
    (1, 'https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/dish/GreenCurry.jpeg', 10.99, 'Green Curry', false, 'Thai Cuisine', 'Spicy, Contains chicken and coconut milk'),
    (1, 'https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/dish/ChocolateCake.jpeg', 8.99, 'Chocolate Cake', true, 'Dessert', 'Contains nuts and sugar'),
    (1, 'https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/dish/FruitTart.jpeg', 6.99, 'Fruit Tart', true, 'Dessert', 'Contains dairy and sugar'),
    (1, 'https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/dish/MachaLatte.jpeg', 2.99, 'Matcha Latte', true, 'Drink', 'Contains caffeine and dairy'), 
    (1, 'https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/dish/IcedKopi.jpeg', 3.99, 'Iced Coffee', false, 'Drink', 'Contains caffeine'), 
    (1, 'https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/dish/ThaiTea.jpeg', 2.99, 'Thai Iced Tea', true, 'Drink', 'Contains dairy and sugar'), 
    (1, 'https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/dish/StrawSmoo.jpeg', 3.99, 'Strawberry Smoothie', true, 'Drink', 'Contains dairy and sugar'), 
    (1, 'https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/dish/MangoLassi.jpeg', 4.99, 'Mango Lassi', true, 'Drink', 'Contains dairy and sugar');

INSERT INTO `OrderRepo` (`user_id`, `create_time`, `order_content`, `recipient_address`, `recipient_phone`, `recipient_name`, `order_price`, `order_status`)
VALUES
(2, '2022-01-01 12:00:00', '{"Coke": 1, "Sichuan Chicken": 3}', '123 Main Street, Singapore', '+65 12345678', 'John Doe', 38.55, 'Delivering'),
(5, '2022-02-03 14:30:00', '{"Coke": 1, "Sichuan Chicken": 3}', '456 Orchard Road, Singapore', '+65 23456789', 'Jane Smith', 30.20, 'Received'),
(3, '2022-03-05 19:45:00', '{"Coke": 1, "Sichuan Chicken": 3}', '789 Fifth Avenue, Singapore', '+65 34567890', 'Mike Lee', 34.80, 'Order Rejected'),
(4, '2022-04-07 10:15:00', '{"Coke": 1, "Sichuan Chicken": 3}', '1010 East Coast Road, Singapore', '+65 45678901', 'Anna Tan', 39.90, 'Cooking'),
(2, '2022-05-09 21:00:00', '{"Coke": 1, "Sichuan Chicken": 3}', '222 Bishan Street, Singapore', '+65 56789012', 'Peter Lim', 31.75, 'Delivered'),
(5, '2022-06-11 13:20:00', '{"Coke": 1, "Sichuan Chicken": 3}', '333 Jurong West Street, Singapore', '+65 67890123', 'Sarah Tan', 37.00, 'Refunding'),
(4, '2022-07-13 18:30:00', '{"Coke": 1, "Sichuan Chicken": 3}', '444 Yishun Avenue, Singapore', '+65 78901234', 'David Wong', 32.90, 'Refunded'),
(3, '2022-08-15 11:45:00', '{"Coke": 1, "Sichuan Chicken": 3}', '555 Serangoon Road, Singapore', '+65 89012345', 'Emily Ng', 36.60, 'Refund Rejected'),
(2, '2022-09-17 16:10:00', '{"Coke": 1, "Sichuan Chicken": 3}', '666 Woodlands Drive, Singapore', '+65 90123456', 'Tom Tan', 31.10, 'Delivering'),
(2, '2022-10-19 20:25:00', '{"Coke": 1, "Sichuan Chicken": 3}', '777 Bukit Timah Road, Singapore', '+65 01234567', 'Alice Lee', 38.90, 'Received'),
(3, '2022-11-21 09:55:00', '{"Coke": 1, "Sichuan Chicken": 3}', '888 Pasir Ris Drive, Singapore', '+65 12345678', 'Jason Lim', 34.25, 'Order Rejected'),
(2, '2022-03-01 12:00:00', '{"Coke": 1, "Sichuan Chicken": 3}', '1 Scotts Rd, Singapore 228208', '+65 9234 5678', 'John', 38.50, 'Received'),
(3, '2022-03-02 15:30:00', '{"Coke": 1, "Sichuan Chicken": 3}', '583 Orchard Rd, Singapore 238884', '+65 9123 4567', 'Amy', 31.20, 'Order Rejected'),
(4, '2022-03-03 11:10:00', '{"Coke": 1, "Sichuan Chicken": 3}', '2 Orchard Turn, Singapore 238801', '+65 9812 3456', 'Peter', 34.90, 'Cooking'),
(5, '2022-03-04 16:20:00', '{"Coke": 1, "Sichuan Chicken": 3}', '391A Orchard Rd, Singapore 238873', '+65 9876 5432', 'Linda', 32.70, 'Delivering'),
(2, '2022-03-05 08:45:00', '{"Coke": 1, "Sichuan Chicken": 3}', '391 Orchard Rd, Singapore 238873', '+65 9123 7890', 'Tom', 36.60, 'Delivered'),
(3, '2022-03-06 13:55:00', '{"Coke": 1, "Sichuan Chicken": 3}', '68 Orchard Rd, Singapore 238839', '+65 9234 5678', 'Jane', 30.40, 'Refunding'),
(4, '2022-03-07 10:25:00', '{"Coke": 1, "Sichuan Chicken": 3}', '1 Harbourfront Walk, Singapore 098585', '+65 9812 3456', 'Bob', 39.20, 'Refunded'),
(5, '2022-03-08 17:40:00', '{"Coke": 1, "Sichuan Chicken": 3}', '1 Raffles Pl, Singapore 048616', '+65 9876 5432', 'Sarah', 31.80, 'Refund Rejected'),
(2, '2022-03-09 09:50:00', '{"Coke": 1, "Sichuan Chicken": 3}', '50 Jurong Gateway Rd, Singapore 608549', '+65 9123 7890', 'Jack', 38.10, 'Received'),
(2, '2022-03-10 14:15:00', '{"Coke": 1, "Sichuan Chicken": 3}', '23 Serangoon Central, Singapore 556083', '+65 9234 5678', 'Lucy', 31.70, 'Order Rejected')