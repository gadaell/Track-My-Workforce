DROP DATABASE IF EXISTS track_my_workforce_db;
CREATE DATABASE track_my_workforce_db;
USE track_my_workforce_db;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INTEGER,
    FOREIGN KEY (id) REFERENCES departments (id)
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL, 
    role_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES roles (id),
    manager_id INTEGER,
    FOREIGN KEY (manager_id) REFERENCES employees (id)
);