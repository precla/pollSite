-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 16, 2020 at 02:17 PM
-- Server version: 10.3.22-MariaDB-0+deb10u1
-- PHP Version: 7.3.14-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+01:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pollSite`
--

-- --------------------------------------------------------

--
-- Table structure for table `custom_questions`
--

CREATE TABLE `custom_questions` (
  `question_id` int(11) NOT NULL,
  `question_text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `custom_thanks`
--

CREATE TABLE `custom_thanks` (
  `thanks_id` int(11) NOT NULL,
  `custom_thanks_text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `mt`
--

CREATE TABLE `mt` (
  `mt_id_key` int(11) NOT NULL,
  `mt_name` text DEFAULT NULL,
  `custom_q_text` text DEFAULT NULL,
  `custom_thanks_text` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `target_mt`
--

CREATE TABLE `target_mt` (
  `mt_id` int(11) NOT NULL,
  `q_one_w` int(11) NOT NULL,
  `q_two_w` int(11) NOT NULL,
  `q_three_w` int(11) NOT NULL,
  `q_four_w` int(11) NOT NULL,
  `q_one_m` int(11) NOT NULL,
  `q_two_m` int(11) NOT NULL,
  `q_three_m` int(11) NOT NULL,
  `q_four_m` int(11) NOT NULL,
  `q_one_q` int(11) NOT NULL,
  `q_two_q` int(11) NOT NULL,
  `q_three_q` int(11) NOT NULL,
  `q_four_q` int(11) NOT NULL,
  `q_one_y` int(11) NOT NULL,
  `q_two_y` int(11) NOT NULL,
  `q_three_y` int(11) NOT NULL,
  `q_four_y` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `mt_id` int(11) NOT NULL,
  `q_one` int(11) NOT NULL,
  `q_two` int(11) NOT NULL,
  `q_three` int(11) NOT NULL,
  `q_four` int(11) NOT NULL,
  `vote_date` date NOT NULL,
  `vote_time` time NOT NULL,
  `custom_q_txt` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `custom_questions`
--
ALTER TABLE `custom_questions`
  ADD PRIMARY KEY (`question_id`);

--
-- Indexes for table `custom_thanks`
--
ALTER TABLE `custom_thanks`
  ADD PRIMARY KEY (`thanks_id`);

--
-- Indexes for table `mt`
--
ALTER TABLE `mt`
  ADD PRIMARY KEY (`mt_id_key`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `custom_questions`
--
ALTER TABLE `custom_questions`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `custom_thanks`
--
ALTER TABLE `custom_thanks`
  MODIFY `thanks_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
