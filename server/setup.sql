CREATE DATABASE IF NOT EXISTS db_contactsBook;

CREATE USER IF NOT EXISTS 'contactsBook'@'localhost' IDENTIFIED BY 'notapassword';
GRANT ALL ON db_contactsBook.* TO 'contactsBook'@'localhost';

USE db_contactsBook;
CREATE TABLE IF NOT EXISTS contacts (id INT NOT NULL, name VARCHAR(100), surname VARCHAR(100), phone VARCHAR(16), email VARCHAR(100));

ALTER TABLE contacts ADD PRIMARY KEY (id);