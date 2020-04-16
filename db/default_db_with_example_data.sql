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

--
-- Dumping data for table `custom_questions`
--

INSERT INTO `custom_questions` (`question_id`, `question_text`) VALUES
(1, 'Question one?'),
(2, 'Question two?');

-- --------------------------------------------------------

--
-- Table structure for table `custom_thanks`
--

CREATE TABLE `custom_thanks` (
  `thanks_id` int(11) NOT NULL,
  `custom_thanks_text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `custom_thanks`
--

INSERT INTO `custom_thanks` (`thanks_id`, `custom_thanks_text`) VALUES
(1, 'Random question');

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
-- Dumping data for table `mt`
--

INSERT INTO `mt` (`mt_id_key`, `mt_name`, `custom_q_text`, `custom_thanks_text`) VALUES
(123, 'Kazika', 'Satisified with choice of beer?', 'Question one?'),
(231, 'Beertia', 'Rate the ambient of the place', NULL);

-- --------------------------------------------------------

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

--
-- Dumping data for table `target_mt`
--

INSERT INTO `target_mt` (`mt_id`, `q_one_w`, `q_two_w`, `q_three_w`, `q_four_w`, `q_one_m`, `q_two_m`, `q_three_m`, `q_four_m`, `q_one_q`, `q_two_q`, `q_three_q`, `q_four_q`, `q_one_y`, `q_two_y`, `q_three_y`, `q_four_y`) VALUES
(123, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4);

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
-- Dumping data for table `votes`
--

INSERT INTO `votes` (`mt_id`, `q_one`, `q_two`, `q_three`, `q_four`, `vote_date`, `vote_time`, `custom_q_txt`) VALUES
(123, 4, 2, 2, 2, '2020-04-16', '13:43:53', 'Rate the ambient of the place'),
(123, 4, 5, 4, 4, '2020-04-16', '13:44:17', 'Rate the ambient of the place'),
(123, 2, 4, 2, 4, '2020-04-16', '13:44:26', 'Rate the ambient of the place'),
(123, 5, 5, 5, 5, '2020-04-16', '13:44:35', 'Rate the ambient of the place'),
(123, 2, 3, 2, 3, '2020-04-16', '13:44:45', 'Rate the ambient of the place'),
(123, 5, 5, 5, 5, '2020-04-16', '13:45:24', 'Rate the ambient of the place'),
(123, 5, 4, 5, 4, '2020-04-16', '13:45:36', 'Rate the ambient of the place'),
(123, 5, 5, 5, 5, '2020-04-16', '13:45:42', 'Rate the ambient of the place'),
(123, 1, 1, 1, 1, '2020-04-16', '13:45:55', 'Rate the ambient of the place'),
(123, 1, 5, 2, 4, '2020-04-16', '13:46:04', 'Rate the ambient of the place'),
(123, 4, 4, 4, 4, '2020-04-16', '13:46:13', 'Rate the ambient of the place'),
(123, 3, 4, 1, 2, '2020-04-16', '13:51:39', 'Rate the ambient of the place'),
(123, 4, 4, 2, 3, '2020-04-16', '14:16:12', 'Rate the ambient of the place');

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
