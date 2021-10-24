
INSERT INTO departments (department_name)
VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Sales Lead", 100000, 1),
    ("Salesperson", 80000, 1),
    ("Lead Engineer", 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Account Manager", 140000, 3),
    ("Accountant", 125000, 3),
    ("Legal Team Lead", 250000, 4),
    ("Sales Lead", 100000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Doe", 1, NULL),
    ("Roman", "Rollins", 2, 1),
    ("Ashley", "Rodriguez", 3, NULL),
    ("Charbelle", "Beamon", 4, 3),
    ("Malina", "Brown", 6, NULL),
    ("Sarah", "Kelly", 7, NULL),
    ("Tom", "Allen", 8, 6),
    ("Mark", "Henry", 3, NULL);

SELECT roles.id, roles.title, roles.salary FROM roles ORDER BY roles.id;
SELECT * FROM employees;

SELECT roles.title, employees.id, employees.first_name, employees.last_name, departments.department_name AS departments
    FROM employees
    LEFT JOIN roles ON (roles.id = employees.role_id)
    LEFT JOIN departments ON (department.id = roles.department_id)
    ORDER BY roles.title;

SELECT CONCAT( manager.first_name, '', manager.last_name) AS manager, department.department_name AS departments, employees.id, employees.first_name, employees.last_name, roles.title
    FROM employees
    LEFT JOIN employees manager ON (manager.id = employees.manager_id)
    INNER JOIN roles ON (roles.id = employees.role_id && employees.manager_id !="NULL")
    INNER JOIN departments ON (departments.id = roles.department_id)
    ORDER BY roles.title
