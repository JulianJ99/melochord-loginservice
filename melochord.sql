-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 13 dec 2023 om 21:45
-- Serverversie: 10.4.22-MariaDB
-- PHP-versie: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `melochord`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

CREATE TABLE `users` (
  `id` int(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(31, 'test', '$2b$10$yLhdMxUZfiDlVFWv0zulne2lzQzIjMiKQs8QilFPwTu0StRnys8ZG'),
(32, 'test1', '$2b$10$GJkhUWeThyk7sLsYJi8H6.5CzHeLoBvzHMIGrx1ceSSXyLorCHKg6'),
(34, 'test3', '$2b$10$jrZBVhiuPqwQfDJjzkT1JOlu.5Qdos8L..sk/unUCqY32V4SpUMIK'),
(36, 'test4', '$2b$10$.SDm6BpU/EaRkpBtqYTXhu8ZJra8Vcabx3CPPfq9xxUpQ9GXytNIS');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `username_2` (`username`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'wREobe6BtzUN.0UZ'; 

CREATE USER 'user1'@'localhost' IDENTIFIED BY 'wREobe6BtzUN.0UZ';
GRANT ALL PRIVILEGES ON * . * TO 'user1'@'localhost';

flush privileges;