DROP DATABASE IF EXISTS BAMOZON;
CREATE DATABASE BAMOZON;

USE BAMOZON;

CREATE TABLE items(
  id int AUTO_INCREMENT,
  itemName VARCHAR(255) NULL,
  itemCatagory VARCHAR(255) NULL,
  itemPrice DECIMAL(10,2) NULL,
  itemQuantity INT(10) NULL,
  primary key(id)
);

INSERT INTO items (itemName, itemCatagory, itemPrice, itemQuantity)
VALUES 
("Tent", "Camping", 85, 50);
INSERT INTO items (itemName, itemCatagory, itemPrice, itemQuantity)
VALUES 
("Pet cemetary", "Books", 5.99, 85);
INSERT INTO items (itemName, itemCatagory, itemPrice, itemQuantity)
VALUES 
("Halloween", "Movies", 10.99, 120);
INSERT INTO items (itemName, itemCatagory, itemPrice, itemQuantity)
VALUES 
("50 Shades of grey", "Books", 15, 10);
INSERT INTO items (itemName, itemCatagory, itemPrice, itemQuantity)
VALUES 
("Salsa", "Food", 3.85, 300);
