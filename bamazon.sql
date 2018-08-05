DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(32) NOT NULL,
    department VARCHAR(32) NULL,
    selling_price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER (10) NULL,
    product_sales DECIMAL(10, 2) NULL,

    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department, selling_price, stock_quantity, product_sales)
VALUES ("Crockpot", "Kitchen", 75.00, 5, 0),
("Extreme Juicer", "Kitchen", 300.00, 3, 0),
("5.1 Surround Sound System", "Electronics", 270.05, 10, 0),
("65 inch 4k Smart TV", "Electronics", 3500.00, 2, 0),
("Cordless 80 VDC Lawn Mower", "Outdoor", 489.80, 5, 0),
("2 Burner Liquid Propane Grill", "Outdoor", 139.99, 10, 0),
("wicker Patio Furniture Set", "Outdoor", 155.98, 8, 0),
("20V Cordless Drill", "Home Improvement", 152.77, 12, 0),
("Corded Shop Vacuum", "Home Improvement", 78.00, 14, 0),
("Floral Semi-Sheer Curtain", "Home Decor", 34.85, 20, 0),
("Beveled Oval Wall Mirror", "Home Decor", 58.44, 20, 0);

CREATE TABLE departments(
    department_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(32) NULL,
    overhead_cost DECIMAL(10, 2) NULL,

    PRIMARY KEY(department_id)
);

INSERT INTO departments (department_name, overhead_cost)
VALUES ("Kitchen", 1000.00),
("Electronics", 3000.00),
("Outdoor", 1500.00),
("Home Improvement", 2500.00),
("Home Decor", 1200.00);