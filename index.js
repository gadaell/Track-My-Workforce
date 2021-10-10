const express = require("express");
const inquirer = require("inquirer");
const cTable = require("console.table");
const promisemysql = require("promise-mysql");
const db = require("./db/connection");

// iQ = initial Question(main menu), general setup for startup in the database once sql is initiated
function iQ() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "iQ",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Employee By Department",
          "View All Employee by Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee",
          "Update Employee's Role",
          "Update Employee's Manager",
          "View All Departments",
          "View Department Budget",
          "Add Department",
          "Remove Department",
          "View All Roles",
          "Add Role",
          "Remove Role",
          "Quit",
        ],
      },
    ])
    .then((dataAnswer) => {
      switch (dataAnswer.action) {
        case "View All Employees":
          // vAE = View All Employees
          vAE();
          break;
        case "View All Employee By Department":
          //vAEBD = View All Employee By Department
          vAEBD();
          break;
        case "View All Employee by Manager":
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
          //uEM = Update Employee's Manager
          uEM();
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

        case "Quit":
          quitOperation();
          break;
      }
    });
}
