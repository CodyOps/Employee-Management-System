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

const startScreen = () => {
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
        "Exit",
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

        case "Exit":
          connection.end();
          break;
      }
    });
};

const employeeSearch = () => {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
};

const searchByDepartment = () => {
  const query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
};

const byManager = () => {};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the first name of the employee?",
        name: "firstname",
      },
      {
        type: "input",
        message: "What's the last name of the employee?",
        name: "lastname",
      },
      {
        type: "input",
        message: "What is the employee's role id number?",
        name: "roleID",
      },
      {
        type: "input",
        message: "What is the employee's manager id number?",
        name: "managerID",
      },
    ])
    .then((answer) => {
      let query =
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
      connection.query(
        query,
        [answer.firstname, answer.lastname, answer.roleID, answer.managerID],
        (err, res) => {
          if (err) throw err;
          console.log("Employee was sucessfully added!");
          console.table(res);
          startScreen();
        }
      );
    });
};

const removeEmployee = () => {};

const updateEmployeeRoles = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to update?",
        name: "employeeUpdate",
      },

      {
        type: "input",
        message: "What role do you want to update this employee to?",
        name: "updatedRole",
      },
    ])
    .then((answer) => {
      let query = "UPDATE employee SET role_id=? WHERE first_name= ?";
      connection.query(
        query,
        [answer.updatedRole, answer.employeeUpdate],
        (err, res) => {
          if (err) throw err;
          console.log("Employee role has been successfully updated!");
          console.table(res);
          startScreen();
        }
      );
    });
};
