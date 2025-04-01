-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 10. 12:15
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `menhelymagus`
--

DELIMITER $$
--
-- Függvények
--
CREATE DEFINER=`root`@`localhost` FUNCTION `EvaluateProperty` (`actual` DOUBLE, `preferred` DOUBLE, `weight` DOUBLE) RETURNS DOUBLE DETERMINISTIC NO SQL RETURN (POW(1 - ABS(preferred-actual)/10, 1.5)*weight)$$

CREATE DEFINER=`root`@`localhost` FUNCTION `GetAge` (`birthday` DATE) RETURNS DOUBLE DETERMINISTIC RETURN DATEDIFF(CURDATE(), birthday) / 365.25$$

CREATE DEFINER=`root`@`localhost` FUNCTION `LinearizeWeight` (`weight` DOUBLE) RETURNS DOUBLE DETERMINISTIC NO SQL RETURN POW((GREATEST(weight, 0.1) - 0.1) / 500, 1/3) * 10$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `passwordHash` varchar(95) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin2 COLLATE=latin2_hungarian_ci;

--
-- A tábla adatainak kiíratása `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `passwordHash`) VALUES
(1, 'Jakab Bence', 'jakab.bence.1987@gmail.com', '$2y$12$ahCtSkkf5Ihcnh1ATe2OUuQiR4ATPa7SUC3LRf9f97NSY6S6iUeRW'),
(2, 'Budai István', 'istvanbudai@hotmail.com', '$2y$12$fGd/IxOswwLUnyzNFdRS7elTRDI3w2n2ERNsbai62gnlIMoRmrcWW'),
(3, 'Kelemen Anna', 'k_anna88@gmail.com', '$2y$12$4sST/qDusJXS98h3bkGMyunBGngkJON27KuABpH0slDzeBlU1Yfwy'),
(4, 'Boros László', 'boroslaciii@gmail.com', '$2y$12$m2vqQaSDLqKHpCMQskELYOSQ8kbS/ptmSTk4SniL9ReBl7nXELgn6'),
(5, 'Bogdán Julcsa', 'b.julcsa9@citromail.hu', '$2y$12$PXR7WP/6CpDVzuji5dLk8e0junzWcC5xvZDmEjurMvKfbuIyVdw2W');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `adoptions`
--

CREATE TABLE `adoptions` (
  `animalId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `pending` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin2 COLLATE=latin2_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `animals`
--

CREATE TABLE `animals` (
  `id` int(11) NOT NULL,
  `shelterId` int(11) NOT NULL,
  `birthDate` date NOT NULL,
  `entryDate` date NOT NULL,
  `speciesId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `gender` varchar(1) NOT NULL,
  `neutered` tinyint(1) NOT NULL,
  `healthy` tinyint(1) NOT NULL,
  `weight` double NOT NULL,
  `cuteness` int(11) NOT NULL,
  `childFriendlyness` int(11) NOT NULL,
  `sociability` int(11) NOT NULL,
  `exerciseNeed` int(11) NOT NULL,
  `furLength` int(11) NOT NULL,
  `docility` int(11) NOT NULL,
  `housebroken` tinyint(1) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin2 COLLATE=latin2_hungarian_ci;

--
-- A tábla adatainak kiíratása `animals`
--

INSERT INTO `animals` (`id`, `shelterId`, `birthDate`, `entryDate`, `speciesId`, `name`, `gender`, `neutered`, `healthy`, `weight`, `cuteness`, `childFriendlyness`, `sociability`, `exerciseNeed`, `furLength`, `docility`, `housebroken`, `description`) VALUES
(1, 1, '2020-05-14', '2023-03-10', 1, 'Manci', 'F', 0, 1, 26.7, 7, 9, 9, 6, 5, 8, 0, 'Kedves, játékos kutya. Társaságkedvelő kutya, remek választás olyan családba ahol vannak gyerekek, miután rendkívül jól kijön velük.'),
(2, 2, '2021-07-22', '2023-07-15', 2, 'Luna', 'F', 0, 1, 5, 9, 8, 9, 6, 4, 1, 1, 'Barátságos, aranyos macska, kedveli a gyerekeket. Nagyon társasági lény. Elég nehezen tanul, ezért a trükköket tanítani kívánó gazdák számára nem a legjobb választás.'),
(3, 3, '2019-10-10', '2024-01-12', 3, 'Boris', 'U', 0, 1, 0.35, 6, 8, 5, 2, 0, 0, 0, ''),
(4, 6, '2015-02-19', '2021-06-10', 4, 'Pufi', 'M', 1, 1, 279, 1, 2, 2, 3, 2, 4, 0, 'Ijesztő aurával rendelkezik.'),
(5, 3, '2020-08-30', '2023-10-30', 1, 'Lili', 'F', 0, 1, 17, 6, 4, 5, 4, 6, 2, 1, 'Bármennyire is próbálnak neki májat adni, Lili csak elfordítja a fejét és nem hajlandó megenni. Lili gyakran megijed a hirtelen hangoktól, mint például egy autó dudálásától vagy egy erős csattanástól.'),
(6, 4, '2022-10-13', '2024-08-29', 2, 'Fifi', 'F', 0, 1, 5.75, 7, 2, 5, 6, 3, 8, 0, 'Imád felugrálni különböző bútorokra: például szekrényekre, asztalokra.'),
(7, 3, '2024-10-21', '2024-11-22', 3, 'Maya', 'F', 0, 1, 0.43, 6, 7, 5, 2, 0, 0, 0, ''),
(8, 6, '2024-10-29', '2024-11-05', 4, 'Paci', 'F', 0, 1, 60, 6, 8, 2, 9, 1, 5, 0, 'Kedves, de félénk lovacska. Rendkívül mozgékony, egész nap szinte meg sem áll. Félénksége miatt a simogatásokat nehezen tűri, de az idő teltével ez változni fog nála.'),
(9, 3, '2023-12-22', '2024-07-07', 5, 'Janka', 'F', 0, 1, 0.045, 8, 8, 9, 1, 3, 2, 0, 'Egyszer szerepelt egy reklámban, amely hörcsögeledelt reklámozott.'),
(10, 3, '2024-12-11', '2025-01-09', 3, 'Zita', 'F', 0, 1, 0.045, 2, 6, 5, 3, 0, 0, 0, ''),
(11, 6, '2018-06-06', '2024-05-17', 4, 'Bimbo', 'M', 1, 1, 317, 3, 2, 4, 10, 2, 9, 0, 'Nagyon gyors ló, rendkívül tanulékony. Visszahúzódó, nem igényli a simogatást, a körülötte ugráló és őt simogató gyerekeket kifejezetten nem szereti. Aki esetleg szeretne egy lovat, aki alkalmas is lehet a jövőben versenyekre, akkor annak Bimbo a tökéletes választás!'),
(12, 3, '2024-02-11', '2025-01-14', 5, 'Kira', 'F', 0, 1, 0.036, 8, 9, 8, 5, 3, 10, 0, 'Kíváncsi hörcsög, aki rendkívül tanulékony, a trükköket tanító kívánó gazdák számára remek választás.'),
(13, 3, '2017-07-21', '2019-05-30', 2, 'Panda', 'M', 1, 1, 6.7, 8, 1, 1, 3, 4, 2, 0, 'Nagyon szeret a parkban futni. Előző családban traumatizálva lett, és egyáltalán nem szociális illetve gyerekbarát. Nem szabad közel menni hozzá, mert gyakran karmolászik.'),
(14, 4, '2024-10-17', '2024-12-07', 3, 'Fifi', 'F', 0, 1, 0.002, 3, 3, 5, 2, 0, 0, 0, ''),
(15, 5, '2022-08-11', '2024-07-04', 1, 'Tigris', 'M', 1, 1, 17.6, 10, 8, 8, 4, 5, 2, 1, 'Különböző színűek a szemei: egyik kék, másik barna.'),
(16, 6, '2018-10-14', '2024-01-01', 4, 'Nyihahu', 'M', 0, 1, 317, 3, 5, 4, 8, 3, 2, 0, 'Nyihahu egy erőteljes vesztfáliai hidegvérű hím ló, aki nem épp a legszelídebb vagy legokosabb társ. Nehezen tanul, és hajlamos a türelmetlenségre. Erős és kitartó, de nem a legjobb választás a türelmes, tanítani kívánó gazdáknak.'),
(17, 8, '2016-09-29', '2024-12-03', 2, 'Benyó', 'M', 0, 1, 4.15, 6, 7, 5, 3, 2, 6, 1, 'Kedvenc macskaeledele a Whiskas.'),
(18, 7, '2024-08-22', '2024-11-13', 7, 'Zöldike', 'F', 0, 1, 0.051, 7, 2, 3, 2, 0, 2, 0, ''),
(19, 7, '2024-02-12', '2024-11-22', 7, 'Riki', 'U', 0, 1, 0.041, 6, 4, 4, 3, 0, 2, 0, ''),
(20, 1, '2015-06-12', '2024-12-24', 1, 'Kukor Ica', 'F', 0, 1, 8, 8, 1, 8, 2, 4, 7, 1, 'Kukor Ica egy barátságos, szociális kutya, aki imádja a felnőttek társaságát. Bár nem túl gyerekbarát, szívesen élvezi a nyugodt, kisebb mozgásokat. Közepes hosszúságú szőre van, és könnyen ápolható. Türelmes, jól nevelt, szobatiszta, egészséges kutya, aki mindig örömet hoz gazdája életébe.'),
(21, 1, '2022-01-01', '2024-11-13', 1, 'Zsóka', 'F', 1, 1, 30, 4, 4, 8, 8, 2, 7, 0, 'Zsóka, a 3 éves africanis kutya rendkívül társaságkedvelő és mozgékony. Imád emberek és más állatok társaságában lenni, és gyorsan tanul új dolgokat. Rövid szőre könnyen ápolható, és aktív életmódja miatt ideális társ lehet egy energikus család számára.'),
(22, 7, '2019-11-14', '2025-01-27', 8, 'Viper', 'M', 0, 1, 5, 2, 1, 3, 1, 0, 7, 0, 'Viper egy nyugodt, tanulékony hím piton, aki élvezi a terráriumában töltött időt. Nem igényel sok mozgást, inkább a csendes, pihentető életet választja. A természetes környezetében jól alkalmazkodik, és rendkívül türelmes, ami miatt könnyen kezelhető.'),
(23, 7, '2023-12-15', '2025-01-02', 7, 'Lukács', 'M', 0, 1, 0.05, 5, 8, 7, 2, 0, 6, 0, 'Lukács egy cuki, nyugodt és tanulékony gyík, aki leginkább a terráriumában pihen. Nem szeret sokat mozogni, inkább élvezi a csendes, kényelmes környezetet, ahol figyeli a világot. Bár nem a legaktívabb, minden mozdulata szándékos és jól átgondolt. Kiválóan alkalmazkodik, és igazán jól kijön a gazdájával, aki könnyen taníthatja.'),
(25, 1, '2024-08-03', '2025-01-27', 10, 'Maggie', 'F', 0, 1, 4.2, 6, 10, 8, 1, 2, 4, 0, 'Maggie egy igazán cuki és gyerekbarát nyuszi, aki mindig nyugodt és kedves. Bár nem a legaktívabb, öröm nézni, ahogy a ketrecében vagy az udvaron pihenget, élvezve a napfényes órákat. Szereti a csendet, és nem igényel sok mozgást, így tökéletes választás lehet egy olyan családnak, ahol egy nyugodt, szeretetteljes kis házikedvencet keresnek. Maggie gyorsan belopja magát mindenki szívébe!'),
(26, 7, '2024-11-01', '2024-11-30', 7, 'Gyuri', 'M', 0, 1, 0.04, 7, 5, 3, 2, 0, 3, 0, 'Egy szemeteskonténer mellett találták az utcán Győrön.'),
(27, 7, '2022-03-17', '2024-08-25', 7, 'Dzsungel', 'U', 0, 1, 0.053, 6, 3, 4, 3, 0, 2, 0, ''),
(28, 7, '2023-05-15', '2024-08-07', 7, 'Gizmo', 'M', 0, 1, 0.038, 6, 3, 3, 2, 0, 5, 0, ''),
(29, 3, '2024-02-15', '2025-01-12', 9, 'Pici', 'M', 0, 1, 0.65, 6, 1, 4, 2, 2, 3, 0, 'Szeret almákat enni.'),
(30, 3, '2024-12-22', '2025-01-02', 9, 'Tüsi', 'M', 0, 1, 0.25, 7, 2, 5, 2, 2, 3, 0, ''),
(31, 3, '2024-08-09', '2024-11-28', 9, 'Kaktusz', 'M', 0, 1, 0.56, 6, 2, 3, 1, 2, 2, 0, ''),
(32, 3, '2024-06-06', '2024-07-12', 9, 'Vackor', 'U', 0, 1, 0.43, 2, 2, 3, 2, 2, 2, 0, 'Emberkerülő, menekülni kezd amikor valaki hozzá szeretne nyúlni.'),
(33, 8, '2025-01-04', '2025-01-20', 9, 'Taco', 'M', 0, 1, 0.21, 7, 4, 4, 2, 2, 4, 0, 'Nevét arról kapta, hogy valaki egy törölközőbe tekerve tette le a Győri menhely kapuja előtt.'),
(34, 8, '2023-03-11', '2024-08-08', 9, 'Bodza', 'F', 0, 1, 0.385, 5, 2, 6, 2, 2, 3, 0, ''),
(35, 8, '2023-11-23', '2024-05-07', 9, 'Manó', 'F', 0, 1, 0.415, 5, 3, 5, 5, 2, 3, 0, 'Manó néha egész nap meg sem áll, és megy ide-oda, de néha pedig pont az ellentettjét csinálja, és egész nap meg sem mozdul.'),
(36, 5, '2024-01-18', '2024-09-21', 2, 'Szürke', 'M', 0, 1, 5.4, 5, 7, 5, 4, 2, 4, 0, 'Nyakában lévő masnival együtt találták az utcán, és amikor egyszer le akarták róla venni, agresszív lett, és amint visszakerült rá, újra nyugodt és szelíd lett.'),
(37, 5, '2021-01-07', '2024-07-11', 2, 'Masni', 'F', 0, 1, 4.95, 6, 7, 7, 3, 8, 3, 1, 'Szétkarmolássza a bútorokat.'),
(38, 5, '2022-06-20', '2024-03-21', 2, 'Lotti', 'F', 1, 1, 6.1, 7, 8, 9, 6, 3, 8, 0, 'Közvetlen, kedves macska. Nem karmol, a simogatásokat idegenektől és gazdáitól szintúgy tűri, szereti.'),
(39, 5, '2023-02-08', '2024-10-17', 1, 'Dörmi', 'M', 1, 1, 31.7, 8, 7, 8, 8, 5, 9, 0, 'Tanulékony kutya, tud parancsokra hallgatni: ülj, kövess, állj, hasra...'),
(40, 5, '2018-07-06', '2023-09-13', 1, 'Boszkó', 'M', 0, 1, 34.9, 7, 8, 8, 9, 5, 8, 0, 'Gluténérzékeny. Glutént tartalmazó ételeken kívül bármi mást megeszik.'),
(41, 9, '2024-07-19', '2024-12-25', 1, 'Rocco', 'M', 0, 1, 8.95, 8, 9, 8, 9, 2, 5, 0, 'Nem szokta visszahozni a labdát amikor eldobják neki.'),
(42, 9, '2023-02-02', '2024-03-17', 2, 'Hópehely', 'U', 0, 1, 5.85, 7, 4, 5, 3, 3, 1, 0, 'Szobatisztaságra közel 1 év alatt nem lehetett megtanítani.'),
(43, 9, '2017-07-18', '2023-04-05', 2, 'Morci', 'M', 1, 1, 5.45, 2, 1, 2, 3, 4, 4, 1, 'Ha ember közelít hozzá, fújtatni kezd. Ha pedig valaki a kezével közelít hozzá, mert fel akarná venni vagy simogatni, akkor pedig harap.'),
(44, 9, '2024-01-10', '2025-01-30', 1, 'Csöpi', 'F', 0, 1, 2.85, 6, 8, 7, 7, 8, 5, 1, 'Szőre sok ápolást igényel, sokat hullik.'),
(45, 9, '2022-06-04', '2023-12-28', 1, 'Buksi', 'M', 1, 1, 12.1, 6, 7, 6, 8, 1, 6, 1, 'Nagyon szereti a vizet, imádja amikor fürdetik, és amikor úszkálhat a vízben.'),
(46, 9, '2024-11-29', '2025-01-02', 1, 'Vau-vau', 'M', 0, 1, 7.3, 8, 9, 7, 8, 2, 4, 0, 'Szeret pacsit adni, és utána mindig ugrálni és futkározni kezd.'),
(47, 9, '2021-02-17', '2024-09-28', 2, 'Garfield', 'M', 0, 1, 6.1, 7, 1, 4, 1, 2, 9, 1, 'Szereti a lasagnát, és tud beszélni.'),
(48, 2, '2024-12-05', '2024-12-13', 1, 'Buksi', 'M', 0, 1, 5.9, 9, 8, 9, 6, 5, 4, 0, 'Éjszakánként gyakran felkel, és ilyenkor elkezd vadul ugatni hosszú időn keresztül, ezzel minden más állatot felkelt.'),
(49, 2, '2016-02-02', '2022-02-22', 1, 'Bella', 'F', 0, 1, 16, 4, 1, 3, 6, 1, 2, 0, 'Ideges lesz ha gyerekek közelében van.'),
(50, 2, '2018-06-07', '2024-01-09', 2, 'Cirmi', 'M', 1, 1, 5.45, 5, 4, 3, 1, 3, 5, 1, 'A nap folyamán alig kel fel, szinte egész nap csak fekszik, és amikor fel akarják emelni, vagy simogatni akarják miközben fekszik, fújtatni kezd.'),
(51, 3, '2024-06-14', '2025-01-30', 3, 'Zefír', 'U', 0, 1, 0.21, 5, 8, 5, 3, 0, 0, 0, ''),
(52, 3, '2024-03-10', '2024-12-04', 3, 'Cápali', 'M', 0, 1, 0.285, 3, 4, 5, 2, 0, 0, 0, ''),
(53, 3, '2024-09-05', '2024-12-13', 3, 'Cápeti', 'M', 0, 1, 0.275, 7, 6, 5, 2, 0, 0, 0, ''),
(54, 3, '2019-01-09', '2024-12-19', 2, 'Cirmi', 'M', 1, 1, 7.1, 6, 5, 3, 2, 3, 5, 1, 'Utálja a halat, azon kívül minden mást örömmel megeszik.'),
(55, 3, '2021-07-20', '2024-04-10', 1, 'Blöki', 'M', 1, 1, 9.15, 4, 8, 6, 6, 4, 6, 1, 'Egyszer majdnem lenyelt egy kisebb labdát, és azóta fél a labdáktól.'),
(56, 4, '2018-08-07', '2023-04-19', 1, 'Buksi', 'M', 0, 1, 16.75, 7, 8, 6, 7, 7, 4, 1, ''),
(57, 4, '2023-01-06', '2024-10-18', 2, 'Cirmike', 'F', 0, 1, 4.85, 7, 6, 7, 3, 2, 4, 1, ''),
(58, 4, '2021-08-11', '2024-07-07', 2, 'Miáu', 'U', 0, 1, 5.28, 7, 6, 8, 4, 3, 4, 0, ''),
(59, 4, '2023-12-16', '2024-10-11', 1, 'Puffancs', 'M', 1, 1, 3.12, 7, 9, 6, 5, 9, 2, 1, ''),
(150, 1, '2021-11-01', '2024-07-08', 1, 'Szöcsi', 'F', 0, 1, 4.1, 5, 4, 3, 5, 2, 6, 1, ''),
(151, 1, '2021-08-02', '2024-09-03', 1, 'Homok', 'M', 0, 0, 7.4, 6, 4, 7, 6, 5, 4, 0, 'Egy tanyán éltem, több társammal együtt. Nem volt aki rendszeresen velünk legyen, ellásson bennünket. Jártunk minden felé, élelem után kutatva. Sajnos én rászoktam arra, hogy megkergettem a bicikliseket. Nem tudtam, hogy nem szabad. Ezért nekem el kellett jönnöm onnan.\n\nCsendes, kicsit félős vagyok. De amikor látom, hogy nincs baj, akkor bújok mindenkihez, nagyon jó ha szeretnek!'),
(152, 1, '2017-09-23', '2025-02-03', 1, 'Bojti', 'F', 0, 0, 25.3, 6, 7, 3, 6, 5, 4, 0, 'Szépen tudok pórázon sétálni és a gyerekekkel sincs problémám ha már megismerkedtem velük is. Igazán szerethető vagyok, egy tündér, legalábbis ezt sokat hallom. Természetesen a hasamat is nagyon szeretem.'),
(153, 1, '2021-04-28', '2023-08-04', 1, 'Mogyi', 'M', 1, 1, 14.8, 6, 7, 7, 4, 8, 6, 0, 'Az ő története is ugyanolyan mint az összes nálunk lévő kutyusé. Annyi a különbség talán, hogy őt agyon is akarták ütni. Éhesen bolyongott Litkén, valószínű arra felé tehették ki szegényt az autóból. Nem tűrték meg, mindenki zavarta, űzte. Ekkor szóltak nekünk és szó szerint a vasvilla elől mentettük meg szegény kutyát.\nAz embereket szereti, a fajtársaival dominál, így egyedüli kutyusnak ajánljuk.'),
(154, 1, '2024-05-01', '2024-07-25', 1, 'Pötyi', 'F', 1, 1, 7.2, 5, 4, 7, 6, 1, 4, 1, 'Pötyi egy 2024 májusi születésű, kedves és játékos kislány kutyus, aki jelenleg nálunk, a menhelyen várja, hogy végre megtalálja a szerető otthont ?. Bár most itt van, szíve már arra az otthonra vágyik, ahol végre szabadon rohangálhat a kertben ?, élvezve a játékot és a felfedezés örömét ?. Pötyi egy igazi társ is, aki utána örömmel pihen a kanapén ??, a gazdáival együtt.'),
(155, 1, '2023-07-01', '2025-02-03', 1, 'Pelyhes', 'F', 1, 1, 8.8, 4, 8, 9, 7, 8, 9, 1, 'Rendkívül aktív, pörgős, játékos kiskutya, aki imád labdázni, nagyokat futkározni, szeret ölben ülni. Ül vezényszót ismeri, szépen behívható. Örömét pörgés- forgással, ugatással fejezi ki. Más kutyákkal elfogadó, kissé domináns, macskákat nem szereti.\n\n'),
(156, 1, '2023-01-01', '2023-10-10', 1, 'Mona', 'F', 0, 1, 6.5, 8, 4, 3, 2, 2, 2, 1, 'Mona egy másfél év körüli, kis termetű, foxi jellegű szuka kutyus. Más kutyákkal való viszonya kérdéses, elsőnek barátságtalan, de türelemmel és neveléssel valószínűleg szoktatható.Veszettség elleni és kombinált oltással valamint chippelve költözne új gazdijához.\n\n'),
(157, 1, '2014-01-01', '2024-01-08', 1, 'Laura', 'F', 0, 1, 45.4, 4, 3, 5, 7, 6, 3, 0, 'Én nyílt vagyok, örülök minden jó szónak, simogatásnak. Pórázon tudok sétálni. Az embereket szeretem. Társammal jól kijövök, más fajtársammal csak később tudok ismerkedni.'),
(158, 1, '2024-11-15', '2025-01-09', 2, 'Kefír', 'M', 0, 1, 3.12, 3, 7, 5, 3, 2, 3, 0, ''),
(159, 1, '2017-05-22', '2022-11-07', 2, 'Pötyi', 'F', 0, 1, 5.34, 2, 3, 3, 2, 2, 8, 1, 'Bal hallójáratát 2022 januárjában polip miatt el kellett távolítani, ezért ez a füle egy kicsit kajla lett, ami szigorú arckifejezése mellett az ismertetőjegyévé vált.\n\nBizalmába férkőzni egyáltalán nem lehetetlen, de kitartást és sok vele töltött időt igényel.'),
(160, 1, '2024-04-20', '2025-02-04', 2, 'Kesu', 'M', 1, 1, 2.63, 3, 7, 8, 5, 1, 3, 0, 'Bemutatkozik a kőbányai tesók első tagja Kesu, aki 5 testvérével együtt 2024 tavaszán született egy elhagyatott kőbányai ház udvarán.\n\nÖnkénteseink kitartó gondozásának, szelídítésének hála, nyár végén sikeresen befogtuk őket majd elkezdtük kikupálni a bandát, hiszen hoztak magukkal vendégeket bőven; atka, bolha, férgek, amit csak egy kóbor cica összeszedhet. :(\n\nKesu azóta gyönyörű fiatal kandúrrá cseperedett, igazi kis energiabomba, nem válogatós, bármit megeszik, imád felfedezni, játszani és tesójával összebújva nagyokat szundítani.'),
(161, 1, '2015-05-08', '2020-06-22', 2, 'Negró', 'M', 1, 1, 4.19, 3, 7, 6, 3, 2, 7, 1, 'Negró, a mi gyönyörű feketepárducunk 2015. decemberében került gondozásunkba, és már többször próbálkozott gazdisodni, de sajnos valamiért mindig visszakerült hozzánk. 2015. májusában született Budaörsön. Tesójával együtt kerültek gondozásunkba, de testvére azóta már gazdis.'),
(162, 1, '2024-11-30', '2025-01-17', 2, 'Kisgiliszta', 'M', 0, 1, 2.83, 5, 0, 3, 3, 2, 4, 0, 'Élete első másfél hónapját utcán töltötte, és ez idő alatt kialakult neki egy magának való személyiség.\n\nAz alkalmazottakra fújtat amikor közel kerülnek hozzá. Az őt látogató gyerekeket kifejezetten rühelli.'),
(163, 1, '2022-01-16', '2025-02-04', 2, 'Gomba', 'M', 1, 1, 3.75, 6, 5, 5, 2, 2, 4, 0, 'Előző gazdája egy hajléktalan volt, aki egy tál gombapörköltért adta el macskáját, nevét innen kapta.'),
(164, 1, '2023-01-21', '2024-04-07', 2, 'Tapló', 'U', 0, 1, 4.05, 6, 6, 7, 3, 2, 3, 0, 'Tapló jelenleg félénk, de etetéskor közel lehet hozzá kerülni, úgyhogy valószínűleg némi türelemmel, és megértéssel hálás kanapé tigrissé fog válni! :)\n'),
(165, 2, '2023-01-29', '2024-10-29', 2, 'Kucori', 'F', 0, 1, 5.05, 7, 4, 3, 7, 2, 8, 1, 'Vannak félős cicák akiket nehéz örökbe adni. Kucori is ilyen kölyökkora óta nálunk van tesói már mind gazdisok. Pedig ha valaki időt szán arra hogy megismerje egy igazi tüneményes ölbe cica válhat belőle.'),
(166, 2, '2016-06-09', '2023-11-07', 2, 'Samu', 'M', 1, 1, 4.95, 7, 8, 7, 3, 2, 3, 1, 'Szerető családot keresünk Samu cicánknak, csak benti cica volt és szeretnénk is ha így maradna, alomhoz szoktatva, játékos szerethető cica. Olyan ne fogadja örökbe aki kertbe szeretné tartani.'),
(167, 2, '2023-05-05', '2024-07-21', 2, 'Bambusz', 'F', 0, 1, 3.05, 5, 3, 2, 3, 2, 3, 1, 'Bambusz vagyok. 2 év körüli kislány. Kőbányán éltem egy kolóniában. Nekem szerencsém volt, mert kimentettek még mielőtt mentek a munkagépek a területre.'),
(168, 6, '2002-01-17', '2024-05-29', 4, 'Henrik', 'M', 0, 1, 217, 3, 4, 6, 7, 2, 6, 0, 'Henrik 23 éves, de kifogástalan állapotú, nagyon mutatós pej herélt. Bár visszaadásának egyik oka az volt, hogy agresszív más lovakkal, mi ennek továbbra sem tapasztaljuk semmi jelét.'),
(169, 6, '2020-07-15', '2023-10-25', 4, 'Matyika', 'M', 1, 1, 238, 6, 1, 2, 7, 1, 1, 0, 'Semmiféle trükkre sem lehet megtanítani.\n\nMatyika hajnalban gyakran felkel és nyeríteni  kezd.'),
(170, 6, '2020-11-13', '2023-08-08', 4, 'Tóni a póni', 'M', 1, 1, 219, 7, 5, 3, 6, 1, 9, 0, 'Tóni, a póni egy igazán kedves és tanulékony kis paripa. A természetéből adódóan gyorsan tanul, és mindig készen áll új dolgokat felfedezni. Mivel ivartalanított, nyugodtabb és kiegyensúlyozottabb, ami segíti abban, hogy könnyen alkalmazkodjon a különböző helyzetekhez és környezetekhez.'),
(171, 8, '2018-03-14', '2023-11-16', 2, 'Imre', 'M', 1, 1, 4.15, 3, 1, 2, 3, 2, 4, 1, 'Imre fújtat az alkalmazottakra, kifejezetten ideges lesz ha valaki simogatni akarja.\n\nA legdühösebb akkor lesz ha gyerek látogatók vannak a közelében.'),
(172, 8, '2015-07-16', '2022-11-18', 2, 'Böröcki Ilona', 'F', 0, 1, 4.35, 3, 8, 7, 3, 3, 2, 1, 'Kis bújós, dorombolós cica, lehet őt bárhogy gyömöszölni, nagyon boldog tőle. Természetesen szobatiszta, lelkes sorozat néző, van rengeteg játéka, amivel agyonfárasztja magát.'),
(173, 8, '2024-06-05', '2024-08-30', 2, 'Feró', 'M', 0, 1, 2.85, 8, 7, 6, 4, 2, 5, 0, 'Finci eleven, életvidám, minden lében kanál, majdnem 1 éves zsivány kandúrka.'),
(174, 8, '2022-06-22', '2022-12-22', 1, 'Grafit', 'M', 0, 1, 13.8, 6, 7, 6, 8, 3, 8, 0, '\nGrafit 2022-ben született, husky legényke. Egy csúnya sérüléssel a nyakán érkezett hozzánk. Szépen gyógyultak a sebei. \n\nKajla gyerek még, hatalmas energiákkal. A pórázt már egészen jól használja. Sok foglalkozást igényel, és ami nagyon fontos, hogy a munkakutyák csoportjába tartozik, dolgoztatni kell, feladatokat kell neki adni, akkor érzi jól magát.'),
(175, 8, '2021-07-21', '2021-12-26', 1, 'Lord', 'M', 1, 1, 26.85, 5, 7, 8, 6, 2, 8, 0, 'Kis kölyökként került be a menhelyre, és őrkutyaként él jelenleg. Nem tudni miért, de senki nem akarta őt örökbefogadni.\n\nDe úgy gondoljuk, hogy ő nem erre hivatott. Nem őrkutyának való. Ő családi kutyának való. Egy fantasztikusan jó kutya. Szocializált, kedves, játékos kutya. Imád sétálni és szépen is közlekedik pórázon. Sokat tanult , de ha valaki nem sajnálja tőle az időt akkor tanulhatnának akár együtt is . Mindenképpen csak családi kutyának adjuk örökbe. Amúgy egy nagyon okos, szófogadó , jó természetű kutya. Ismerkedés után akár egy otthoni kutya új társa is lehetne.'),
(176, 8, '2022-02-28', '2023-03-02', 1, 'Aslan', 'M', 0, 1, 16.35, 7, 8, 9, 6, 4, 7, 0, 'Aslan 2022ben született. Talán border, és valamilyen terrier keveréke. Ennek megfelelően élénk, figyelmes, és nagyon szeret játszani.\n\nKözepes termetű, a bundája nem igényel különösebb gondozást. Nagyon jó fej, imádja az embereket. Türelmes, és érdeklődő. Szuper választás családi kutyának.'),
(177, 8, '2023-07-15', '2023-11-25', 1, 'Anton', 'M', 0, 1, 7.1, 5, 6, 7, 5, 1, 3, 0, 'Jelenleg több kutyával él együtt, így akár második kutyusnak is költözhet. Persze sok mindent meg kell tanulnia még, de reméljük ezt már a gazdival közösen teszi.'),
(178, 8, '2024-02-10', '2024-03-11', 1, 'Zsüti', 'F', 0, 1, 7.2, 5, 7, 4, 6, 1, 4, 0, 'Foxihoz képest nyugis, nem pörög, nem hangoskodik feleslegesen. Persze ez még változhat, ha teljesen kinyílik, hiszen látszik rajta, hogy még bizonytalan. Sok foglalkozást, és szeretet igényel majd. Az sem baj, ha másik kutyus mellé költözik, aki bátorítja.'),
(179, 8, '2023-05-15', '2023-10-11', 1, 'Szirom', 'F', 0, 1, 7.85, 4, 5, 7, 6, 1, 5, 0, 'Bújós, kedves, inkább ölbe, mint pórázon közlekedik.\n\nNagyon szereti a többi kutya társaságát, szeret játszani. Igazán lakásban tudnánk elképzelni, hiszen olyan kis picurka, igazi kanapé kutya.'),
(180, 8, '2024-03-15', '2024-04-07', 1, 'Dinó', 'M', 0, 1, 17.15, 6, 8, 7, 8, 2, 5, 0, 'Nagyon barátságos, a pórázzal ügyesen ismerkedik. Korának megfelelően még kajla, és nagy energiák tombolnak benne. Igényli a játékot, foglalkozást.'),
(181, 8, '2022-02-02', '2022-05-14', 1, 'Töki', 'M', 1, 1, 11.85, 6, 5, 7, 6, 1, 7, 0, 'Nem volt könnyű eset, Eleinte, csípett, rúgott, harapott, akit ért, annyira félt. Hosszú hónapok teltek el, mire kézbe lehetett venni.\n\nAzóta rengeteget változott. A többi kutyával szuperül viselkedik. Megtanulta a póráz használatát is, és nagyon szépen sétál.'),
(182, 8, '2021-01-01', '2022-05-20', 1, 'Ken', 'M', 1, 1, 3.45, 6, 2, 4, 3, 3, 4, 0, 'Gyerek látogatóira legtöbb esetben csak ugat és vicsorog, simogatásokat tőlük nem enged.\n\nKisgyerekes családba az örökbefogadását nem ajánljuk.'),
(183, 8, '2020-11-12', '2023-10-19', 1, 'Hófehérke', 'F', 0, 1, 7.1, 7, 8, 7, 5, 4, 6, 0, 'Bújós és ragaszkodó. A többi kutyával is nagyon jó a kapcsolata, így a későbbekben sem lesz gond a futtatóban. Tökéletes választás családi kedvencnek.'),
(184, 8, '2019-09-09', '2022-07-15', 1, 'Sam', 'M', 1, 1, 21.15, 3, 6, 7, 5, 4, 3, 0, 'Bár komornak tűnik a pofija, de csak a sminkje nem sikerült jól. A morcos pofi mögött, egy tüneményes, kedves kutya van.\n\nHatározottan kedveli a többi kutya társaságát, nagyokat játszik velük, így akár második kutyának is költözhet.\n'),
(185, 4, '2019-11-19', '2023-03-23', 1, 'Tina', 'F', 0, 1, 11.15, 9, 8, 9, 6, 4, 5, 0, 'Türelmes, nem tolakodó, mindig megvárja, hogy rá kerüljön a sor, de akkor aztán élvezi, ha végre egy ember közelében lehet. Igényli az emberek közelségét, és a foglalkozást. Szuper családi kutya válhat belőle.'),
(186, 4, '2017-04-12', '2021-10-10', 1, 'Vidor', 'M', 0, 1, 62.5, 3, 5, 6, 7, 5, 9, 0, 'Kedves, barátságos, és nagyon okos. Figyeli az ember minden mozdulatát, a leendő gazdival, biztos jó lesz a kapcsolata. Érdemes lenne munkakutyaként gondolni rá. Aktív gazdit keresünk mellé.'),
(187, 4, '2018-08-25', '2021-10-19', 1, 'Pam', 'F', 0, 1, 12.85, 6, 8, 6, 5, 7, 8, 0, 'Családi kutyánka tökéletes. Imádja amikor gyerekek látogatják a menhelyen, kifejeztten élvezi a társaságuk. Végtelenül kedves, szerény, tanulékony, szófogadó kutya.'),
(188, 4, '2023-01-10', '2023-10-20', 1, 'Panni', 'F', 0, 1, 2.5, 4, 5, 4, 3, 8, 4, 0, 'Panni, nagyon retteg, legszívesebben a földbe bújna, ha ember közelít felé. De, ez a viselkedés kezelhető, szeretettel, simogatással. Még sok munka vár a leendő gazdira.'),
(189, 4, '2020-03-10', '2022-10-30', 1, 'Iván', 'M', 1, 1, 25.1, 6, 7, 6, 5, 1, 3, 0, 'Iván nagyon kis bújós, inkább a félénkebb kutyák táborát erősíti. Sok simire, és szeretgetésre van szüksége, hogy visszanyerje önbizalmát. \n\nPórázon már ügyeskedik, bár sok időbe telt mire beletanult. Ha végre kap egy családot, akkor tökéletes kedvenc válhat belőle.'),
(190, 4, '2020-04-10', '2023-01-14', 1, 'Napóleon', 'M', 0, 1, 48.95, 6, 5, 6, 8, 4, 6, 0, 'Óriás termetű, egyértelmű, hogy szüksége van mozgástérre. Egy jó nagy területen érezné magát jól igazán.\n\nEngedelmesen, szépen viselkedik, nem agresszív. A pórázzal sincs gondja. De a hatalmas mérete miatt, határozott, erőskezű gazdát igényel.'),
(191, 4, '2019-09-10', '2023-10-22', 2, 'Lóci', 'M', 1, 1, 5.85, 3, 5, 4, 3, 2, 4, 1, 'Eleinte az emberektől nagyon félt. Bekerülése óta sokat változott, de még mindig visszahúzódóbb. Más cicákkal jól kijön. Egy szerető és kitartó gazdira és nyugodt körülményekre van szüksége, hogy feloldódhasson.\n\nLócit szerződéssel és kizárólag benti tartásra adjuk örökbe.'),
(192, 4, '2022-02-13', '2023-12-29', 2, 'Virág', 'F', 0, 1, 5.65, 6, 5, 4, 3, 3, 4, 1, 'Virág nagyon kíváncsi cica, szeret mindent szemmel tartani, az ablakban ücsörögni, és természetesen a finom falatokat sem veti meg.\n\nMás cicákkal jól elvan, egyáltalán nem domináns, de egyedüli kedvencnek is szívesen ajánljuk őt. \n\nMég kicsit bizalmatlan, így egy olyan türelmes gazdi jelentkezését várja, aki nem bánja, hogy ő a többieknél lassabban oldódik és udvarolni kell neki.'),
(193, 4, '2015-01-15', '2022-12-20', 2, 'Vincent', 'M', 1, 1, 5.4, 6, 8, 9, 5, 3, 7, 1, 'Vincent egy 10 éves, ivartalan öregúr. Nagyon nyugodt természetű, borzasztóan kedves, imádja a simogatást, a hasvakargatást is követeli. Szinte folyamatosan bújik, dorombol, annyira örül az embernek. Más cicákkal is kedves, közömbös, a kutyáktól sem tart. Ha szólnak neki, azonnal odajön. \n\nTényleg tökéletes társ, de már bőven nem kiscica, ő egy békés, meleg otthonra vágyik, ahol nyugdíjas éveit töltheti'),
(194, 4, '2024-06-10', '2024-10-17', 2, 'Jax', 'M', 0, 1, 3.1, 6, 7, 8, 6, 2, 4, 0, 'Mint minden kiscica ő is imád játszani, hatalmas fogócska és birkózó bajnokságokat rendeznek barátaival. Tökéletes választás lenne egyedüli házikedvencnek, de másik macska mellett is jól érezné magát.\n\nSimire azonnal dorombol, imádja a hasát, főleg ha jutifaliról van szó, nagyon tud érte hízelegni. Hűtőnyitáskor azonnal ott terem.'),
(195, 4, '2024-04-16', '2025-02-06', 2, 'Pöci', 'M', 0, 1, 3.25, 6, 7, 8, 5, 2, 3, 0, 'Nagyon kedves, puha bundájú kandúr, aki vékony hangján nyávogva keresi az embert, ha törősésre vágyik. Játékos, símogatásra pedig azonnal az oldalára dőlve dorombol.'),
(196, 4, '2022-04-13', '2024-07-15', 2, 'Pukkancs', 'M', 0, 1, 5.15, 6, 2, 4, 4, 2, 7, 0, 'Könnyen tanul, nálunk nem rongál semmit, csak a saját játékait és kaparófáit használja, önállóan egyedül alszik, nem igényli a közös alvást.\n\nCsak benti tartásra adjuk, mivel veszély érzete sajnos nincs. Egyedüli kisállat a lakásban, így mindenképp egyedüli cicaként szeretnénk az új gazdinak odaadni. Gyerekekkel sincs tapasztalata.'),
(197, 5, '2022-02-02', '2024-05-26', 1, 'Buksi', 'M', 0, 1, 27.5, 7, 4, 2, 6, 4, 3, 0, 'Azt semmiképpen nem mondhatjuk, hogy Ő egy bősz házőrző. Inkább egy ijedős nyuszika.\n\nBiztos oka van, hogy ennyire tart az emberektől, pedig a mostani állapota már klasszisokkal jobb, mint a beérkezési állapot. biztos bántották, és emiatt, nagyon kell rá vigyázni, és szeretni, hogy elhiggye, soha nem történhet vele meg újra.'),
(198, 5, '2021-01-15', '2024-03-22', 1, 'Drazsé', 'M', 1, 1, 16.85, 5, 7, 8, 6, 5, 6, 0, 'Drazsé nagyon hamar nyitott, örömmel fogad minden simogatást, szeretetet. Családba is nagyon jó választás, ez a játékos legényke.'),
(199, 5, '2020-08-17', '2023-12-10', 1, 'Olivér', 'M', 0, 1, 16.9, 7, 6, 7, 6, 2, 4, 0, 'Nagyon cuki, kedves, bújós , jó természetű kutya. Pórázon is jól sétál és más kutyákkal is jól érzi magát. Jelenleg is együtt él más kutyákkal.'),
(200, 5, '2022-12-12', '2024-05-10', 1, 'Pöttyös', 'F', 0, 1, 19.9, 6, 8, 5, 6, 0, 2, 0, 'Pöttyös egy nagyon kedves kutya. De ha póráz kerül rá retteg. Szépen fokozatosan dolgozunk vele és már nagyon jól halad. Már kimerészkedik a helyéről. Igaz nagy sétákat nem lehet vele még tenni, de alakul. Számára mindenképpen olyan gazdi lenne tökéletes aki nagyon sok időt tud rá fordítani. Aki hagyja a saját tempójában nyílni az emberek felé. Nem lesz ő rossz kutya csak el kell hinnie, hogy vannak még jó gazdik.'),
(201, 5, '2020-04-10', '2023-07-17', 1, 'Tana', 'F', 0, 1, 28.1, 5, 8, 7, 5, 6, 5, 0, 'Tipikus családi kutyusnak ajánljuk. Pórázon ügyesen sétál. Nem egy ugatós típus. Az tuti ha valaki őt választja egy hálás kutyust vihet majd haza.'),
(202, 5, '2021-01-11', '2023-12-22', 1, 'Arni', 'F', 0, 1, 36, 5, 6, 8, 6, 1, 7, 0, 'Kedves, bújós, barátságos. Nagyon rossz élete lehetett, hiszen csont soványan került be a telepre. Most már elkezdte magát szépen összeszedni. Rosszat nem lehet róla mondani, nagyon jól alkalmazkodik.'),
(203, 5, '2023-04-04', '2024-05-16', 1, 'Inu', 'M', 0, 1, 10.25, 8, 7, 7, 6, 3, 5, 0, 'Közepes termetű, a bundája nem igényel különösebb gondozást. Nagyon jó fej, imádja az embereket. Türelmes, és érdeklődő. Szuper választás családi kutyának.'),
(204, 5, '2023-10-15', '2024-11-22', 1, 'Aslan', 'M', 0, 1, 32.7, 5, 6, 7, 8, 2, 4, 0, 'Ügyes, gyorsan tanul, a pórázzal még csak most ismerkedik. Aktív gazdikat keresünk mellé, mert bizony van benne energia rendesen.'),
(205, 5, '2022-12-31', '2024-06-15', 1, 'Pajti', 'M', 1, 1, 4.3, 5, 8, 6, 7, 1, 4, 0, '2022-ben született, most éli ifjú felnőtt éveit. Mindenképpen aktív gazdikat keresünk mellé, akik kellően le tudják fárasztani, és akkor szuper párost alkothatnak a gazdival.'),
(206, 5, '2021-07-17', '2023-12-20', 1, 'Labi', 'F', 0, 1, 26, 6, 5, 6, 5, 1, 3, 0, 'Rosszul viseli a hideget, ő lakásban szeretne élni, ahol meleg van.\n\nOkos, szófogadó kislány.'),
(207, 7, '2022-10-10', '2023-01-10', 8, 'Fang', 'M', 0, 1, 21, 3, 1, 2, 1, 0, 3, 0, ''),
(208, 7, '2023-01-22', '2023-12-10', 8, 'Kobra', 'U', 0, 1, 4.5, 2, 1, 2, 1, 0, 3, 0, ''),
(209, 7, '2024-01-01', '2025-02-01', 8, 'Loki', 'M', 0, 1, 4.9, 3, 1, 2, 1, 0, 3, 0, ''),
(210, 7, '2020-03-20', '2023-11-11', 8, 'Piton', 'M', 0, 1, 27.5, 2, 1, 2, 1, 0, 3, 0, ''),
(211, 7, '2023-03-13', '2024-04-14', 8, 'Nagini', 'M', 0, 1, 5.75, 2, 1, 3, 2, 0, 1, 0, ''),
(212, 1, '2024-12-20', '2025-02-03', 10, 'Málna', 'F', 0, 1, 1.3, 6, 9, 7, 1, 2, 4, 0, ''),
(213, 1, '2023-05-20', '2024-06-15', 10, 'Karamella', 'F', 0, 1, 3.25, 5, 8, 7, 1, 2, 4, 0, ''),
(214, 1, '2024-02-15', '2024-09-11', 10, 'Pille', 'F', 0, 1, 4.15, 5, 9, 8, 2, 3, 4, 0, ''),
(215, 1, '2024-12-10', '2025-01-10', 10, 'Barni', 'M', 0, 1, 2.05, 7, 10, 9, 3, 2, 1, 0, ''),
(216, 7, '2009-09-10', '2024-02-01', 6, 'Zöldike', 'M', 0, 1, 0.35, 7, 8, 7, 2, 0, 7, 0, ''),
(217, 2, '2015-05-15', '2024-01-09', 6, 'Csőrike', 'F', 0, 1, 0.28, 8, 9, 7, 2, 0, 7, 0, ''),
(218, 7, '2017-07-07', '2023-12-25', 6, 'Picur', 'M', 0, 1, 0.27, 6, 8, 7, 2, 0, 7, 0, ''),
(219, 2, '2011-11-19', '2023-07-10', 6, 'Turbó', 'M', 0, 1, 0.325, 8, 9, 7, 2, 0, 8, 0, ''),
(220, 7, '2020-02-27', '2024-12-10', 6, 'Pitypang', 'F', 0, 1, 0.295, 6, 7, 8, 2, 0, 8, 0, ''),
(221, 2, '2001-06-27', '2025-01-01', 6, 'Kukucs', 'M', 0, 1, 0.28, 6, 7, 6, 2, 0, 7, 0, ''),
(222, 7, '2010-10-02', '2019-09-09', 6, 'Szivárvány', 'M', 0, 1, 0.27, 7, 4, 5, 3, 0, 6, 0, ''),
(223, 2, '2023-02-14', '2024-10-27', 6, 'Korall', 'U', 0, 1, 0.31, 7, 6, 8, 2, 0, 7, 0, ''),
(224, 7, '2018-08-30', '2022-08-21', 6, 'Rubin', 'M', 0, 1, 0.3, 7, 6, 7, 3, 0, 5, 0, ''),
(225, 2, '2020-08-05', '2023-07-07', 6, 'Mango', 'U', 0, 1, 0.315, 4, 6, 7, 2, 0, 4, 0, ''),
(226, 7, '2017-07-27', '2021-01-30', 6, 'Smaragd', 'M', 0, 1, 0.3, 7, 8, 7, 2, 0, 5, 0, ''),
(227, 2, '2020-05-20', '2023-07-12', 6, 'Zafír', 'M', 0, 1, 0.29, 6, 9, 8, 2, 0, 7, 0, ''),
(228, 7, '2019-09-21', '2024-09-17', 6, 'Kéki', 'U', 0, 1, 0.28, 8, 7, 6, 1, 0, 4, 0, ''),
(229, 2, '2019-08-20', '2024-05-09', 6, 'Papaya', 'F', 0, 1, 0.32, 4, 6, 5, 2, 0, 4, 0, ''),
(230, 7, '2023-08-23', '2024-05-10', 6, 'Rico', 'M', 0, 1, 0.33, 8, 6, 7, 2, 0, 5, 0, ''),
(231, 2, '2018-08-18', '2019-09-19', 6, 'Paco', 'U', 0, 1, 0.265, 3, 6, 5, 2, 0, 3, 0, ''),
(232, 7, '2016-06-15', '2021-05-29', 6, 'Lola', 'F', 0, 1, 0.41, 6, 9, 8, 3, 0, 5, 0, ''),
(233, 2, '2019-12-24', '2023-09-26', 6, 'Coco', 'M', 0, 1, 0.44, 5, 4, 3, 2, 0, 7, 0, ''),
(234, 7, '2017-07-30', '2022-06-20', 6, 'Chico', 'U', 0, 1, 0.425, 6, 8, 7, 3, 0, 8, 0, ''),
(235, 2, '2023-03-03', '2024-04-30', 6, 'Sol', 'M', 0, 1, 0.45, 6, 7, 8, 3, 0, 2, 0, ''),
(236, 7, '2015-08-12', '2021-03-07', 6, 'Csip', 'F', 0, 1, 0.47, 5, 4, 3, 2, 0, 8, 0, ''),
(237, 2, '2020-08-18', '2025-02-07', 6, 'Menta', 'F', 0, 1, 0.37, 5, 2, 3, 2, 0, 2, 0, ''),
(238, 7, '2019-12-10', '2022-06-30', 6, 'Maja', 'F', 0, 1, 0.4, 2, 4, 5, 2, 0, 3, 0, ''),
(239, 2, '2018-07-10', '2023-01-10', 6, 'Max', 'U', 0, 1, 0.45, 7, 6, 8, 3, 0, 9, 0, ''),
(240, 7, '2017-07-20', '2023-03-23', 6, 'Milo', 'M', 0, 1, 0.39, 6, 3, 4, 2, 0, 5, 0, ''),
(241, 2, '2016-06-16', '2024-09-17', 6, 'Füttyös', 'M', 0, 1, 0.39, 7, 6, 8, 3, 0, 7, 0, ''),
(242, 3, '2023-12-10', '2024-06-20', 5, 'Pötty', 'M', 0, 1, 0.031, 6, 8, 6, 2, 2, 3, 0, ''),
(243, 8, '2024-06-01', '2025-02-02', 5, 'Picúr', 'U', 0, 1, 0.03, 5, 7, 6, 2, 2, 1, 0, ''),
(244, 3, '2024-08-10', '2024-10-13', 5, 'Pamacs', 'F', 0, 1, 0.029, 6, 8, 7, 1, 2, 3, 0, ''),
(245, 8, '2023-12-13', '2024-12-30', 5, 'Pici', 'M', 0, 1, 0.028, 6, 9, 7, 2, 2, 4, 0, ''),
(246, 3, '2025-01-10', '2025-02-08', 5, 'Szöszke', 'F', 0, 1, 0.026, 6, 7, 4, 2, 2, 1, 0, ''),
(247, 8, '2024-07-12', '2024-09-27', 5, 'Szotyi', 'U', 0, 1, 0.031, 7, 8, 7, 2, 2, 3, 0, ''),
(248, 3, '2024-01-21', '2024-09-08', 5, 'Süti', 'F', 0, 1, 0.032, 6, 7, 5, 1, 2, 1, 0, ''),
(249, 8, '2024-12-25', '2024-12-25', 5, 'Hógolyó', 'M', 0, 1, 0.023, 7, 10, 8, 2, 2, 1, 0, ''),
(250, 3, '2024-09-11', '2025-02-03', 5, 'Gombóc', 'F', 0, 1, 0.027, 7, 9, 8, 2, 2, 3, 0, ''),
(251, 8, '2023-02-24', '2025-02-08', 5, 'Zsömle', 'M', 0, 1, 0.033, 7, 8, 9, 2, 2, 4, 0, ''),
(252, 3, '2024-10-17', '2025-01-10', 5, 'Mandula', 'M', 0, 1, 0.032, 8, 10, 9, 2, 2, 3, 0, ''),
(253, 6, '2017-07-17', '2023-01-10', 4, 'Villám', 'M', 1, 1, 214, 4, 5, 5, 8, 1, 8, 0, ''),
(254, 6, '2018-08-29', '2024-01-30', 4, 'Csillag', 'F', 0, 1, 227, 3, 2, 3, 7, 1, 5, 0, ''),
(255, 6, '2020-03-20', '2024-01-19', 4, 'Holdfény', 'M', 1, 1, 209, 5, 4, 5, 8, 1, 3, 0, ''),
(256, 6, '2022-02-13', '2023-12-19', 4, 'Igor', 'M', 0, 1, 247.5, 3, 2, 4, 7, 1, 2, 0, ''),
(257, 6, '2017-09-19', '2023-11-20', 4, 'Sólyom', 'M', 1, 1, 191, 4, 6, 8, 7, 1, 2, 0, ''),
(258, 7, '2024-05-17', '2025-02-05', 3, 'Uszony', 'U', 0, 1, 0.041, 3, 6, 5, 2, 0, 0, 0, ''),
(259, 3, '2025-01-10', '2025-01-10', 3, 'Kékes', 'M', 0, 1, 0.023, 2, 4, 4, 2, 0, 0, 0, ''),
(260, 7, '2024-12-11', '2025-01-07', 3, 'Guppika', 'F', 0, 1, 0.029, 6, 7, 5, 2, 0, 0, 0, ''),
(261, 3, '2024-04-01', '2024-09-19', 3, 'Szellő', 'M', 0, 1, 0.032, 3, 4, 5, 2, 0, 0, 0, ''),
(262, 7, '2024-05-17', '2025-01-02', 3, 'Jani', 'M', 0, 1, 0.21, 6, 9, 7, 2, 0, 0, 0, ''),
(263, 3, '2024-07-10', '2024-08-09', 3, 'Narancs', 'F', 0, 1, 0.27, 4, 6, 5, 2, 0, 0, 0, ''),
(264, 7, '2024-07-19', '2024-07-19', 3, 'Kraken', 'U', 0, 1, 0.28, 5, 7, 8, 2, 0, 0, 0, ''),
(265, 3, '2024-05-25', '2024-06-30', 3, 'Nemo', 'M', 0, 1, 0.21, 4, 9, 7, 2, 0, 0, 0, 'Egyszer eltűnt és meg kellett keresni.'),
(266, 7, '2023-01-20', '2023-03-30', 3, 'Marlin', 'M', 0, 1, 0.23, 7, 4, 5, 2, 0, 0, 0, 'Egyszer eltűnt a fia és megkereste.'),
(267, 9, '2024-10-02', '2025-02-09', 10, 'Pamacs', 'F', 0, 1, 3.5, 9, 10, 8, 2, 3, 4, 0, ''),
(268, 9, '2023-12-20', '2025-01-09', 10, 'Ugrifüles', 'M', 0, 1, 4.35, 3, 7, 6, 2, 2, 3, 0, ''),
(269, 9, '2024-01-10', '2024-09-21', 10, 'Hoppancs', 'M', 0, 1, 3.9, 6, 7, 8, 2, 2, 1, 0, ''),
(270, 9, '2022-12-30', '2024-04-19', 10, 'Barni', 'M', 0, 1, 4.35, 3, 5, 4, 2, 1, 3, 0, ''),
(271, 9, '2024-12-28', '2024-12-28', 10, 'Zsebi', 'F', 0, 1, 1.35, 10, 10, 9, 2, 2, 4, 0, ''),
(272, 7, '2024-06-10', '2024-06-10', 7, 'Ropika', 'M', 0, 1, 0.045, 4, 7, 6, 2, 0, 4, 0, ''),
(273, 7, '2024-05-10', '2025-01-03', 7, 'Gyorsacska', 'M', 0, 1, 0.038, 5, 6, 4, 2, 0, 3, 0, ''),
(274, 7, '2019-09-19', '2024-02-05', 7, 'Sári', 'F', 0, 1, 0.038, 5, 7, 4, 2, 0, 1, 0, ''),
(275, 7, '2021-01-20', '2024-04-11', 7, 'Fickó', 'M', 0, 1, 0.039, 4, 3, 2, 2, 0, 1, 0, ''),
(276, 3, '2023-12-21', '2025-01-17', 3, 'Bubi', 'M', 0, 1, 0.28, 3, 4, 5, 2, 0, 0, 0, ''),
(277, 3, '2023-10-21', '2024-05-17', 3, 'Vili', 'M', 0, 1, 0.29, 5, 8, 6, 2, 0, 0, 0, ''),
(278, 9, '2022-12-22', '2024-03-05', 2, 'Cirmi', 'M', 1, 1, 4.5, 7, 6, 7, 2, 4, 1, 0, 'Menhelyre kerülésekor még nagyon félénk és visszahúzódó volt, de azóta sokat változott.'),
(279, 9, '2022-01-20', '2023-12-27', 2, 'Falánk', 'M', 1, 1, 4.2, 6, 5, 4, 2, 3, 1, 1, 'A menhely összes cicája közül ő eszik a legtöbbet, megállás nélkül tud enni, nevét is innen kapta.'),
(280, 9, '2021-01-10', '2024-07-23', 2, 'Manxi', 'F', 0, 1, 4.55, 4, 2, 3, 2, 2, 4, 1, 'Nehéz élete lehetett mielőtt bekerült a menhelyre, mert nagyon félénk, és visszahúzódó mai napig. Sok türelmet, szeretetet, és törődést igényel.'),
(281, 9, '2022-02-01', '2024-05-20', 2, 'Hópihe', 'F', 0, 1, 4.2, 6, 8, 5, 2, 4, 1, 0, 'Kizárólag csak lakásba fogadható örökbe, kinti tartásra nem adjuk örökbe!'),
(282, 9, '2018-07-20', '2022-07-18', 2, 'Nándor', 'M', 1, 1, 3.95, 2, 1, 3, 2, 2, 5, 1, 'Csak kinti tartásra adjuk örökbe, miután rossz természete miatt minden körülötte lévő bútort pár nap leforgása alatt szétkarmol, tönkretesz.\n\nGyerekekkel nincs jóban, fújtat rájuk, ezért gyerekes családba nem ajánljuk örökbefogadását.'),
(283, 9, '2023-08-21', '2024-09-23', 2, 'Micike', 'F', 1, 1, 3.2, 5, 4, 5, 6, 1, 8, 1, 'Rendkívül kíváncsi, mozgékony, és tanulékony macska.\n\nTrükköket tud, az alap parancsokat tudja: állj, gyere, ne, ülj, feküdj.\n\nA többi cicához képest hipermozgékony, egész nap csak futkározik és ugrál, ezért olyan családba adjuk csak örökbe, akik udvart biztosítani tudnak.'),
(284, 9, '2022-03-10', '2023-01-22', 2, 'Foltos', 'M', 1, 1, 4.1, 2, 3, 4, 1, 2, 1, 0, '2 évnyi ittléte alatt sem tudtuk megtanítani szobatisztaságra, illetve semmilyen más trükkre sem.'),
(285, 9, '2024-12-30', '2025-02-09', 2, 'Pici', 'F', 0, 1, 2.1, 6, 8, 7, 4, 5, 2, 0, 'Kistermetű, fiatal, aranyos, és szeretetet nagyon igénylő cica.'),
(286, 5, '2019-07-10', '2023-11-07', 2, 'Kormi', 'M', 0, 1, 4.35, 3, 8, 7, 1, 2, 3, 0, 'Menhelyre bekerülésekor vad természetű volt, de mára egy nyugodt, kedves és aranyos cica lett belőle.'),
(287, 5, '2021-01-02', '2023-03-21', 2, 'Yoda', 'M', 1, 1, 3.75, 2, 1, 6, 3, 0, 4, 1, 'Gyerekekkel egyáltalán nem jön ki jól, ezért örökbefogadását csak gyerekmentes családokba ajánljuk.'),
(288, 5, '2017-04-20', '2023-01-19', 2, 'Cicu', 'F', 0, 1, 4.1, 4, 5, 4, 3, 2, 1, 0, 'A többi macskával ellentétben, ő imád úszni, szereti amikor fürdetik, sőt a menhely pici medencéjében tölti napjainak jelentős részét.'),
(289, 5, '2022-05-30', '2024-07-18', 2, 'Hamu', 'M', 1, 1, 4.25, 6, 8, 9, 3, 2, 1, 0, 'Nevét (ki gondolta volna) szürke színéről adta neki egyik gondozónk.'),
(290, 5, '2024-11-22', '2024-11-22', 2, 'Tündérke', 'F', 0, 1, 1.85, 9, 10, 8, 2, 3, 1, 0, 'Végtelenül aranyos, közvetlen, szeretetet igénylő kiscica.'),
(291, 5, '2017-02-02', '2024-01-03', 2, 'Kétszáz', 'M', 1, 1, 4.2, 6, 4, 5, 2, 4, 3, 1, 'Nevét azért kapta a menhelytől, mert ő volt a kétszázadik állat a menhely történetében.');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `breedjunction`
--

CREATE TABLE `breedjunction` (
  `animalId` int(11) NOT NULL,
  `breedId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin2 COLLATE=latin2_hungarian_ci;

--
-- A tábla adatainak kiíratása `breedjunction`
--

INSERT INTO `breedjunction` (`animalId`, `breedId`) VALUES
(20, 62),
(21, 63),
(22, 48),
(23, 47),
(25, 61),
(8, 64),
(11, 38),
(1, 2),
(1, 7),
(9, 65),
(16, 36),
(2, 27),
(12, 42),
(3, 31),
(13, 26),
(5, 9),
(14, 32),
(6, 28),
(4, 39),
(15, 4),
(15, 12),
(10, 34),
(7, 31),
(27, 46),
(28, 44),
(28, 46),
(26, 46),
(18, 44),
(19, 46),
(29, 55),
(30, 56),
(31, 54),
(32, 54),
(33, 54),
(33, 55),
(34, 55),
(34, 56),
(35, 54),
(35, 55),
(36, 29),
(37, 20),
(38, 18),
(39, 16),
(40, 3),
(41, 10),
(42, 25),
(43, 29),
(43, 30),
(44, 13),
(45, 6),
(46, 8),
(47, 24),
(48, 1),
(48, 4),
(49, 15),
(50, 26),
(51, 32),
(52, 32),
(53, 32),
(54, 23),
(55, 12),
(56, 5),
(57, 18),
(58, 21),
(59, 13),
(150, 6),
(150, 63),
(151, 1),
(151, 3),
(152, 3),
(153, 68),
(154, 5),
(154, 6),
(155, 68),
(156, 70),
(157, 71),
(158, 72),
(159, 72),
(160, 72),
(161, 72),
(162, 24),
(163, 72),
(164, 72),
(164, 26),
(165, 72),
(165, 29),
(166, 25),
(167, 72),
(168, 64),
(169, 37),
(170, 39),
(171, 72),
(171, 26),
(172, 72),
(173, 72),
(173, 29),
(174, 4),
(175, 3),
(176, 5),
(176, 14),
(177, 70),
(178, 70),
(179, 62),
(180, 2),
(181, 6),
(182, 11),
(183, 9),
(184, 71),
(185, 1),
(186, 69),
(187, 68),
(188, 13),
(189, 14),
(190, 71),
(191, 72),
(192, 27),
(193, 21),
(194, 25),
(195, 18),
(196, 23),
(197, 16),
(198, 5),
(199, 4),
(200, 8),
(201, 7),
(202, 10),
(203, 12),
(204, 63),
(205, 62),
(206, 2),
(207, 49),
(208, 50),
(209, 50),
(210, 48),
(211, 50),
(212, 57),
(213, 60),
(214, 59),
(215, 58),
(216, 53),
(217, 53),
(218, 53),
(219, 53),
(220, 53),
(221, 51),
(222, 51),
(223, 51),
(224, 51),
(225, 51),
(226, 73),
(227, 73),
(228, 73),
(229, 73),
(230, 73),
(231, 73),
(232, 74),
(233, 74),
(234, 74),
(235, 74),
(236, 74),
(237, 52),
(238, 52),
(239, 52),
(240, 52),
(241, 52),
(242, 42),
(243, 42),
(244, 42),
(245, 41),
(246, 41),
(247, 40),
(248, 40),
(249, 43),
(250, 43),
(251, 65),
(252, 65),
(253, 37),
(254, 64),
(255, 38),
(256, 36),
(257, 39),
(258, 34),
(259, 34),
(260, 32),
(261, 32),
(262, 31),
(263, 31),
(264, 31),
(265, 75),
(266, 75),
(267, 58),
(268, 61),
(269, 59),
(270, 60),
(271, 57),
(272, 45),
(273, 44),
(274, 46),
(275, 47),
(276, 75),
(277, 75),
(278, 21),
(279, 20),
(280, 26),
(281, 19),
(282, 24),
(283, 18),
(284, 28),
(285, 25),
(286, 30),
(287, 17),
(288, 72),
(289, 29),
(290, 23),
(291, 19),
(17, 26);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `breeds`
--

CREATE TABLE `breeds` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `speciesId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin2 COLLATE=latin2_hungarian_ci;

--
-- A tábla adatainak kiíratása `breeds`
--

INSERT INTO `breeds` (`id`, `name`, `speciesId`) VALUES
(1, 'Corgi', 1),
(2, 'Labrador', 1),
(3, 'Németjuhász', 1),
(4, 'Husky', 1),
(5, 'Border Collie', 1),
(6, 'Beagle', 1),
(7, 'Golden Retriever', 1),
(8, 'Dalmata', 1),
(9, 'Uszkár', 1),
(10, 'Rottweiler', 1),
(11, 'Csivava', 1),
(12, 'Shiba Inu', 1),
(13, 'Pomerániai', 1),
(14, 'Bull Terrier', 1),
(15, 'Buldog', 1),
(16, 'Akita Inu', 1),
(17, 'Szphinx', 2),
(18, 'Bengáli', 2),
(19, 'Ragdoll', 2),
(20, 'Perzsa', 2),
(21, 'Sziámi', 2),
(23, 'Brit rövidszőrű', 2),
(24, 'Abesszin', 2),
(25, 'Hócipős', 2),
(26, 'Manx', 2),
(27, 'Skót lógófülű', 2),
(28, 'Szavanna', 2),
(29, 'Orosz kék', 2),
(30, 'Karthauzi', 2),
(31, 'Aranyhal', 3),
(32, 'Guppi', 3),
(34, 'Díszhal', 3),
(36, 'Vesztfáliai Hidegvérű', 4),
(37, 'Azték', 4),
(38, 'Orlov Ügető', 4),
(39, 'Tokara Póni', 4),
(40, 'Kínai Csíkos', 5),
(41, 'Dzsungáriai', 5),
(42, 'Campbell', 5),
(43, 'Roborovszki', 5),
(44, 'Fürge', 7),
(45, 'Fali', 7),
(46, 'Homoki', 7),
(47, 'Pannon', 7),
(48, 'Piton', 8),
(49, 'Anakonda', 8),
(50, 'Csörgőkígyó', 8),
(51, 'Ara', 6),
(52, 'Nimfa', 6),
(53, 'Amazon', 6),
(54, 'Mediterrán', 9),
(55, 'Erdei', 9),
(56, 'Sivatagi', 9),
(57, 'Törpenyúl', 10),
(58, 'Holland lógófülű', 10),
(59, 'Óriás kosorrú nyúl', 10),
(60, 'Rex nyúl', 10),
(61, 'Kaliforniai nyúl', 10),
(62, 'Tacskó', 1),
(63, 'Africanis', 1),
(64, 'Kisbéri félvér', 4),
(65, 'Szíriai hörcsög', 5),
(68, 'Puli', 1),
(69, 'Bernáthegyi', 1),
(70, 'Foxi', 1),
(71, 'Kuvasz', 1),
(72, 'Házi', 2),
(73, 'Hullámos', 6),
(74, 'Kakadu', 6),
(75, 'Bohóchal', 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `passwordHash` varchar(95) NOT NULL,
  `shelterId` int(11) DEFAULT  NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin2 COLLATE=latin2_hungarian_ci;

--
-- A tábla adatainak kiíratása `employees`
--

INSERT INTO `employees` (`id`, `name`, `email`, `passwordHash`, `shelterId`) VALUES
(1, 'Tóth Albert', 'albert0929@gmail.com', '$2y$10$up0CYVpFWozU7R0k6y3oz.c3J4iUjTOfuqPbmOs2h7s7LNNCHaTo.', 1),
(2, 'Szabó Julcsi', 'szabojulcsi02@gmail.com', '$2y$12$ykqYmwNMhaUmYBoinFNoDecojkujAbdWzkLN24xeCTa2qo0akcRBm', 1),
(3, 'Rézműves Csabika', 'rezmuves.csabika@gmail.com', '$2y$12$iy6lWiVM8mdyghMcYejFieopzIvm5oeyEw8wwkYXlv1Pggzgqq4Mm', 2),
(4, 'Orsós Rómeó', 'orsosromeo22@hotmail.com', '$2y$12$WLvg8x148P/efuvg2DuEPOPAd40gUii43IM.iUJK5ORA9RET1b6Nq', 2),
(5, 'Gábor Mária', 'marikamarika@freemail.hu', '$2y$12$Lh8pCygxqOKbIbItaxT4guFSoCLN/bK9KyZks5wJhRd20L3hP1H7e', 3),
(6, 'Hegedűs Mónika', 'monika.hegedus.1980@gmail.com', '$2y$12$9Qjpjz8HeNIy94lBSxrBmeEABk659E1l4GbN5pcLCanUtzdTbNruC', 3),
(7, 'Takács Pista', 'pistuka02@gmail.com', '$2y$12$Q.Wxtr8CYyq0GhF.tmswv.AlF76MsqKpOS6Q.j1KRzxL9Kli9rCEC', 4),
(8, 'Kovács András', 'bandivagyok33@freemail.hu', '$2y$12$S1Pkcgk3ScLKvJl1bsfi3e1BiCU.Yn8SwRjJ5YrFBqhkxlvfCrPkO', 4),
(9, 'Varga Natália', 'natusssss@gmail.com', '$2y$12$C4P6XS2LWClSQb1eXzExpu3X0AG9.URzYUCKMsYmZHk4UXezBKpMO', 5),
(10, 'Farkas Bernáth', 'bernath.emailje@gmail.com', '$2y$12$PTfm0wHEyXnepZ0SJd6cw.3OzZYg7pyMWlad2uc6rtpIo/8w7xXtm', 5),
(11, 'Mészáros Kristóf', 'krisz0909@gmail.com', '$2y$12$ZWMT9HYbA5OnEHYCYOOXYO8jjEbCb.sihgbNVKhWF6Tpb.WNpjNOi', 6),
(12, 'Szilágyi László', 'szil.lacko@gmail.com', '$2y$12$2rHjnf7MSs3lYLtm4pzc0uST2lRSgWZa.c7L9L2AoAUojazxb0RxC', 6),
(13, 'Török Márton', 'atorokmarcika@gmail.com', '$2y$12$RNPp0g9Kj4gKD.THjR4JeOMdgNa8gaYN24jMB7zC3wAHdnIwSA0aS', 7),
(14, 'Fehér Julianna', 'julcsifeher@citromail.hu', '$2y$12$dbsOt8OPdOrfv8SnxcNCrekDFWOAlWGphd/IpaRW.iZpJ8G6VKYXC', 7),
(15, 'Molnár Hanna', 'hannus.molnar@gmail.com', '$2y$12$OcnQ5BhzJuZrLqeXo71B2urr6zPUdTSnXaFviKbxYAQIojNsyfYKm', 8),
(16, 'Gál Attila', 'gal.ati78@gmail.com', '$2y$12$46tWWlVKnIOAWIBkZrA3iu5DG31NbbEAASbRgoGYo20gvdbgieSzi', 8),
(17, 'Balogh Balázs', 'bazsa_balogh@gmail.com', '$2y$12$be2/bLgRJTI2rZu86LKK1uoGfuh7XIqVCgvZFazp3jCUFjN.Ggkzy', 9),
(18, 'Rácz Simon', 'simon.racz.078@gmail.com', '$2y$12$lqOfN9F8TzsitIa72toAh.mhE5F9ISnb2q2JOyGeX7OhAeRIh8hBC', 9);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `favourites`
--

CREATE TABLE `favourites` (
  `animalId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin2 COLLATE=latin2_hungarian_ci;

--
-- A tábla adatainak kiíratása `favourites`
--

INSERT INTO `favourites` (`animalId`, `userId`) VALUES
(17, 1),
(9, 1),
(20, 1),
(13, 1),
(33, 1),
(25, 1),
(15, 1),
(4, 1),
(23, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `habitatjunction`
--

CREATE TABLE `habitatjunction` (
  `animalId` int(11) NOT NULL,
  `habitatId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `habitatjunction`
--

INSERT INTO `habitatjunction` (`animalId`, `habitatId`) VALUES
(20, 3),
(20, 5),
(20, 6),
(21, 5),
(21, 6),
(22, 8),
(23, 8),
(25, 2),
(25, 6),
(8, 4),
(8, 6),
(11, 4),
(11, 6),
(1, 6),
(9, 2),
(16, 4),
(16, 7),
(2, 3),
(2, 6),
(12, 2),
(3, 1),
(13, 3),
(13, 6),
(5, 3),
(5, 6),
(14, 1),
(6, 3),
(6, 6),
(4, 4),
(4, 6),
(15, 3),
(15, 6),
(10, 1),
(10, 7),
(7, 1),
(7, 7),
(27, 8),
(28, 8),
(26, 8),
(18, 8),
(19, 8),
(29, 2),
(29, 6),
(30, 2),
(30, 6),
(31, 2),
(31, 6),
(32, 2),
(32, 6),
(33, 2),
(33, 6),
(34, 2),
(34, 6),
(35, 2),
(35, 6),
(36, 2),
(36, 6),
(37, 3),
(37, 6),
(38, 3),
(38, 6),
(39, 6),
(40, 6),
(41, 6),
(42, 3),
(42, 6),
(43, 3),
(43, 6),
(44, 3),
(44, 6),
(45, 3),
(45, 6),
(46, 6),
(47, 3),
(47, 6),
(48, 6),
(49, 3),
(49, 6),
(50, 3),
(50, 6),
(51, 1),
(51, 7),
(52, 1),
(52, 7),
(53, 1),
(53, 7),
(54, 3),
(54, 6),
(55, 6),
(56, 6),
(57, 3),
(57, 6),
(58, 3),
(58, 6),
(59, 3),
(59, 6),
(150, 3),
(150, 6),
(151, 6),
(152, 3),
(153, 6),
(154, 3),
(155, 3),
(155, 6),
(156, 3),
(156, 6),
(157, 5),
(157, 6),
(158, 3),
(158, 6),
(159, 3),
(159, 6),
(160, 3),
(160, 6),
(161, 3),
(161, 6),
(162, 3),
(162, 6),
(163, 3),
(163, 6),
(164, 3),
(164, 6),
(165, 3),
(165, 6),
(166, 3),
(167, 3),
(167, 6),
(168, 4),
(168, 6),
(169, 4),
(169, 6),
(170, 3),
(170, 6),
(171, 3),
(171, 6),
(172, 3),
(172, 6),
(173, 3),
(173, 6),
(174, 6),
(175, 6),
(176, 6),
(177, 6),
(178, 6),
(179, 3),
(180, 6),
(181, 3),
(181, 6),
(182, 3),
(182, 6),
(183, 3),
(183, 6),
(184, 6),
(185, 3),
(185, 6),
(186, 6),
(187, 6),
(188, 3),
(188, 6),
(189, 6),
(190, 6),
(191, 3),
(192, 3),
(192, 6),
(193, 3),
(194, 3),
(194, 6),
(195, 3),
(195, 6),
(196, 3),
(197, 6),
(198, 6),
(199, 6),
(200, 6),
(201, 6),
(202, 6),
(203, 6),
(204, 6),
(205, 6),
(206, 3),
(207, 8),
(208, 8),
(209, 8),
(210, 8),
(211, 8),
(212, 2),
(212, 6),
(213, 2),
(214, 2),
(214, 6),
(215, 2),
(215, 6),
(216, 9),
(217, 9),
(218, 9),
(219, 9),
(220, 9),
(221, 9),
(222, 9),
(223, 9),
(224, 9),
(225, 9),
(226, 9),
(227, 9),
(228, 9),
(229, 9),
(230, 9),
(231, 9),
(232, 9),
(233, 9),
(234, 9),
(235, 9),
(236, 9),
(237, 9),
(238, 9),
(239, 9),
(240, 9),
(241, 9),
(242, 2),
(243, 2),
(244, 2),
(245, 2),
(246, 2),
(247, 2),
(248, 2),
(249, 2),
(250, 2),
(251, 2),
(252, 2),
(253, 4),
(253, 6),
(254, 4),
(254, 6),
(255, 4),
(255, 6),
(256, 2),
(257, 4),
(257, 6),
(258, 1),
(258, 7),
(259, 1),
(259, 7),
(260, 1),
(260, 7),
(261, 1),
(261, 7),
(262, 1),
(262, 7),
(263, 1),
(263, 7),
(264, 1),
(264, 7),
(265, 1),
(265, 7),
(266, 1),
(266, 7),
(267, 2),
(267, 6),
(268, 2),
(268, 6),
(269, 2),
(269, 6),
(270, 2),
(270, 6),
(271, 2),
(271, 6),
(272, 8),
(273, 8),
(274, 8),
(275, 8),
(276, 1),
(276, 7),
(277, 1),
(277, 7),
(278, 3),
(278, 6),
(279, 3),
(279, 6),
(280, 3),
(280, 6),
(281, 3),
(282, 6),
(283, 6),
(284, 3),
(284, 6),
(285, 3),
(285, 6),
(286, 3),
(286, 6),
(287, 3),
(287, 6),
(288, 3),
(288, 6),
(289, 3),
(289, 6),
(290, 3),
(290, 6),
(291, 3),
(291, 6),
(17, 3),
(17, 6);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `habitats`
--

CREATE TABLE `habitats` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin2 COLLATE=latin2_hungarian_ci;

--
-- A tábla adatainak kiíratása `habitats`
--

INSERT INTO `habitats` (`id`, `name`, `description`) VALUES
(1, 'Akvárium', 'Egy vízzel teli, átlátszó tartály, amely halak, vízinövények és más vízi élőlények számára biztosít mesterséges élőhelyet, gyakran dekorációs céllal használva otthonokban és közintézményekben.'),
(2, 'Ketrec', 'Fém- vagy fakeretből készült, rácsos szerkezet, amely kisállatok, például madarak vagy rágcsálók biztonságos elhelyezésére szolgál, miközben megfelelő szellőzést biztosít.'),
(3, 'Lakás', 'Az emberek otthonául szolgáló helyiség, ahol gyakran háziállatok, például macskák vagy kutyák is élnek kényelmes környezetben, zárt térben.'),
(4, 'Istálló', 'Mezőgazdasági épület, amely nagyobb haszonállatok, például lovak, szarvasmarhák vagy kecskék védelmét szolgálja az időjárás viszontagságai ellen.'),
(5, 'Kennel', 'Kültéri vagy beltéri építmény, amely kutyák számára biztosít lakhelyet, gyakran kifutóval kiegészítve a mozgásigény kielégítésére.'),
(6, 'Udvar', 'Egy nyitott, kerített terület, amelyet gyakran háziállatok szabad tartására használnak, például kutyák vagy baromfik számára.'),
(7, 'Tó', 'Természetes vagy mesterséges állóvíz, amely halak, kétéltűek és vízimadarak élőhelyeként szolgál, és ökológiai sokféleséget biztosít.'),
(8, 'Terrárium', 'Egy zárt vagy részben zárt mesterséges környezet, amelyet szárazföldi állatok, például kígyók, gyíkok vagy hüllők számára alakítottak ki. A terráriumok különféle méretekben és típusokban elérhetők, és biztosítják a megfelelő hőmérsékletet, páratartalmat é'),
(9, 'Kalitka', 'A kalitka egy rácsos szerkezetű ketrec, amely biztonságos és kényelmes életteret biztosít a papagájok számára. Megfelelő méretűnek kell lennie, hogy a madár szabadon mozoghasson, és tartalmaznia kell ülőrudakat, etetőt, itatót, valamint játékokat a papagá');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `preferences`
--

CREATE TABLE `preferences` (
  `userId` int(11) NOT NULL,
  `age` int(11) NOT NULL,
  `ageWeight` int(11) NOT NULL,
  `weight` int(11) NOT NULL,
  `weightWeight` int(11) NOT NULL,
  `cuteness` int(11) NOT NULL,
  `cutenessWeight` int(11) NOT NULL,
  `childFriendlyness` int(11) NOT NULL,
  `childFriendlynessWeight` int(11) NOT NULL,
  `sociability` int(11) NOT NULL,
  `sociabilityWeight` int(11) NOT NULL,
  `exerciseNeed` int(11) NOT NULL,
  `exerciseNeedWeight` int(11) NOT NULL,
  `furLength` int(11) NOT NULL,
  `furLengthWeight` int(11) NOT NULL,
  `docility` int(11) NOT NULL,
  `docilityWeight` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin2 COLLATE=latin2_hungarian_ci;

--
-- A tábla adatainak kiíratása `preferences`
--

INSERT INTO `preferences` (`userId`, `age`, `ageWeight`, `weight`, `weightWeight`, `cuteness`, `cutenessWeight`, `childFriendlyness`, `childFriendlynessWeight`, `sociability`, `sociabilityWeight`, `exerciseNeed`, `exerciseNeedWeight`, `furLength`, `furLengthWeight`, `docility`, `docilityWeight`) VALUES
(1, 15, 5, 250, 5, 5, 5, 5, 5, 5, 5, 1, 5, 5, 10, 5, 5),
(2, 15, 5, 250, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5),
(3, 15, 5, 250, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10),
(4, 15, 5, 250, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10, 5),
(5, 15, 5, 250, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10),
(6, 15, 5, 250, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 5, 5),
(7, 15, 5, 250, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10, 5, 5),
(8, 15, 5, 250, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 10, 5, 5);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `provideablehabitats`
--

CREATE TABLE `provideablehabitats` (
  `userId` int(11) NOT NULL,
  `habitatId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin2 COLLATE=latin2_hungarian_ci;

--
-- A tábla adatainak kiíratása `provideablehabitats`
--

INSERT INTO `provideablehabitats` (`userId`, `habitatId`) VALUES
(1, 1),
(1, 4),
(2, 2),
(2, 9),
(3, 8),
(3, 7),
(4, 2),
(4, 1),
(5, 3),
(5, 4),
(6, 8),
(6, 1),
(7, 7),
(7, 5),
(8, 3),
(8, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `shelters`
--

CREATE TABLE `shelters` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `houseNumber` varchar(255) NOT NULL,
  `telephoneNumber` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin2 COLLATE=latin2_hungarian_ci;

--
-- A tábla adatainak kiíratása `shelters`
--

INSERT INTO `shelters` (`id`, `name`, `city`, `street`, `houseNumber`, `telephoneNumber`, `email`) VALUES
(1, 'Újpesti Menhely', 'Budapest', 'Klauzál utca', '53.', '06209728562', 'menhelyujpest@freemail.hu'),
(2, 'Óbudai Állatmenhely', 'Budapest', 'Mozaik utca', '17.', '06209721234', 'obuda.menhely@hotmail.com'),
(3, 'Csepeli Állatotthon', 'Budapest', 'Reggel utca ', '48', '06209724532', 'allat.otthon@csepel.hu'),
(4, 'SzívHang Állatotthon', 'Vác', 'Petőfi Sándor utca', '32.', '06205748987', 'szivhang.vac@gmail.com'),
(5, 'Új Esély Otthon', 'Göd', 'Arany János utca', '29.', '0620738923432', 'godi.allat.otthon@gmail.com'),
(6, 'Puszta-Tanya', 'Debrecen', 'Szent István utca', '98.', '06204483943', 'pusztatanya@citromail.hu'),
(7, 'Veresi hüllőház', 'Veresegyház', 'Huszár utca', '22.', '062043243263', 'hullo.veres@gmail.com'),
(8, 'A Remény Útja', 'Győr', 'Kálvin utca', '39.', '062043243172', 'remenyutjagyor@gmail.com'),
(9, 'Védett Mancsok', 'Szeged', 'Csokonai utca', '66.', '062043278962', 'vedett.mancsok@gmail.com');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `species`
--

CREATE TABLE `species` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin2 COLLATE=latin2_hungarian_ci;

--
-- A tábla adatainak kiíratása `species`
--

INSERT INTO `species` (`id`, `name`) VALUES
(1, 'Kutya'),
(2, 'Macska'),
(3, 'Hal'),
(4, 'Ló'),
(5, 'Hörcsög'),
(6, 'Papagáj'),
(7, 'Gyík'),
(8, 'Kígyó'),
(9, 'Sün'),
(10, 'Nyúl');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `userType` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `tokens`
--

INSERT INTO `tokens` (`id`, `userId`, `userType`, `token`) VALUES
(26, 2, 'user', 'd004bdc651f2ac9828e6ceddc0d38fa1'),
(38, 1, 'employee', 'c1bddb316a59c1f7c9107b86d4ef5db0'),
(41, 1, 'employee', 'dd205be4f05098a036fb62ac1f31aaf3'),
(42, 1, 'admin', 'bd7b6cd636f50f815e6f7bc56f91f084'),
(45, 1, 'employee', 'd75ee637668e6c62a808db87de8d936c'),
(46, 1, 'admin', '39011fe168b0ddd5076a375fb2d1b087'),
(48, 1, 'employee', 'c8818f4f2c4c0ca9aaec039da8510e52'),
(49, 1, 'employee', 'f502bffb87d59772cea539114ea3d6bc'),
(50, 1, 'employee', 'bb3413c4d803871b5e11730449aba868'),
(51, 1, 'employee', 'efd4f61c9fec790a3027ebc38e2d3016'),
(53, 2, 'admin', '0744e95fd783f40568d33d5766dacca8'),
(57, 1, 'admin', '39b6bc226ae6070bf03bda727514d042'),
(58, 1, 'employee', 'e233a23e4c816d3d29c13bac7ec30d24'),
(59, 1, 'admin', '1e03e047aec2534ae57930669121f985');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `passwordHash` varchar(95) NOT NULL,
  `name` varchar(255) NOT NULL,
  `telephoneNumber` varchar(11) NOT NULL,
  `city` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `houseNumber` int(11) NOT NULL,
  `wantsEmail` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin2 COLLATE=latin2_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `email`, `passwordHash`, `name`, `telephoneNumber`, `city`, `street`, `houseNumber`, `wantsEmail`) VALUES
(1, 'isten_janos32@gmail.com', '$2y$12$/TzQKCJzk2iXnTLvwt8Ddeq/mP2eCpTzaEB.v2L5b9bnrxjisz5u.', 'Antal Jancsi', '06204287593', 'Árpádhalom', 'Mező utca', 92, 1),
(2, 'animal.lover03@gmail.com', '$2y$12$SJsBZrIql13W4qAFVxTme.MumlmSysK8/rtTqMh22GFzlLH/8O2MK', 'Orosz László', '06709728537', 'Debrecen', 'Petőfi Sándor utca', 20, 0),
(3, 'veresmoncsika@gmail.com', '$2y$12$Iu9UO1wmF09Kkjcuhh19GuHEWBvCcCA7M4EIZzjfvC2RyuK/x/MdC', 'Veres Mónika', '06909258038', 'Csörög', 'Honfoglalás utca', 7, 1),
(4, 'vinczepali09@gmail.com', '$2y$12$EANumV4cRsRm6x1ysx.mAOd4.W7TeL66/j1/YAXRcizDSVXw/2bKe', 'Vincze Pál', '06300320568', 'Szeged', 'Pitypang utca', 61, 0),
(5, 'sanyika.illes.email@gmail.com', '$2y$12$sg/6kr2oCHvwAQZc.BKNQuh4xuCfUGLr/Ymvov/Ou9/N4Q9e5sQqu', 'Illés Sándor', '06203920347', 'Vác', 'Rózsa utca', 45, 1),
(6, 'annabalint0303@gmail.com', '$2y$12$4fsEt5WxcIG5VB7KFh/.NuveH.qQycWo956PL1YAt8Q/227fs.Y8O', 'Bálint Anna', '06208358138', 'Göd', 'Mátyás Király utca', 30, 0),
(7, 'katona.julcsika@gmail.com', '$2y$12$YXpW3tRW7oKKvtEPg8d9heJ8IsvJTdCwGZtd7mdn6Gpujq.1ZtsGS', 'Katona Júlia', '06707975385', 'Veresegyház', 'Fő út', 20, 0),
(8, 'sandornepap@gmail.com', '$2y$12$71F9uKsBvSS7CJYRuRsBAuJ3TrQQQhU/jFywqeeHYxR4PxDPeViWa', 'Pap Sándorné', '06307285892', 'Debrecen', 'Fő út', 57, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `vaccinejunction`
--

CREATE TABLE `vaccinejunction` (
  `animalId` int(11) NOT NULL,
  `vaccineId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin2 COLLATE=latin2_hungarian_ci;

--
-- A tábla adatainak kiíratása `vaccinejunction`
--

INSERT INTO `vaccinejunction` (`animalId`, `vaccineId`) VALUES
(20, 1),
(20, 3),
(20, 8),
(21, 1),
(25, 10),
(11, 11),
(1, 1),
(1, 5),
(2, 5),
(2, 6),
(2, 7),
(13, 5),
(13, 7),
(5, 1),
(5, 5),
(6, 5),
(6, 6),
(4, 12),
(15, 1),
(15, 5),
(36, 6),
(36, 7),
(37, 7),
(38, 6),
(39, 1),
(39, 5),
(40, 1),
(40, 2),
(40, 5),
(41, 1),
(41, 2),
(41, 5),
(42, 6),
(42, 7),
(43, 6),
(44, 1),
(44, 5),
(45, 1),
(45, 2),
(45, 5),
(46, 1),
(46, 5),
(47, 6),
(47, 7),
(48, 1),
(48, 2),
(48, 5),
(49, 1),
(49, 2),
(49, 5),
(50, 6),
(50, 7),
(54, 6),
(54, 7),
(55, 1),
(55, 2),
(55, 5),
(56, 1),
(56, 2),
(56, 5),
(57, 6),
(58, 7),
(59, 1),
(59, 2),
(59, 5),
(150, 2),
(150, 5),
(152, 1),
(152, 2),
(152, 5),
(153, 5),
(154, 1),
(154, 2),
(154, 5),
(155, 2),
(155, 5),
(156, 1),
(156, 2),
(156, 5),
(158, 6),
(159, 6),
(159, 7),
(160, 6),
(160, 7),
(161, 6),
(163, 6),
(164, 7),
(165, 1),
(166, 1),
(166, 2),
(167, 1),
(167, 2),
(168, 1),
(168, 2),
(169, 1),
(169, 2),
(170, 11),
(170, 12),
(171, 6),
(171, 7),
(172, 6),
(173, 7),
(174, 3),
(174, 5),
(174, 8),
(175, 2),
(175, 3),
(175, 5),
(176, 1),
(176, 4),
(176, 5),
(177, 3),
(177, 4),
(177, 5),
(178, 1),
(178, 3),
(178, 5),
(179, 5),
(180, 4),
(180, 5),
(181, 2),
(181, 4),
(181, 5),
(182, 5),
(182, 8),
(183, 1),
(183, 2),
(183, 5),
(184, 3),
(184, 5),
(185, 1),
(185, 3),
(185, 5),
(185, 8),
(186, 2),
(186, 3),
(186, 5),
(187, 1),
(187, 5),
(188, 5),
(188, 8),
(189, 3),
(189, 5),
(189, 8),
(190, 1),
(190, 3),
(190, 4),
(190, 5),
(191, 6),
(191, 7),
(192, 7),
(193, 6),
(193, 7),
(194, 6),
(194, 7),
(195, 6),
(195, 7),
(196, 6),
(196, 7),
(197, 1),
(197, 2),
(197, 5),
(198, 3),
(198, 5),
(199, 2),
(199, 5),
(200, 4),
(200, 5),
(201, 2),
(201, 4),
(201, 5),
(201, 8),
(202, 2),
(202, 5),
(202, 8),
(203, 3),
(203, 4),
(203, 5),
(204, 5),
(204, 8),
(205, 3),
(205, 5),
(206, 1),
(206, 5),
(212, 9),
(212, 10),
(213, 10),
(214, 9),
(215, 9),
(215, 10),
(253, 12),
(254, 12),
(254, 11),
(255, 12),
(255, 11),
(256, 11),
(257, 12),
(267, 10),
(267, 9),
(268, 9),
(269, 9),
(270, 10),
(271, 10),
(271, 9),
(278, 7),
(278, 6),
(279, 7),
(280, 6),
(281, 7),
(281, 6),
(282, 7),
(282, 6),
(283, 6),
(284, 7),
(284, 6),
(285, 6),
(286, 7),
(286, 6),
(287, 7),
(287, 6),
(288, 7),
(288, 6),
(289, 7),
(290, 7),
(290, 6),
(291, 7),
(291, 6),
(17, 7),
(17, 6);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `vaccines`
--

CREATE TABLE `vaccines` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `speciesId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin2 COLLATE=latin2_hungarian_ci;

--
-- A tábla adatainak kiíratása `vaccines`
--

INSERT INTO `vaccines` (`id`, `name`, `description`, `speciesId`) VALUES
(1, 'DHPPi', 'A DHPPi kombinált oltás véd a kutyákat a szopornyica, a parvovírus, a parainfluenza és az adenovírus okozta betegésekkel szemben.', 1),
(2, 'Bordetella', 'A Bordetella elleni oltás megvédi a kutyákat a kennel-köhögés egyik gyakori kórokozója ellen.', 1),
(3, 'Leptospirosis', 'Ez az oltás véd a leptospirózis ellen, amely egy baktérium által okozott zoonózisos betegség.', 1),
(4, 'Lyme-kór', 'A Lyme-kór elleni vakcina védelmet nyújthat a Borrelia burgdorferi baktérium okozta fertőzés ellen.', 1),
(5, 'Veszettség', 'A veszettség elleni oltás kötelező és megakadályozza a halálos vírusfertőzés kialakulását.', 1),
(6, 'FVRCP', 'Az FVRCP vakcina védelmet biztosít a macskák számára az orrhurut, a calicivírus és a panleukopénia ellen.', 2),
(7, 'FeLV', 'A FeLV oltás segít megelőzni a macskák leukémiás fertőzését, amely súlyos immunrendszeri gyengülést okozhat.', 2),
(8, 'Canine Influenza', 'A kutya influenza elleni oltás védelmet nyújt a H3N8 és H3N2 influenza vírusok ellen, amelyek légzőszervi betegségeket okozhatnak.', 1),
(9, 'RHDV2', 'Az RHDV2 vakcina védelmet nyújt a nyulak vérzéses betegségének második típusa ellen, amely gyorsan terjedhet és halálos lehet.', 10),
(10, 'Myxomatosis', 'A myxomatosis elleni oltás védi a nyulakat a szúnyogok és bolhák által terjesztett halálos vírus ellen.', 10),
(11, 'Tetanus', 'A tetanusz elleni oltás lovak számára nyújt védelmet a Clostridium tetani baktérium által okozott súlyos izomgörcsökkel járó betegség ellen.', 4),
(12, 'Equine Influenza', 'A lóinfluenza elleni vakcina megakadályozza a lovak között könnyen terjedő, lázat és légzőszervi tüneteket okozó vírusfertőzést.', 4);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `adoptions`
--
ALTER TABLE `adoptions`
  ADD KEY `animalId` (`animalId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- A tábla indexei `animals`
--
ALTER TABLE `animals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shelterId` (`shelterId`,`speciesId`),
  ADD KEY `speciesId` (`speciesId`);

--
-- A tábla indexei `breedjunction`
--
ALTER TABLE `breedjunction`
  ADD KEY `animalId` (`animalId`,`breedId`),
  ADD KEY `breedId` (`breedId`);

--
-- A tábla indexei `breeds`
--
ALTER TABLE `breeds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `speciesId` (`speciesId`);

--
-- A tábla indexei `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shelterId` (`shelterId`);

--
-- A tábla indexei `favourites`
--
ALTER TABLE `favourites`
  ADD KEY `animalId` (`animalId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- A tábla indexei `habitatjunction`
--
ALTER TABLE `habitatjunction`
  ADD KEY `habitatId` (`habitatId`),
  ADD KEY `animalId` (`animalId`);

--
-- A tábla indexei `habitats`
--
ALTER TABLE `habitats`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `preferences`
--
ALTER TABLE `preferences`
  ADD PRIMARY KEY (`userId`);

--
-- A tábla indexei `provideablehabitats`
--
ALTER TABLE `provideablehabitats`
  ADD KEY `userId` (`userId`,`habitatId`),
  ADD KEY `habitatId` (`habitatId`);

--
-- A tábla indexei `shelters`
--
ALTER TABLE `shelters`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `species`
--
ALTER TABLE `species`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `vaccinejunction`
--
ALTER TABLE `vaccinejunction`
  ADD KEY `animalId` (`animalId`,`vaccineId`),
  ADD KEY `vaccineId` (`vaccineId`);

--
-- A tábla indexei `vaccines`
--
ALTER TABLE `vaccines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `speciesId` (`speciesId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `animals`
--
ALTER TABLE `animals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=292;

--
-- AUTO_INCREMENT a táblához `breeds`
--
ALTER TABLE `breeds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT a táblához `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT a táblához `habitats`
--
ALTER TABLE `habitats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT a táblához `shelters`
--
ALTER TABLE `shelters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `species`
--
ALTER TABLE `species`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `vaccines`
--
ALTER TABLE `vaccines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `adoptions`
--
ALTER TABLE `adoptions`
  ADD CONSTRAINT `adoptions_ibfk_1` FOREIGN KEY (`animalId`) REFERENCES `animals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `adoptions_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `animals`
--
ALTER TABLE `animals`
  ADD CONSTRAINT `animals_ibfk_1` FOREIGN KEY (`speciesId`) REFERENCES `species` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `animals_ibfk_2` FOREIGN KEY (`shelterId`) REFERENCES `shelters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `breedjunction`
--
ALTER TABLE `breedjunction`
  ADD CONSTRAINT `breedjunction_ibfk_1` FOREIGN KEY (`breedId`) REFERENCES `breeds` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `breedjunction_ibfk_2` FOREIGN KEY (`animalId`) REFERENCES `animals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `breeds`
--
ALTER TABLE `breeds`
  ADD CONSTRAINT `breeds_ibfk_1` FOREIGN KEY (`speciesId`) REFERENCES `species` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`shelterId`) REFERENCES `shelters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `favourites`
--
ALTER TABLE `favourites`
  ADD CONSTRAINT `favourites_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favourites_ibfk_2` FOREIGN KEY (`animalId`) REFERENCES `animals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `habitatjunction`
--
ALTER TABLE `habitatjunction`
  ADD CONSTRAINT `habitatjunction_ibfk_1` FOREIGN KEY (`habitatId`) REFERENCES `habitats` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `habitatjunction_ibfk_2` FOREIGN KEY (`animalId`) REFERENCES `animals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `preferences`
--
ALTER TABLE `preferences`
  ADD CONSTRAINT `preferences_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `provideablehabitats`
--
ALTER TABLE `provideablehabitats`
  ADD CONSTRAINT `provideablehabitats_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `provideablehabitats_ibfk_2` FOREIGN KEY (`habitatId`) REFERENCES `habitats` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `vaccinejunction`
--
ALTER TABLE `vaccinejunction`
  ADD CONSTRAINT `vaccinejunction_ibfk_1` FOREIGN KEY (`vaccineId`) REFERENCES `vaccines` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vaccinejunction_ibfk_2` FOREIGN KEY (`animalId`) REFERENCES `animals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `vaccines`
--
ALTER TABLE `vaccines`
  ADD CONSTRAINT `vaccines_ibfk_1` FOREIGN KEY (`speciesId`) REFERENCES `species` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
