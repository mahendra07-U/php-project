-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 15, 2026 at 05:02 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stationery_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `user_id`, `product_id`, `quantity`, `added_at`) VALUES
(9, 6, 37, 1, '2026-08-27 15:32:23'),
(16, 9, 40, 1, '2026-09-04 07:22:46'),
(17, 1, 38, 5, '2026-09-10 03:41:11');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `category_image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `category_image_url`) VALUES
(1, 'All Stationery', 'uploads/1.jpg'),
(2, 'Pens', 'uploads/2.jpg'),
(3, 'Notebooks', 'uploads/3.jpg'),
(4, 'Planners', 'uploads/4.jpg'),
(5, 'Pencils', 'uploads/5.jpg'),
(6, 'Erasers', 'uploads/6.jpg'),
(7, 'Sharpeners', 'uploads/7.jpg'),
(8, 'Sticky Notes', 'uploads/8.jpg'),
(9, 'Memo Pads', 'uploads/9.jpg'),
(10, 'Colors', 'uploads/23.jpg'),
(11, 'Highlighters', 'uploads/11.jpg'),
(12, 'Rulers', 'uploads/12.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `delivery_address` text NOT NULL,
  `city` varchar(50) NOT NULL,
  `pincode` varchar(10) NOT NULL,
  `payment_method` varchar(50) DEFAULT 'Cash on Delivery',
  `order_date` date NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `order_status` enum('Pending','Delivered','Cancelled') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `customer_name`, `phone_number`, `delivery_address`, `city`, `pincode`, `payment_method`, `order_date`, `total_amount`, `order_status`) VALUES
(14, 4, 'mahendra', '8949839498', '91 sai krupa society', 'surat', '933933', 'Cash on Delivery', '2026-09-03', 110.00, ''),
(15, 9, 'priya', '9292992923', '67', 'navasari', '657878', 'Cash on Delivery', '2026-09-04', 60.00, '');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price_at_order_time` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`order_item_id`, `order_id`, `product_id`, `quantity`, `price_at_order_time`) VALUES
(6, 14, 37, 1, 50.00),
(7, 14, 39, 1, 60.00),
(8, 15, 39, 1, 60.00);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `product_name` varchar(200) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `product_image_url` varchar(255) DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `category_id`, `product_name`, `price`, `product_image_url`, `stock_quantity`) VALUES
(37, 1, 'Apsara Whiteners', 50.00, 'uploads/53.jpg', 100),
(38, 1, 'Camlin Water Color Tubes 12 Shades', 220.00, 'uploads/52.jpg', 50),
(39, 2, 'Doms  Blue Ball Pen Pack of 30', 60.00, 'uploads/13.jpg', 200),
(40, 5, 'Apsara Platinum Extra Dark Pencils Box of 10', 185.00, 'uploads/14.jpg', 150),
(41, 3, 'Apsara Notebook', 20.00, 'uploads/15.jpg', 500),
(42, 1, 'Doms Artist Acrylic Chocks Set of 12', 50.00, 'uploads/16.jpg', 100),
(43, 1, 'Kangaroo Paper Punching Machine', 220.00, 'uploads/44.jpg', 50),
(44, 1, 'Rubber Band pack 50', 60.00, 'uploads/17.jpg', 200),
(45, 3, 'Nataraj Notebooks Pack of 10', 185.00, 'uploads/18.jpg', 150),
(46, 1, 'Doms with others Small Stationery Pack', 20.00, 'uploads/19.jpg', 500),
(47, 1, 'Large Bond Glue Stick', 50.00, 'uploads/51.jpg', 100),
(48, 2, 'Doms Smooth Writer Pens with Ink', 220.00, 'uploads/50.jpg', 50),
(49, 1, 'Doms Ulimate Stationery Pack', 60.00, 'uploads/22.jpg', 200),
(50, 1, 'Water color Whiteout', 185.00, 'uploads/23.jpg', 150),
(51, 2, 'Fountain Pen', 20.00, 'uploads/24.jpg', 500),
(52, 5, 'Doms smooth Pensils pack of 10', 50.00, 'uploads/25.jpg', 100),
(53, 1, 'Kangaro Mini Stapler with Pins', 220.00, 'uploads/26.jpg', 50),
(54, 5, 'Mechanical Pencil', 60.00, 'uploads/27.jpg', 200),
(55, 11, 'Faber-Castell Textliner Highlighters Set of 5', 185.00, 'uploads/28.jpg', 150),
(56, 11, 'Luxor Whiteboard Marker Black & Blue', 20.00, 'uploads/29.jpg', 500),
(57, 1, 'Doms primium Colors', 50.00, 'uploads/30.jpg', 100),
(58, 12, 'Ruler 50cm', 220.00, 'uploads/47.jpg', 50),
(59, 1, 'Scissors', 60.00, 'uploads/48.jpg', 200),
(60, 8, 'Doms White Paper Notebooks set of 6', 185.00, 'uploads/33.jpg', 150),
(61, 3, 'Apsara A4 siza Notebook', 60.00, 'uploads/35.jpg', 200),
(62, 7, 'Apsara Long Point sharper pack of 20', 100.00, 'uploads/49.jpg', 120),
(63, 3, 'A4 Size White Copier Notepad 300 Pages', 90.00, 'uploads/36.jpg', 150),
(64, 5, 'Normal Pencils Box of 12', 120.00, 'uploads/5.jpg', 250),
(65, 2, 'Cello Gripper Blue Pen Pack of 5', 100.00, 'uploads/38.jpg', 150),
(66, 1, 'Craft Paper Clips 50 Clips', 150.00, 'uploads/39.jpg', 500),
(67, 2, 'THA Primium Pens Set of 3', 90.00, 'uploads/40.jpg', 150),
(68, 6, 'Apsara Erasers and staedtler', 20.00, 'uploads/6.jpg', 500),
(69, 1, 'Exam Transparent Pouch', 60.00, 'uploads/42.jpg', 200),
(70, 5, 'Doms Premium Pencil Box of 12', 185.00, 'uploads/43.jpg', 150),
(71, 6, 'Apsara Erasers', 20.00, 'uploads/21.webp', 500),
(72, 12, 'Three set of Scale', 100.00, 'uploads/46.jpg', 200),
(73, 3, 'Apsara Premium Notebook', 80.00, 'uploads/54.jpeg', 100);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Admin','Student','Staff') DEFAULT 'Student',
  `roll_no_emp_id` varchar(50) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `account_status` enum('Active','Inactive') DEFAULT 'Active',
  `joined_date` date NOT NULL,
  `profile_img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `full_name`, `email`, `password`, `role`, `roll_no_emp_id`, `phone_number`, `account_status`, `joined_date`, `profile_img`) VALUES
(1, 'admin_mahendra', 'Mahendra', 'admin@college.edu', '123admin', 'Admin', 'EMP-001', '+91 98765 43210', 'Active', '2026-08-25', 'uploads/1789011629_e3313acd-9ba4-4e16-9684-efe5cdd3992d.jpeg'),
(4, 'mahendra_mr', 'mahendra upadhyay', 'mahendra007@gmail.com', 'mahendra', 'Student', NULL, NULL, 'Active', '2026-08-26', NULL),
(6, 'somesh_mr_', 'somesh trivedi', 'trivedi12@gmail.com', 'somesh123', 'Student', '12', '2323232323', 'Active', '2026-08-27', 'uploads/1787844338_262de5e3ae79120699674228f557030e.jpg'),
(9, 'priya_singh', 'priya singh', 'priya123@gmail.com', 'priya', 'Student', 'BCA SEM -V 364', '9200293993', 'Active', '2026-09-04', 'uploads/1788506176_262de5e3ae79120699674228f557030e.jpg'),
(10, 'rohit_12', 'Rohit Vishwakarma', 'rohit@gmail.com', 'rohit123', 'Student', NULL, NULL, 'Active', '2026-09-10', NULL),
(11, 'ashish', 'ashish', 'ahish1234@gmail.com', '123', 'Student', NULL, NULL, 'Active', '2026-09-13', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
