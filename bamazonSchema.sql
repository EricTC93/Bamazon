DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(11,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity)
	VALUES("bone club replica","Rainbow",7,26);
    
INSERT INTO products (product_name,department_name,price,stock_quantity)
	VALUES("football patch","Rainbow",1,30);
    
INSERT INTO products (product_name,department_name,price,stock_quantity)
	VALUES("shy mask","Rainbow",5,21);
    
INSERT INTO products (product_name,department_name,price,stock_quantity)
	VALUES("wand replica","Rainbow",12,23);
    
INSERT INTO products (product_name,department_name,price,stock_quantity)
	VALUES("notebook","Rainbow",3,8);
    
INSERT INTO products (product_name,department_name,price,stock_quantity)
	VALUES("umbrella","Rainbow",6,13);
    
INSERT INTO products (product_name,department_name,price,stock_quantity)
	VALUES("dragon plush","Rainbow",5,14);
    
INSERT INTO products (product_name,department_name,price,stock_quantity)
	VALUES("snake charm","Rainbow",10,10);
    
INSERT INTO products (product_name,department_name,price,stock_quantity)
	VALUES("goggles","Rainbow",8,20);
    
INSERT INTO products (product_name,department_name,price,stock_quantity)
	VALUES("hair tie","Rainbow",2,15);
    
-- SELECT * FROM products;
    

    
