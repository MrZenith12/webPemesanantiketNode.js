-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 02 Mar 2024 pada 02.58
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tripbuddy`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_destinasi`
--

CREATE TABLE `tbl_destinasi` (
  `id_destinasi` int(11) NOT NULL,
  `kode_destinasi` varchar(25) NOT NULL,
  `nama_destinasi` varchar(255) NOT NULL,
  `id_penginapan` int(11) NOT NULL,
  `deskripsi` text NOT NULL,
  `sisa_destinasi` int(30) NOT NULL,
  `harga` int(11) NOT NULL,
  `gambar_produk` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tbl_destinasi`
--

INSERT INTO `tbl_destinasi` (`id_destinasi`, `kode_destinasi`, `nama_destinasi`, `id_penginapan`, `deskripsi`, `sisa_destinasi`, `harga`, `gambar_produk`) VALUES
(39, 'B-04711', '', 0, '', 0, 0, '775-241-gambar 1.jpg'),
(43, 'B-047', 'pantai gading', 9, 'bagus', 10, 1000000, '1708954214684.jpg');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_login`
--

CREATE TABLE `tbl_login` (
  `id_user` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `no_telepon` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `gambarprofil` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tbl_login`
--

INSERT INTO `tbl_login` (`id_user`, `username`, `password`, `no_telepon`, `email`, `gambarprofil`, `role`) VALUES
(1, 'admin', '1234', '08756788943', 'alif@gmail.com', '', 'admin'),
(2, 'heri', '123', '08345567893', 'heriawan@gmail.com', '175-desainer.jpg', 'user'),
(6, 'hanifah', '2222', '08976854326', 'dwiarianti@gmail.com', '', 'user'),
(8, 'yoga', '4444', '089567423351', 'yoga@gmail.com', '', 'user'),
(11, 'qodri', '2323', '089567423351', 'qodri@gmail.com', '', 'admin'),
(12, 'jihan', '1111', '390493208', 'jihan@gmail.com', '', 'user'),
(13, 'pak diawan', '34345', '087695436', 'pakdiawan@gmail.com', '', 'user'),
(14, 'pak diawan1', '1111', '08976854', 'pakdiawan1@gmail.com', '', 'user'),
(15, 'alif', '1111', '08956785', 'alif@gmail.com', '', 'user'),
(16, 'yoga', '1111', '089567423351', 'yoga@gmail.com', 'person.png', 'user'),
(17, 'yahya', '12345', '089567423351', 'yahya@gmail.com', 'person.png', 'user'),
(18, 'davva', '12345', '089756384', 'davva@gmail.com', 'person.png', 'user'),
(19, 'qadri', '123456', '089567423351', 'qadri@gmail.com', 'person.png', 'user'),
(20, 'admin', '1234', '', 'admin@gmail.com', '', 'admin'),
(21, 'dwiki', '1234', '089567423351', 'dwiki@gmail.com', '', 'user'),
(22, 'user', '4444', '08956783', 'user@gmail.com', '', 'user'),
(23, 'user123', '12345', '0896', 'user@gmail.com', '', 'user'),
(24, 'qdri', '111', '089567423351', 'alif02hilal@gmail.com', '', 'user'),
(25, 'melka', '11', '08956783', 'yoga@gmail.com', '', 'user'),
(26, 'melka', '1', '0896', 'hanifah@gmail.com', '', 'user'),
(27, 'melka', '1', '08956783', 'hanifah@gmail.com', '', 'user'),
(28, 'alif', '1234', '089567423351', 'alif@gmail.com', 'person.png', 'user'),
(29, 'melka', '1234', '089567423351', 'melka@gmail.com', 'person.png', 'user'),
(30, 'user', '1234', '089567423351', 'user@gmail.com', 'person.png', 'user');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_paket`
--

CREATE TABLE `tbl_paket` (
  `new_id_pakettour` int(11) NOT NULL,
  `kode_paket` varchar(25) NOT NULL,
  `namapaket` varchar(255) DEFAULT NULL,
  `id_destinasi` int(11) NOT NULL,
  `deskripsi_paket` text DEFAULT NULL,
  `sisa_paket` int(30) NOT NULL,
  `gambar_paket` varchar(255) DEFAULT NULL,
  `harga_paket` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tbl_paket`
--

INSERT INTO `tbl_paket` (`new_id_pakettour`, `kode_paket`, `namapaket`, `id_destinasi`, `deskripsi_paket`, `sisa_paket`, `gambar_paket`, `harga_paket`) VALUES
(30, 'P-047', 'Paket Keluarga', 39, 'dengan diskon terbaik 11%', 10, '364-302-paket1.png', 250000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_penginapan`
--

CREATE TABLE `tbl_penginapan` (
  `id_penginapan` int(11) NOT NULL,
  `kode_penginapan` varchar(25) NOT NULL,
  `nama_penginapan` varchar(255) NOT NULL,
  `deskripsi_penginapan` text NOT NULL,
  `sisa_penginapan` int(20) NOT NULL,
  `gambar_penginapan` varchar(255) NOT NULL,
  `harga_penginapan` int(11) NOT NULL,
  `fasilitas_penginapan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tbl_penginapan`
--

INSERT INTO `tbl_penginapan` (`id_penginapan`, `kode_penginapan`, `nama_penginapan`, `deskripsi_penginapan`, `sisa_penginapan`, `gambar_penginapan`, `harga_penginapan`, `fasilitas_penginapan`) VALUES
(9, 'H-40', 'hotel kartika', 'dengan harga yang sangat terjangkau untuk keluarga', 1, '795-gambar 6.jpg', 1500000, 'terdapat kolam renang dan sarapan pagi'),
(10, 'H-49', 'hotel losmen', 'dengan harga yang sangat terjangkau untuk keluarga', 7, '367-Ibis Surabaya.png', 1500000, 'terdapat kolam renang dan sarapan pagi'),
(15, 'P-1111', 'hotel banda aceh', 'dengan harga yang sangat terjangkau untuk keluarga', 6, '897-58-gambar 6.jpg', 1500000, 'terdapat kolam renang dan sarapan pagi');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_pesandes`
--

CREATE TABLE `tbl_pesandes` (
  `id_pesdes` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_destinasi` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `alamat` varchar(50) NOT NULL,
  `no_telepon` int(12) NOT NULL,
  `hargades` int(20) NOT NULL,
  `nama_destinasi` varchar(50) NOT NULL,
  `jumlah_orang` int(20) NOT NULL,
  `tgl_pergi` date NOT NULL,
  `tgl_pulang` date NOT NULL,
  `bank` varchar(50) NOT NULL,
  `no_rek` int(20) NOT NULL,
  `total_harga` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tbl_pesandes`
--

INSERT INTO `tbl_pesandes` (`id_pesdes`, `id_user`, `id_destinasi`, `nama`, `email`, `alamat`, `no_telepon`, `hargades`, `nama_destinasi`, `jumlah_orang`, `tgl_pergi`, `tgl_pulang`, `bank`, `no_rek`, `total_harga`) VALUES
(33, 12, 0, 'sara', 'sara@gmail.com', 'langsa', 8976542, 9000000, 'pantai gading', 2, '2023-05-13', '2023-05-14', 'bsi', 1111, 18000000),
(42, 15, 0, 'alif', 'alif@gmail.com', 'langsa', 895678896, 1500000, 'toba', 2, '2023-05-27', '2023-05-29', 'BSI', 2222, 6000000),
(43, 15, 0, 'luki', 'dwiarianti@gmail.com', 'langsa', 8967891, 1500000, 'pantai pasir', 2, '2023-05-30', '2023-05-31', 'BSI', 333, 3000000),
(45, 15, 0, 'hanifah', 'hanifah@gmail.com', 'langsa', 2147483647, 9000000, 'pantai gading', 1, '2023-05-27', '2023-05-29', 'BNI', 3434, 18000000),
(55, 18, 0, 'davva', 'davva@gmail.com', 'langsa', 89756384, 1500000, 'toba', 2, '2023-08-23', '2023-08-24', 'BRI', 2222, 3000000),
(57, 2, 0, 'alif', 'alif02hilal@gmail.com', 'seuriget,langsa,aceh', 897345363, 1500000, 'toba', 1, '2023-12-18', '2023-12-19', 'BNI', 11111, 1500000),
(58, 19, 0, 'alif', 'alif02hilal@gmail.com', 'seuriget,langsa,aceh', 89664738, 9000000, 'pantai gading', 2, '2023-12-19', '2023-12-21', 'BNI', 11111, 36000000),
(63, 8, 41, 'alif', 'user@gmail.com', 'seuriget,langsa,aceh', 2147483647, 1500000, 'pantai gading', 2, '2024-01-13', '2024-01-14', 'BNI', 11111, 3000000),
(64, 8, 41, 'alif', 'user@gmail.com', 'seuriget,langsa,aceh', 2147483647, 1500000, 'pantai gading', 1, '2024-01-15', '2024-01-17', 'BRI', 11111, 1500000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_pespaket`
--

CREATE TABLE `tbl_pespaket` (
  `id_pesket` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `new_id_pakettour` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `alamat` varchar(50) NOT NULL,
  `no_telepon` int(11) NOT NULL,
  `harga_perket` int(11) NOT NULL,
  `namapaket` varchar(30) NOT NULL,
  `jumlah_orang` int(11) NOT NULL,
  `tgl_pergi` date NOT NULL,
  `tgl_pulang` date NOT NULL,
  `bank` varchar(20) NOT NULL,
  `no_rek` int(50) NOT NULL,
  `total_harga` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tbl_pespaket`
--

INSERT INTO `tbl_pespaket` (`id_pesket`, `id_user`, `new_id_pakettour`, `nama`, `email`, `alamat`, `no_telepon`, `harga_perket`, `namapaket`, `jumlah_orang`, `tgl_pergi`, `tgl_pulang`, `bank`, `no_rek`, `total_harga`) VALUES
(13, 6, 0, 'hanifah', 'hanifah@gmail.com', 'langsa', 2147483647, 2500000, 'Liburan Akhir Pekan', 1, '2023-05-27', '2023-05-29', 'BSI', 222222, 5000000),
(14, 2, 0, 'alif', 'alif@gmail.com', 'langsa', 87695436, 2500000, 'Paket Keluarga', 2, '2023-05-27', '2023-05-29', 'BNI', 2222, 10000000),
(15, 2, 0, 'luki', 'heriawan@gmail.com', 'langsa', 895430987, 2500000, 'Paket Keluarga', 2, '2023-07-05', '2023-07-06', 'Mandiri', 2222, 5000000),
(16, 21, 28, 'alif', 'alif02hilal@gmail.com', 'seuriget,langsa,aceh', 2147483647, 150000, '', 2, '2024-01-11', '2024-01-12', 'BNI', 11111, 300000),
(17, 8, 28, 'alif', 'user@gmail.com', 'seuriget,langsa,aceh', 2147483647, 150000, 'Paket Keluarga', 1, '2024-01-14', '2024-01-15', 'BNI', 11111, 150000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_pespenginapan`
--

CREATE TABLE `tbl_pespenginapan` (
  `id_pesnip` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_penginapan` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `alamat` varchar(50) NOT NULL,
  `no_telepon` int(20) NOT NULL,
  `harganip` int(20) NOT NULL,
  `nama_penginapan` varchar(30) NOT NULL,
  `jumlah_orang` int(20) NOT NULL,
  `tgl_pergi` date NOT NULL,
  `tgl_pulang` date NOT NULL,
  `bank` varchar(20) NOT NULL,
  `no_rek` int(20) NOT NULL,
  `total_harga` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tbl_pespenginapan`
--

INSERT INTO `tbl_pespenginapan` (`id_pesnip`, `id_user`, `id_penginapan`, `nama`, `email`, `alamat`, `no_telepon`, `harganip`, `nama_penginapan`, `jumlah_orang`, `tgl_pergi`, `tgl_pulang`, `bank`, `no_rek`, `total_harga`) VALUES
(6, 2, 0, 'luki', 'abdul04hilal@gmail.com', 'langsa', 8765, 1500000, 'hotel kartika', 2, '2023-05-05', '2023-05-06', 'bri', 2222, 3000000),
(8, 2, 0, 'abdul', 'abdul@gmail.com', 'langsa', 87695436, 1500000, 'hotel losmen', 3, '2023-05-28', '2023-05-31', 'BSI', 222222, 13500000),
(9, 2, 0, 'luki', 'luki@gmail.com', 'langsa', 2147483647, 1500000, 'hotel losmen', 5, '2023-07-04', '2023-07-05', 'BNI', 2222, 7500000),
(10, 21, 10, 'alif', 'alif02hilal@gmail.com', 'seuriget,langsa,aceh', 2147483647, 1500000, 'hotel losmen', 2, '2024-01-11', '2024-01-12', 'BSI', 11111, 3000000),
(11, 21, 15, 'alif', 'alif02hilal@gmail.com', 'seuriget,langsa,aceh', 2147483647, 1500000, 'hotel banda aceh', 3, '2024-01-11', '2024-01-12', 'BNI', 11111, 4500000),
(13, 30, 0, 'heri', 'user@gmail.com', 'seuriget,langsa,aceh', 8956832, 1500000, 'hotel banda aceh', 2, '2024-01-24', '2024-01-25', 'BNI', 11111, 3000000);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `tbl_destinasi`
--
ALTER TABLE `tbl_destinasi`
  ADD PRIMARY KEY (`id_destinasi`),
  ADD UNIQUE KEY `kode_destinasi` (`kode_destinasi`),
  ADD UNIQUE KEY `id_penginapan` (`id_penginapan`),
  ADD KEY `id_penginapan_2` (`id_penginapan`);

--
-- Indeks untuk tabel `tbl_login`
--
ALTER TABLE `tbl_login`
  ADD PRIMARY KEY (`id_user`);

--
-- Indeks untuk tabel `tbl_paket`
--
ALTER TABLE `tbl_paket`
  ADD PRIMARY KEY (`new_id_pakettour`),
  ADD UNIQUE KEY `id_destinasi` (`id_destinasi`),
  ADD UNIQUE KEY `kode_paket` (`kode_paket`);

--
-- Indeks untuk tabel `tbl_penginapan`
--
ALTER TABLE `tbl_penginapan`
  ADD PRIMARY KEY (`id_penginapan`),
  ADD UNIQUE KEY `kode_penginapan` (`kode_penginapan`);

--
-- Indeks untuk tabel `tbl_pesandes`
--
ALTER TABLE `tbl_pesandes`
  ADD PRIMARY KEY (`id_pesdes`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_destinasi` (`id_destinasi`);

--
-- Indeks untuk tabel `tbl_pespaket`
--
ALTER TABLE `tbl_pespaket`
  ADD PRIMARY KEY (`id_pesket`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_paket` (`new_id_pakettour`);

--
-- Indeks untuk tabel `tbl_pespenginapan`
--
ALTER TABLE `tbl_pespenginapan`
  ADD PRIMARY KEY (`id_pesnip`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_penginapan` (`id_penginapan`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `tbl_destinasi`
--
ALTER TABLE `tbl_destinasi`
  MODIFY `id_destinasi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT untuk tabel `tbl_login`
--
ALTER TABLE `tbl_login`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT untuk tabel `tbl_paket`
--
ALTER TABLE `tbl_paket`
  MODIFY `new_id_pakettour` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT untuk tabel `tbl_penginapan`
--
ALTER TABLE `tbl_penginapan`
  MODIFY `id_penginapan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `tbl_pesandes`
--
ALTER TABLE `tbl_pesandes`
  MODIFY `id_pesdes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT untuk tabel `tbl_pespaket`
--
ALTER TABLE `tbl_pespaket`
  MODIFY `id_pesket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT untuk tabel `tbl_pespenginapan`
--
ALTER TABLE `tbl_pespenginapan`
  MODIFY `id_pesnip` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `tbl_paket`
--
ALTER TABLE `tbl_paket`
  ADD CONSTRAINT `tbl_paket_ibfk_1` FOREIGN KEY (`id_destinasi`) REFERENCES `tbl_destinasi` (`id_destinasi`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tbl_pesandes`
--
ALTER TABLE `tbl_pesandes`
  ADD CONSTRAINT `tbl_pesandes_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `tbl_login` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tbl_pespaket`
--
ALTER TABLE `tbl_pespaket`
  ADD CONSTRAINT `tbl_pespaket_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `tbl_login` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tbl_pespenginapan`
--
ALTER TABLE `tbl_pespenginapan`
  ADD CONSTRAINT `tbl_pespenginapan_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `tbl_login` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
