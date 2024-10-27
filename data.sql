CREATE DATABASE flix_db
CREATE TABLE movies (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(45) DEFAULT NULL,
  genre varchar(45) DEFAULT NULL,
  releaseYear int unsigned DEFAULT NULL,
  rating float unsigned DEFAULT NULL,
  image varchar(200) DEFAULT 'https://picsum.photos/300/450',
  PRIMARY KEY (`id`),
  UNIQUE KEY `title_UNIQUE` (`title`,`releaseYear`)
);

INSERT INTO movies (id, title, genre, releaseYear, rating, image) 
VALUES 
(1, 'The Fellowship of the Ring', 'Fantasy', 1998, 9.5, 'https://www.movieposters.com/cdn/shop/files/ItemP2658_jpg_480x.progressive.jpg?v=1692302023'),
(2, 'The Two Towers', 'Fantasy', 1999, 9.6, 'https://www.movieposters.com/cdn/shop/products/the-lord-of-the-rings-the-two-towers_ej5o8ofs_480x.progressive.jpg?v=1659704557'),
(3, 'The Return of the King', 'Fantasy', 2000, 9.7, 'https://www.movieposters.com/cdn/shop/products/544fbfc37d3def7c758e0620a9ad2fd8_10a2cdea-1696-40d9-bd33-af7335a5b5a0_480x.progressive.jpg?v=1573588792'),
(4, 'Batman Begins', 'Action', 2005, 8.2, 'https://www.movieposters.com/cdn/shop/files/batman-begins_d81d61f7_480x.progressive.jpg?v=1721060854'),
(5, 'The Dark Knight', 'Action', 2008, 9, 'https://www.movieposters.com/cdn/shop/files/darkknight.building.24x36_20e90057-f673-4cc3-9ce7-7b0d3eeb7d83_480x.progressive.jpg?v=1707491191'),
(6, 'The Dark Knight Rises', 'Action', 2012, 8.4, 'https://www.movieposters.com/cdn/shop/files/darkknightrises.24x36.MPW-139270_b6346450-80aa-47a2-8537-ab14cff86e3c_480x.progressive.jpg?v=1704738489'),
(7, 'Inception', 'Action', 2010, 8.8, 'https://www.movieposters.com/cdn/shop/files/inception.mpw.123395_9e0000d1-bc7f-400a-b488-15fa9e60a10c_480x.progressive.jpg?v=1708527589'),
(8, 'Interstellar', 'Adventure', 2014, 8.7, 'https://www.movieposters.com/cdn/shop/files/interstellar-139399_480x.progressive.jpg?v=1708527823'),
(9, 'Oppenheimer', 'Drama', 2023, 8.3, 'https://www.movieposters.com/cdn/shop/files/oppenheimer_9bfmjtpu_480x.progressive.jpg?v=1690469457'),
(10, 'The Godfather', 'Drama', 1972, 9.2, 'https://www.movieposters.com/cdn/shop/products/godfather.132843.mp_480x.progressive.jpg?v=1654286052');

