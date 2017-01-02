CREATE DATABASE ims;
USE ims;

CREATE TABLE user (
  username      VARCHAR(30) PRIMARY KEY,
  birthDate     DATE NOT NULL,
  country       VARCHAR(100) NOT NULL,
  city          VARCHAR(100) NOT NULL
);