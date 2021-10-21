DROP DATABASE IF EXISTS track_my_workforce_db;
CREATE DATABASE track_my_workforce_db;
USE track_my_workforce_db;

CREATE TABLE departments (
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES departments (id) SET NULL
);

CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30), 
    role_id INTEGER,
    
    FOREIGN KEY (role_id) REFERENCES roles(id SET NULL,
    manager_id INTEGER,
    FOREIGN KEY (manager_id) REFERENCES employees(id) SET NULL
);