-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost
-- Üretim Zamanı: 20 Haz 2022, 13:03:00
-- Sunucu sürümü: 5.7.36
-- PHP Sürümü: 8.1.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `akilliev`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `devices`
--

CREATE TABLE `devices` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL,
  `typeId` int(11) NOT NULL,
  `color` varchar(10) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `volume` tinyint(4) DEFAULT '0',
  `isOpen` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `devices`
--

INSERT INTO `devices` (`id`, `userId`, `name`, `typeId`, `color`, `volume`, `isOpen`) VALUES
(1, 1, 'Samsung 50Q67A', 1, NULL, 48, 0),
(5, 3, 'Samsung 55Q67A', 1, NULL, 70, 1),
(6, 3, 'Philips Hue 2', 2, '#2ca8ed', NULL, 0),
(8, 1, 'Philips Hue', 2, '#2091f5', NULL, 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `types`
--

CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `types`
--

INSERT INTO `types` (`id`, `name`) VALUES
(1, 'Televizyon'),
(2, 'Akıllı Ampül'),
(3, 'Kamera'),
(4, 'Ses Sistemi');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(25) COLLATE utf8mb4_turkish_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_turkish_ci NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `isAdmin`) VALUES
(1, 'Buse Akan', 'buse@hotmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 0),
(3, 'Buse Akan', 'buse2@hotmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 0);

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `devices`
--
ALTER TABLE `devices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Tablo için AUTO_INCREMENT değeri `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
