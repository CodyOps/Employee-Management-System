//DEPENDENCIES
const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");
const logo = require("asciiart-logo");

//MYSQL CONNECTION
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "19951998",
  database: "employee_managementDB",
});

//CREATES A CONNECTION AND LOGS ARTWORK AND WELCOME SIGN IN TERMINAL. INITIATES THE START SCREEN FUNCTION UPON CONNECTION.
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected as id: " + connection.threadId);
  console.log(chalk.bgCyan("Welcome!"));
  const longText =
    "Add departments, roles, and employees to the Employee Management System. Also view tables of departments, roles and employees!";
  console.log(
    logo({
      name: "Employee Management System!",
      font: "Speed",
      lineChars: 10,
      padding: 2,
      margin: 3,
      borderColor: "grey",
      logoColor: "bold-yellow",
      textColor: "yellow",
    })
      .emptyLine()
      .right("version 3.7.123")
      .emptyLine()
      .center(longText)
      .render()
  );
  startScreen();
});

//FUNCTION TO ALLOW THE USER TO SELECT FROM ALL POSSIBLE CHOICES FROM ADDING OR VIEWING DEPARTMENTS, ROLES, AND EMPLOYEES. CALLS THE REPECTIVE FUNCTIONS FOR EACH. EXIT WILL END THE CONNECTION.
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

//USE INQUIRER TO PROMPT THE USER OF THE DEPARTMENT THEY WOULD LIKE TO ADD, INSERTS THAT INTO THE DEPARTMENT DATABASE TABLE.
//INFORMS THE USER VIA A TABLE AND A CONSOLE.LOG OF THE ADDED DEPARTMENT.
const addDeparment = () => {
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the department you would like to add?",
      name: "department",
    })
    .then((answer) => {
      let query = "INSERT INTO department (name) VALUES (?)";
      connection.query(query, [answer.department], (err, res) => {
        if (err) throw err;
        console.log("Department has been successfully added!");
        console.table(res);
        startScreen();
      });
    });
};

//USE INQUIRER TO PROMPT THE USER OF THE ROLE THEY WOULD LIKE TO ADD, INSERTS THAT INTO THE ROLE DATABASE TABLE.
//INFORMS THE USER VIA A TABLE AND A CONSOLE.LOG OF THE ADDED ROLE.
const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the name of the role you would like to add?",
        name: "roleName",
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "roleSalary",
      },
      {
        type: "input",
        message: "What is the department id number for this role?",
        name: "departmentID",
      },
    ])
    .then((answer) => {
      let query =
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
      connection.query(
        query,
        [answer.roleName, answer.roleSalary, answer.departmentID],
        (err, res) => {
          if (err) throw err;
          console.log("You have successfully added this new role!");
          console.table(res);
          startScreen();
        }
      );
    });
};

//USE INQUIRER TO PROMPT THE USER OF THE EMPLOYEE THEY WOULD LIKE TO ADD, INSERTS THAT INTO THE EMPLOYEE DATABASE TABLE.
//INFORMS THE USER VIA A TABLE AND A CONSOLE.LOG OF THE ADDED EMPLOYEE.
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

//CREATES A QUERY TO THE DEPARTMENT DATABASE AND SHOWS THE USER THE DEPARTMENTS TABLE, RUNS THE START SCREEN FUNCTION AGAIN TO ALLOW USERS TO CHOOSE A NEW ACTION
const viewDepartments = () => {
  let query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
};

//CREATES A QUERY TO THE ROLE DATABASE AND SHOWS THE USER THE ROLES TABLE, RUNS THE START SCREEN FUNCTION AGAIN TO ALLOW USERS TO CHOOSE A NEW ACTION
const viewRoles = () => {
  let query = "SELECT * FROM role";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
};

//CREATES A QUERY TO THE EMPLOYEE DATABASE AND SHOWS THE USER THE EMPLOYEE TABLE, RUNS THE START SCREEN FUNCTION AGAIN TO ALLOW USERS TO CHOOSE A NEW ACTION
const viewEmployees = () => {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
};

//USES INQUIRER TO PROMPT THE USER TO ADD A NEW EMPLOYEE ROLE, TAKES THE USERS INPUT AND ADDS IT TO THE DATABASE. CONSOLE.LOGS THE USER IF THE UPDATE HAS BEEN COMPLETED AND SHOWS THE USER THE TABLE OF THE NEW EMPLOYEE ROLE ADDED. RUNS THE START SCREEN FUNCTION TO ALLOW THE USER TO CHOOSE A NEW ACTION.
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
