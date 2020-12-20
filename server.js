const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "19951998",
  database: "employee_managementDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected as id: " + connection.threadId);
  startScreen();
});

const startScreen = () => {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "what would you like to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Departments",
        "View Roles",
        "View Employees",
        "Update Employee Role",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "Add Department":
          addDeparment();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "View Departments":
          viewDepartments();
          break;

        case "View Roles":
          viewRoles();
          break;

        case "View Employees":
          viewEmployees();
          break;

        case "Update Employee Role":
          updateEmployeeRoles();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
};

const addDeparment = () => {};

const addRole = () => {};

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

const viewDepartments = () => {};

const viewRoles = () => {};

const viewEmployees = () => {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
};

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
