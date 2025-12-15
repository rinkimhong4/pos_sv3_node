-- Create Database First Before Import // pos_sv3
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 15, 2025 at 06:48 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pos_sv3`
--

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE `Category` (
  `CategoryID` int(11) NOT NULL,
  `CategoryName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Category`
--

INSERT INTO `Category` (`CategoryID`, `CategoryName`) VALUES
(5, 'BOOKS'),
(2, 'Clothing'),
(4, 'Clthees'),
(3, 'Computer'),
(1, 'Electronics'),
(6, 'Testing');

-- --------------------------------------------------------

--
-- Table structure for table `Order`
--

CREATE TABLE `Order` (
  `OrderID` int(11) NOT NULL,
  `OrderDate` date NOT NULL,
  `OrderNo` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Order`
--

INSERT INTO `Order` (`OrderID`, `OrderDate`, `OrderNo`, `UserID`) VALUES
(1, '2025-12-09', 1001, 2),
(12, '2025-12-14', 10001, 1),
(13, '2025-12-11', 10002, 2),
(14, '2025-12-12', 10003, 1),
(15, '2025-12-13', 10004, 1),
(16, '2025-12-14', 10005, 2),
(19, '2025-12-14', 10007, 1);

-- --------------------------------------------------------

--
-- Table structure for table `OrderDetail`
--

CREATE TABLE `OrderDetail` (
  `Odid` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `OrderID` int(11) NOT NULL,
  `Qty` int(11) NOT NULL,
  `Discount` decimal(5,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `OrderDetail`
--

INSERT INTO `OrderDetail` (`Odid`, `ProductID`, `OrderID`, `Qty`, `Discount`) VALUES
(1, 1, 1, 10, 29.00),
(2, 3, 1, 2, 0.00),
(3, 3, 1, 2, 5.00),
(4, 3, 1, 2, 5.00);

-- --------------------------------------------------------

--
-- Table structure for table `Product`
--

CREATE TABLE `Product` (
  `ProductID` int(11) NOT NULL,
  `ProductName` varchar(255) NOT NULL,
  `Qty` int(11) NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `ProductImage` varchar(500) NOT NULL,
  `Discount` decimal(5,2) DEFAULT 0.00,
  `CategoryID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Product`
--

INSERT INTO `Product` (`ProductID`, `ProductName`, `Qty`, `Price`, `ProductImage`, `Discount`, `CategoryID`) VALUES
(1, 'Dell Laptop', 10, 999.99, 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wc3xlbnwwfHwwfHx8MA%3D%3D', 10.00, 1),
(2, 'iPhone Smartphone', 20, 699.99, 'https://images.unsplash.com/photo-1592890288564-76628a30a657?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0', 0.00, 1),
(3, 'Cotton T-Shirt', 50, 19.99, 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dCUyMHNoaXJ0fGVufDB8fDB8fHww', 5.00, 2);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `status` varchar(20) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`UserID`, `Username`, `Password`, `status`) VALUES
(1, 'admin', 'admin123', 'active'),
(2, 'user1', 'user123', 'active'),
(3, 'user2', '$2b$10$nQxdQVAHlzvqimdRDoJRge399SnZ3WQPNqhxvA9AGwbaOsgjgSytW', 'active'),
(6, 'user4', '$2b$10$.yKuuRGz4CICgCUPhnB6i.wamdVv8/85vJJM7VJoVUWOH90mdUACW', 'active'),
(7, 'hong', '$2b$10$qaI01l7/aXI/g8Az0XxSu.PfgeHh6EDzIvSGuNeLaG0Eyo71Pf7RW', 'active'),
(10, 'hong1', '$2b$10$CFo5Iu8MEEXRnc5th3UvtuT/BzUeyBCW/PLoqfalE1wO3GI5aO7/G', 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`CategoryID`),
  ADD KEY `idx_category_name` (`CategoryName`);

--
-- Indexes for table `Order`
--
ALTER TABLE `Order`
  ADD PRIMARY KEY (`OrderID`),
  ADD UNIQUE KEY `OrderNo` (`OrderNo`),
  ADD KEY `idx_user_id` (`UserID`),
  ADD KEY `idx_order_date` (`OrderDate`);

--
-- Indexes for table `OrderDetail`
--
ALTER TABLE `OrderDetail`
  ADD PRIMARY KEY (`Odid`),
  ADD KEY `idx_order_id` (`OrderID`),
  ADD KEY `idx_product_id` (`ProductID`);

--
-- Indexes for table `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`ProductID`),
  ADD KEY `idx_category_id` (`CategoryID`),
  ADD KEY `idx_product_name` (`ProductName`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`UserID`),
  ADD KEY `idx_username` (`Username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Category`
--
ALTER TABLE `Category`
  MODIFY `CategoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Order`
--
ALTER TABLE `Order`
  MODIFY `OrderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `OrderDetail`
--
ALTER TABLE `OrderDetail`
  MODIFY `Odid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Product`
--
ALTER TABLE `Product`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Order`
--
ALTER TABLE `Order`
  ADD CONSTRAINT `fk_User_UserID_Order` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `OrderDetail`
--
ALTER TABLE `OrderDetail`
  ADD CONSTRAINT `fk_Order_OrderID_OrderDetail` FOREIGN KEY (`OrderID`) REFERENCES `Order` (`OrderID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Product_ProductID_OrderDetail` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Product`
--
ALTER TABLE `Product`
  ADD CONSTRAINT `fk_Product_CategoryID` FOREIGN KEY (`CategoryID`) REFERENCES `Category` (`CategoryID`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
