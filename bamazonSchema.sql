DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(11,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    product_sales DECIMAL(11,2) DEFAULT 0,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity)
	VALUES("Bone Club Replica","Rainbow",7.75,26);
    
INSERT INTO products (product_name,department_name,price,stock_quantity)
	VALUES("Football Patch","Rainbow",1.15,30);
    
INSERT INTO products (product_name,department_name,price,stock_quantity)
	VALUES("Shy Mask","Rainbow",5.14,21);
    
INSERT INTO products (product_name,department_name,price,stock_quantity)
	VALUES("Wand Replica","Rainbow",12.99,23);
    
INSERT INTO products (product_name,department_name,price,stock_quantity)
	VALUES("Pocket Notebook","Rainbow",3.00,8);
    
INSERT INTO products (product_name,department_name,price,stock_quantity)
	VALUES("Striped Umbrella","Rainbow",6.25,13);
    
INSERT INTO products (product_name,department_name,price,stock_quantity)
	VALUES("Dragon Plush","Rainbow",5.95,14);
    
INSERT INTO products (product_name,department_name,price,stock_quantity)
	VALUES("Snake Charm","Rainbow",10.10,10);
    
INSERT INTO products (product_name,department_name,price,stock_quantity)
	VALUES("Goggles","Rainbow",8.40,20);
    
INSERT INTO products (product_name,department_name,price,stock_quantity)
	VALUES("Hair Tie","Rainbow",2.15,15);
    
INSERT INTO products (product_name,department_name,price,stock_quantity)
	VALUES("Cellphone Cover","Prism",10.60,70);
    
SELECT * FROM products;


CREATE TABLE departments (
	department_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs INTEGER(11) NOT NULL,
    PRIMARY KEY(department_id)
);

INSERT INTO departments(department_name,over_head_costs)
	VALUES("Rainbow",500);
    
INSERT INTO departments(department_name,over_head_costs)
	VALUES("Prism",200);
    
SELECT * FROM departments;