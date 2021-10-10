const express = require("express");
const inquirer = require("inquirer");
const promisemysql = require("promise-mysql");
require("dotenv").config();
const db = require("./db/connection");
const { query } = require("express");
const { printTable } = require("console-table-printer");

// iQ = initial Question(main menu), general setup for startup in the database once sql is initiated
function iQ() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      name: "iQ",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees by Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee",
        "Update Employee's Manager",
        "Add Department",
        "Remove Department",
        "View All Roles",
        "Add Role",
        "Remove Role",
        "View Department Budgets",
        "Quit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View All Employees":
          // vAE = View All Employees
          vAE();
          break;
        case "View All Employees By Department":
          //vAEBD = View All Employee By Department
          vAEBD();
          break;
        case "View All Employees by Manager":
          //vAEBM = View All Employee by Manager
          vAEBM();
          break;
        case "Add Employee":
          //aE = Add Employee
          aE();
          break;
        case "Remove Employee":
          //rE = Remove Employee
          rE();
          break;
        case "Update Employee":
          //uE = Update Employee
          uE();
          break;
        case "Update Employee's Role":
          //uER = Update Employee's Role
          uER();
          break;
        case "Update Employee's Manager":
          uEM();
          break;
        case "Add Department":
          addDepart();
          break;
        case "Remove Department":
          removeDepart();
          break;
        case "View All Roles":
          //vARoles = View All Roles
          vARoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "Remove Role":
          removeRole();
          break;
        case "View Department Budgets":
          // viewDB = View Department Budgets
          viewDB();
          break;
        case "Quit":
          quitOperation();
          break;
      }
    });
}

//View All Employee Function
function vAE() {
  const sql = `SELECT e.id,
                    CONCAT(e.first_name, " ", e.last_name) AS Employee,
                    roles.title,
                    department.department_name,
                    roles.salary,
                    CONCAT(m.first_name, " ", m.last_name) AS Manager
                    FROM employee e
                    LEFT JOIN employee m ON
                        m.id = e.manager_id
                    LEFT JOIN roles ON
                        roles.id = e.role_id
                    LEFT JOIN department ON
                        department.id = roles.department_id`;
  db.query(sql).then((res) => printTable(res));
  //return to menu
  iQ();
}

iQ();
