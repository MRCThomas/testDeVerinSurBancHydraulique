-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.0.28 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour testverins
CREATE DATABASE IF NOT EXISTS `testverins` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `testverins`;

-- Listage de la structure de la table testverins. affaire
CREATE TABLE IF NOT EXISTS `affaire` (
  `IdAffaire` int NOT NULL AUTO_INCREMENT,
  `IdClient` int NOT NULL DEFAULT '0',
  `IdUser` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`IdAffaire`),
  KEY `FK_affaire_clients` (`IdClient`) USING BTREE,
  KEY `FK_affaire_User` (`IdUser`),
  CONSTRAINT `FK_affaire_client` FOREIGN KEY (`IdClient`) REFERENCES `clients` (`IdClient`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_affaire_User` FOREIGN KEY (`IdUser`) REFERENCES `users` (`IdUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table testverins.affaire : ~0 rows (environ)
/*!40000 ALTER TABLE `affaire` DISABLE KEYS */;
/*!40000 ALTER TABLE `affaire` ENABLE KEYS */;

-- Listage de la structure de la table testverins. clients
CREATE TABLE IF NOT EXISTS `clients` (
  `IdClient` int NOT NULL AUTO_INCREMENT,
  `Entreprise` varchar(50) DEFAULT NULL,
  `NbAffaires` int DEFAULT NULL COMMENT 'Nombre de commandes',
  PRIMARY KEY (`IdClient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table testverins.clients : ~0 rows (environ)
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;

-- Listage de la structure de la table testverins. donnees
CREATE TABLE IF NOT EXISTS `donnees` (
  `IdDonnees` int NOT NULL,
  `PressionIn` int DEFAULT NULL COMMENT 'En Bar',
  `PressionOut` int DEFAULT NULL COMMENT 'En Bar',
  `PressionMax` int DEFAULT NULL COMMENT 'En Bar',
  `Rendement` int DEFAULT NULL,
  PRIMARY KEY (`IdDonnees`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table testverins.donnees : ~0 rows (environ)
/*!40000 ALTER TABLE `donnees` DISABLE KEYS */;
/*!40000 ALTER TABLE `donnees` ENABLE KEYS */;

-- Listage de la structure de la table testverins. essais
CREATE TABLE IF NOT EXISTS `essais` (
  `IdEssai` int NOT NULL AUTO_INCREMENT,
  `ModeOp` varchar(50) NOT NULL DEFAULT '0',
  `DateEssai` datetime DEFAULT NULL,
  `Conformite` tinyint(1) DEFAULT NULL,
  `IdAffaire` int DEFAULT NULL,
  `IdUserCreate` int DEFAULT NULL,
  `IdUserDo` int DEFAULT NULL,
  `IdDonnees` int DEFAULT NULL,
  `Idverin` int DEFAULT NULL,
  PRIMARY KEY (`IdEssai`),
  KEY `FK_essais_affaire` (`IdAffaire`),
  KEY `FK_essais_Donnees` (`IdDonnees`),
  KEY `FK_essais_Verin` (`Idverin`),
  KEY `FK_essais_Users` (`IdUserCreate`) USING BTREE,
  KEY `FK_essais_UsersD` (`IdUserDo`),
  CONSTRAINT `FK_essais_affaire` FOREIGN KEY (`IdAffaire`) REFERENCES `affaire` (`IdAffaire`),
  CONSTRAINT `FK_essais_Donnees` FOREIGN KEY (`IdDonnees`) REFERENCES `donnees` (`IdDonnees`),
  CONSTRAINT `FK_essais_UsersC` FOREIGN KEY (`IdUserCreate`) REFERENCES `users` (`IdUser`),
  CONSTRAINT `FK_essais_UsersD` FOREIGN KEY (`IdUserDo`) REFERENCES `users` (`IdUser`),
  CONSTRAINT `FK_essais_Verin` FOREIGN KEY (`Idverin`) REFERENCES `verins` (`IdVerin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table testverins.essais : ~0 rows (environ)
/*!40000 ALTER TABLE `essais` DISABLE KEYS */;
/*!40000 ALTER TABLE `essais` ENABLE KEYS */;

-- Listage de la structure de la table testverins. users
CREATE TABLE IF NOT EXISTS `users` (
  `IdUser` int NOT NULL AUTO_INCREMENT,
  `Identifiants` varchar(50) NOT NULL DEFAULT '0',
  `MDP` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0' COMMENT 'mot de passe',
  `LastLogon` datetime NOT NULL,
  PRIMARY KEY (`IdUser`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table testverins.users : ~0 rows (environ)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Listage de la structure de la table testverins. verins
CREATE TABLE IF NOT EXISTS `verins` (
  `IdVerin` int NOT NULL AUTO_INCREMENT,
  `ModelVerin` varchar(50) DEFAULT NULL,
  `Volume` varchar(50) DEFAULT NULL,
  `ChargeMax` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IdVerin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table testverins.verins : ~0 rows (environ)
/*!40000 ALTER TABLE `verins` DISABLE KEYS */;
/*!40000 ALTER TABLE `verins` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
