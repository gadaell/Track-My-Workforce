INSERT INTO department (department_id)
VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Sales Lead", 100000, 1)
    ("Salesperson", 80000, 1)
    ("Lead Engineer", 150000, 2)
    ("Software Engineer", 120000, 2)
    ("Account Manager", 140000, 3)
    ("Accountant", 125000, 3)
    ("Legal Team Lead", 250000, 4)
    ("Sales Lead", 100000, 1)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Doe", 1, NULL),
    ("Mike", "Chan", 2, 1),
    ("Ashley", "Rodriguez", 3, NULL),
    ("Kevin", "Tupik", 4, 3),
    ("Malina", "Brown", 6, NULL),
    ("Sarah", "Lourd", 7, NULL),
    ("Tom", "Allen", 8, 6),
    ("Christian", "Eckenrode", 3, NULL);