DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(32) NOT NULL,
    department_name VARCHAR(32) NULL,
    selling_price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER (10) NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, selling_price, stock_quantity)
VALUES ("Crockpot", "Kitchen", 75.00, 5),
("Extreme Juicer", "Kitchen", 300.00, 3),
("5.1 Surround Sound System", "Electronics", 270.05, 10),
("65 inch 4k Smart TV", "Electronics", 3500.00, 2),
("Cordless 80 VDC Lawn Mower", "Outdoor", 489.80, 5),
("2 Burner Liquid Propane Grill", "Outdoor", 139.99, 10),
("wicker Patio Furniture Set", "Outdoor", 155.98, 8),
("20V Cordless Drill", "Home Improvement", 152.77, 12),
("Corded Shop Vacuum", "Home Improvement", 78.00, 14),
("Floral Semi-Sheer Curtain", "Home Decor", 34.85, 20),
("Beveled Oval Wall Mirror", "Home Decor", 58.44, 20);