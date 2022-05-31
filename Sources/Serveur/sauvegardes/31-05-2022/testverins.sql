-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: testverins
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `affaire`
--

DROP TABLE IF EXISTS `affaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `affaire` (
  `IdAffaire` int NOT NULL AUTO_INCREMENT,
  `IdClient` int NOT NULL DEFAULT '0',
  `IdUser` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`IdAffaire`),
  KEY `FK_affaire_clients` (`IdClient`) USING BTREE,
  KEY `FK_affaire_User` (`IdUser`),
  CONSTRAINT `FK_affaire_client` FOREIGN KEY (`IdClient`) REFERENCES `clients` (`IdClient`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_affaire_User` FOREIGN KEY (`IdUser`) REFERENCES `users` (`IdUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `affaire`
--

LOCK TABLES `affaire` WRITE;
/*!40000 ALTER TABLE `affaire` DISABLE KEYS */;
/*!40000 ALTER TABLE `affaire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `IdClient` int NOT NULL AUTO_INCREMENT,
  `Entreprise` varchar(50) DEFAULT NULL,
  `NbAffaires` int DEFAULT NULL COMMENT 'Nombre de commandes',
  PRIMARY KEY (`IdClient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donnees`
--

DROP TABLE IF EXISTS `donnees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donnees` (
  `IdDonnees` int NOT NULL,
  `PressionIn` int DEFAULT NULL COMMENT 'En Bar',
  `PressionOut` int DEFAULT NULL COMMENT 'En Bar',
  `PressionMax` int DEFAULT NULL COMMENT 'En Bar',
  `Rendement` int DEFAULT NULL,
  PRIMARY KEY (`IdDonnees`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donnees`
--

LOCK TABLES `donnees` WRITE;
/*!40000 ALTER TABLE `donnees` DISABLE KEYS */;
/*!40000 ALTER TABLE `donnees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `essais`
--

DROP TABLE IF EXISTS `essais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `essais` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `essais`
--

LOCK TABLES `essais` WRITE;
/*!40000 ALTER TABLE `essais` DISABLE KEYS */;
/*!40000 ALTER TABLE `essais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `IdUser` int NOT NULL AUTO_INCREMENT,
  `Identifiants` varchar(50) NOT NULL DEFAULT '0',
  `MDP` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0' COMMENT 'mot de passe',
  `LastLogon` datetime NOT NULL,
  PRIMARY KEY (`IdUser`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verins`
--

DROP TABLE IF EXISTS `verins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verins` (
  `IdVerin` int NOT NULL AUTO_INCREMENT,
  `ModelVerin` varchar(50) DEFAULT NULL,
  `Volume` varchar(50) DEFAULT NULL,
  `ChargeMax` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IdVerin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verins`
--

LOCK TABLES `verins` WRITE;
/*!40000 ALTER TABLE `verins` DISABLE KEYS */;
/*!40000 ALTER TABLE `verins` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-31 16:21:15
