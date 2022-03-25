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
  `IdEssai` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`IdAffaire`),
  KEY `FK_affaire_clients` (`IdEssai`) USING BTREE,
  CONSTRAINT `FK_affaire_essai` FOREIGN KEY (`IdEssai`) REFERENCES `essais` (`IdEssai`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table testverins.affaire : ~0 rows (environ)
/*!40000 ALTER TABLE `affaire` DISABLE KEYS */;
/*!40000 ALTER TABLE `affaire` ENABLE KEYS */;

-- Listage de la structure de la table testverins. clients
CREATE TABLE IF NOT EXISTS `clients` (
  `IdClient` int NOT NULL AUTO_INCREMENT,
  `Entreprise` varchar(50) DEFAULT NULL,
  `NbAffaires` int DEFAULT NULL COMMENT 'Nombre de commandes',
  `IdAffaires` int DEFAULT NULL,
  PRIMARY KEY (`IdClient`),
  KEY `FK_clients_affaires` (`IdAffaires`),
  CONSTRAINT `FK_clients_affaires` FOREIGN KEY (`IdAffaires`) REFERENCES `affaire` (`IdAffaire`)
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
  `IdDonnees` int DEFAULT NULL,
  `Conformite` tinyint(1) DEFAULT NULL,
  `IdVerin` int DEFAULT NULL,
  PRIMARY KEY (`IdEssai`),
  KEY `IdDonnees` (`IdDonnees`),
  KEY `FK_essais_verins` (`IdVerin`),
  CONSTRAINT `FK_essais_donnees` FOREIGN KEY (`IdDonnees`) REFERENCES `donnees` (`IdDonnees`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_essais_verins` FOREIGN KEY (`IdVerin`) REFERENCES `verins` (`IdVerin`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table testverins.essais : ~0 rows (environ)
/*!40000 ALTER TABLE `essais` DISABLE KEYS */;
/*!40000 ALTER TABLE `essais` ENABLE KEYS */;

-- Listage de la structure de la table testverins. users
CREATE TABLE IF NOT EXISTS `users` (
  `IdUser` int NOT NULL AUTO_INCREMENT,
  `Identifiants` varchar(50) NOT NULL DEFAULT '0',
  `MDP` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0' COMMENT 'mot de passe',
  `LastLogon` datetime NOT NULL,
  `IdEssai` int DEFAULT NULL COMMENT 'Essais effectue',
  `IdAffaire` int DEFAULT NULL,
  PRIMARY KEY (`IdUser`),
  KEY `FK_users_essais` (`IdEssai`),
  KEY `FK_users_affaire` (`IdAffaire`),
  CONSTRAINT `FK_users_affaire` FOREIGN KEY (`IdAffaire`) REFERENCES `affaire` (`IdAffaire`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_users_essais` FOREIGN KEY (`IdEssai`) REFERENCES `essais` (`IdEssai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
