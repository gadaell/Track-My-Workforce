const inquirer = require("inquirer");
const db = require("./db/connection");
const { printTable } = require("console-table-printer");
let newRoleDeptArray = [];
//new employee
let newEmpRoleArray = [];
let specEmpRoleArray = (newEmpRoleArray) =>
  newEmpRoleArray.filter((v, i) => newEmpRoleArray.indexOf(v) === i);
//new manager
let newEmpManagerArray = [];
let specEmpManagerArray = (newEmpManagerArray) =>
  newEmpManagerArray.filter((v, i) => newEmpManagerArray.indexOf(v) === i);
async function startQuestions() {
  // iQ = initial Question(main menu), general setup for startup in the database once sql is initiated
  let response = await inquirer.prompt([
    {
      name: "initialQuestions",
      type: "list",
      message: "Please make a selection",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department", //within the function you have to add another inquirer when choosing a department
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Quit",
      ],
    },
  ]);
  console.log(response);
  switch (response.initialQuestions) {
    case "View all departments":
      viewDepartments();
      break;
    case "View all employees":
      viewEmployees();
      break;
    case "View all roles":
      viewAllRoles();
      break;
    case "Add a department":
      addDepartment();
      break;
    case "Add a role":
      addRole();
      break;
    case "Add an employee":
      addEmployee();
      break;
    case "Update an employee role":
      updateEmployeeRole();
      break;
    case "Quit":
      quit();
      break;
  }
}

const viewDepartments = () => {
  const query = `SELECT * FROM departments;`;
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startQuestions();
  });
};
const viewEmployees = () => {
  const query = `SELECT * FROM employees;`;
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startQuestions();
  });
};
const viewAllRoles = () => {
  const query = `SELECT * FROM roles;`;
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startQuestions();
  });
};
const addDepartment = () => {
  const addDeptPrompt = [
    {
      type: "input",
      message: "Please enter the department name.",
      name: "newDept",
    },
  ];
  inquirer.prompt(addDeptPrompt).then((addDeptResponse) => {
    let newDepartment = addDeptResponse.newDept;
    db.query(
      `INSERT INTO departments (department_name) VALUES('${newDepartment}');`
    );
    startQuestions();
  });
};
// add a role
const addRole = () => {
  const addRolePrompts = [
    {
      type: "input",
      message: "Please enter the new role's name.",
      name: "newRole",
    },
    {
      type: "input",
      message: "Please enter the new role's salary.",
      name: "newRoleSalary",
    },
    {
      type: "list",
      message: "Which Department does this role belong to?",
      name: "newRoleDept",
      choices: newRoleDeptArray,
    },
  ];
  inquirer.prompt(addRolePrompts).then((addRoleResponse) => {
    let newRoleName = addRoleResponse.newRole;
    let newRoleSalary = addRoleResponse.newRoleSalary;
    let newRoleDepartmentName = addRoleResponse.newRoleDept;

    db.query(
      `SELECT departments.id FROM departments WHERE ('${newRoleDepartmentName}') = departments.department_name;`,

      function (err, results) {
        let newRoleDeptId = results[0].id;

        db.query(
          `INSERT INTO roles (title, salary, department_id) VALUES('${newRoleName}','${newRoleSalary}','${newRoleDeptId}');`,

          function (err, results) {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    );
    startQuestions();
  });

  db.query(
    `SELECT departments.department_name FROM departments;`,
    function (err, results) {
      results.forEach((index) => {
        newRoleDeptArray.push(index.department_name);
      });
    }
  );
};
// add an employee
const addEmployee = () => {
  const addEmpPrompts = [
    {
      type: "input",
      message: "Enter new employee's first name",
      name: "newEmpFirstName",
    },
    {
      type: "input",
      message: "Enter new employee's last name",
      name: "newEmpLastName",
    },
    {
      type: "list",
      message: "Choose this employee's role",
      name: "newEmpRole",
      choices: specEmpRoleArray(newEmpRoleArray),
    },
    {
      type: "list",
      message: "Choose this employee's manager",
      name: "newEmpManager",
      choices: specEmpManagerArray(newEmpManagerArray),
    },
  ];
  inquirer.prompt(addEmpPrompts).then((addEmpResponse) => {
    let newEmpFstName = addEmpResponse.newEmpFirstName;
    let newEmpLstName = addEmpResponse.newEmpLastName;
    let newEmpRle = addEmpResponse.newEmpRole;
    let newEmpMan = addEmpResponse.newEmpManager;
    if (newEmpMan !== "None") {
      db.query(
        `SELECT id FROM employees WHERE CONCAT(first_name, " ", last_name) = "${newEmpMan}";`,
        function (err, results) {
          let newEmpMgrId = results[0].id;

          db.query(
            `SELECT id FROM roles WHERE ('${newEmpRle}') = roles.title;`,
            function (err, results) {
              let newEmpRleId = results[0].id;
              //INSERTING the new Employee into the Employees Table.
              db.query(
                `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES('${newEmpFstName}','${newEmpLstName}','${newEmpRleId}','${newEmpMgrId}')`
              );
            }
          );
        }
      );
    } else {
      db.query(
        `SELECT id FROM roles WHERE ('${newEmpRle}') = roles.title;`,
        function (err, results) {
          let newEmpRleId = results[0].id;
          //INSERTING the new Employee into the Employees Table.
          db.query(
            `INSERT INTO employees (first_name, last_name, role_id) VALUES('${newEmpFstName}','${newEmpLstName}}','${newEmpRleId}')`
          );
        }
      );
    }

    startQuestions();
  });
};

startQuestions();
