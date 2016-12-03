-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               5.5.48 - MySQL Community Server (GPL)
-- ОС Сервера:                   Win32
-- HeidiSQL Версия:              9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Дамп структуры для таблица expert.authors
CREATE TABLE IF NOT EXISTS `authors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `parent` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы expert.authors: ~7 rows (приблизительно)
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` (`id`, `name`, `parent`) VALUES
	(1, 'Каталог1', 0),
	(2, 'Каталог2', 0),
	(3, 'Издатель1', 1),
	(4, 'Издатель2', 1),
	(5, 'Издатель3', 2),
	(6, 'Издатель4', 2),
	(7, 'Издатель5', 2);
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;


-- Дамп структуры для таблица expert.docs
CREATE TABLE IF NOT EXISTS `docs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `topic_id` int(11) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `num` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `file` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_docs_types` (`type_id`),
  KEY `FK_docs_authors` (`author_id`),
  KEY `FK_docs_topics` (`topic_id`),
  CONSTRAINT `FK_docs_authors` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`),
  CONSTRAINT `FK_docs_topics` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`),
  CONSTRAINT `FK_docs_types` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы expert.docs: ~8 rows (приблизительно)
/*!40000 ALTER TABLE `docs` DISABLE KEYS */;
INSERT INTO `docs` (`id`, `name`, `type_id`, `author_id`, `topic_id`, `date`, `num`, `active`, `file`) VALUES
	(1, 'Наименование тест1', 3, 3, 3, '2016-12-01 21:04:14', 1, 1, 'Декларация_2016_04.10.2016.xls'),
	(2, 'Наименование тест2', 4, 4, 4, '2016-12-01 21:04:16', 1, 1, 'Наказ_2016_змiни_859_Данилюк_04.10.2016.doc'),
	(3, 'Наименование тест3', 5, 5, 5, '2016-12-01 21:04:19', 1, 1, 'ApiDevReadmev1.pdf'),
	(4, 'Наименование тест4', 6, 5, 6, '2016-12-01 21:04:26', 1, 1, 'test_page_1.html'),
	(5, 'Наименование тест5', 6, 6, 6, '2016-12-01 21:04:31', 1, 1, 'Текстовый документ OpenDocument.odt'),
	(6, 'Image 001.png', NULL, NULL, NULL, '2016-12-02 22:29:51', NULL, NULL, 'Image 001.png'),
	(7, 'Image 3.png', NULL, NULL, NULL, '2016-12-02 22:46:44', NULL, NULL, 'Image 3.png'),
	(8, 'Image 003.png', 8, 3, 1, '2016-12-02 22:59:48', 1, 1, 'Image 003.png'),
	(9, 'Image 006.png', 8, NULL, NULL, '2016-12-02 23:01:21', NULL, NULL, 'Image 006.png'),
	(10, 'test.doc', 8, NULL, NULL, '2016-12-03 00:41:04', NULL, NULL, 'test.doc');
/*!40000 ALTER TABLE `docs` ENABLE KEYS */;


-- Дамп структуры для таблица expert.topics
CREATE TABLE IF NOT EXISTS `topics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `parent` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы expert.topics: ~7 rows (приблизительно)
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;
INSERT INTO `topics` (`id`, `name`, `parent`) VALUES
	(1, 'Список1', 0),
	(2, 'Список2', 0),
	(3, 'Тема1', 1),
	(4, 'Тема1', 1),
	(5, 'Тема1', 2),
	(6, 'Тема1', 2),
	(7, 'Тема1', 2);
/*!40000 ALTER TABLE `topics` ENABLE KEYS */;


-- Дамп структуры для таблица expert.types
CREATE TABLE IF NOT EXISTS `types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `parent` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы expert.types: ~8 rows (приблизительно)
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` (`id`, `name`, `parent`) VALUES
	(1, 'Основной1', 0),
	(2, 'Региональный', 0),
	(3, 'Указ', 1),
	(4, 'Приказ', 1),
	(5, 'Указ', 2),
	(6, 'Приказ', 2),
	(7, 'Нераспределенные', 0),
	(8, 'Документы', 7);
/*!40000 ALTER TABLE `types` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
