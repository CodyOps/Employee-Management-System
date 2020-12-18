const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "19951998",
  database: "employee_managementDB",
});

connection.connnect((err) => {
  if (err) throw err;
  runsearch();
});

const runsearch = () => {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "what would you like to do?",
      choices: [
        "View all Employees",
        "View all Employees By Department",
        "View all Employees By Managers",
        "Add Employee",
        "Remove Employee",
        "Update Employee Roles",
        "Update Employee Manager",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View all Employees":
          employeeSearch();
          break;

        case "View all Employees By Department":
          searchByDepartment();
          break;

        case "View all Employees By Managers":
          byManager();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Update Employee Roles":
          updateEmployeeRoles();
          break;

        case "Update Employee Manager":
          updateEmployeeManager();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};
