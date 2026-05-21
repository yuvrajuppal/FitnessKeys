-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2026 at 07:54 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fitnesskeys`
--

-- --------------------------------------------------------

--
-- Table structure for table `adminuser`
--

CREATE TABLE `adminuser` (
  `id` varchar(191) NOT NULL,
  `admin_username` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL DEFAULT 'admin',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `adminuser`
--

INSERT INTO `adminuser` (`id`, `admin_username`, `password`, `name`, `role`, `createdAt`, `updatedAt`) VALUES
('cmpdrcijc00004sjvhe00e6w8', 'any', '$2b$10$tuM5QwiEHAOCMw2lFNWtz.8NEHzdVG7XqwJeCjuAA8JoRB6KxRZly', 'any', 'Super', '2026-05-20 07:46:02.328', '2026-05-20 07:46:02.328');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `imageUrl` varchar(191) DEFAULT NULL,
  `Showindex` bigint(20) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `imageUrl`, `Showindex`, `createdAt`, `updatedAt`) VALUES
('cmpatc7dt00001ojvafr4f20z', 'Chest', 'uploads/1779085108558-104117863.png', 1, '2026-05-18 06:18:28.577', '2026-05-19 07:33:20.890'),
('cmpaurd3700011ojvzaehobpt', 'Triceps', 'uploads/1779087495422-720265460.png', 2, '2026-05-18 06:58:15.427', '2026-05-18 07:52:55.168'),
('cmpaurzv900021ojv1gjcyy7c', 'Shoulders', 'uploads/1779087524947-543931349.png', 3, '2026-05-18 06:58:44.949', '2026-05-19 07:33:25.916'),
('cmpaus9lf00031ojvmfwmys25', 'Back', 'uploads/1779087537552-695320517.png', 4, '2026-05-18 06:58:57.555', '2026-05-19 07:33:15.561'),
('cmpauslgb00041ojvx64r0w68', 'Biceps', 'uploads/1779087552920-622376080.png', 4, '2026-05-18 06:59:12.923', '2026-05-19 07:33:32.079'),
('cmpausxis00051ojvwdcqhwcg', 'Legs', 'uploads/1779087568560-514665894.png', 6, '2026-05-18 06:59:28.564', '2026-05-18 06:59:28.564'),
('cmpav2n2g00061ojvarjlc7ee', 'Abs', 'uploads/1779088021572-949178269.png', 7, '2026-05-18 07:07:01.576', '2026-05-18 07:07:15.931');

-- --------------------------------------------------------

--
-- Table structure for table `workout`
--

CREATE TABLE `workout` (
  `id` varchar(191) NOT NULL,
  `categoryId` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `videolink` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `imageUrl` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `workout`
--

INSERT INTO `workout` (`id`, `categoryId`, `name`, `videolink`, `createdAt`, `updatedAt`, `imageUrl`) VALUES
('cmpawc5xu0000p4jvaegftuf1', 'cmpatc7dt00001ojvafr4f20z', 'Dumbbell Bench Press', 'https://www.youtube.com/watch?v=dGqI0Z5ul4k&t=1s', '2026-05-18 07:42:25.554', '2026-05-18 07:42:25.554', 'uploads/1779090145544-379342936.png'),
('cmpawcvc50001p4jv4mn7s1jl', 'cmpatc7dt00001ojvafr4f20z', 'Incline Dumbbell Bench', 'https://www.youtube.com/watch?v=8nNi8jbbUPE', '2026-05-18 07:42:58.469', '2026-05-18 07:42:58.469', 'uploads/1779090178465-384433150.png'),
('cmpawrcym0002p4jvwr2idvfr', 'cmpatc7dt00001ojvafr4f20z', 'Dumbbell Pullover', 'https://www.youtube.com/watch?v=ieFKuQAGYIA', '2026-05-18 07:54:14.494', '2026-05-18 07:54:14.494', 'uploads/1779090854486-206035236.png'),
('cmpawtu990003p4jv52mw7crc', 'cmpatc7dt00001ojvafr4f20z', 'Incline Bench Press', 'https://www.youtube.com/watch?v=uIzbJX5EVIY', '2026-05-18 07:56:10.221', '2026-05-18 07:56:10.221', 'uploads/1779090970216-299127910.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adminuser`
--
ALTER TABLE `adminuser`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `AdminUser_admin_username_key` (`admin_username`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Category_name_key` (`name`);

--
-- Indexes for table `workout`
--
ALTER TABLE `workout`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
