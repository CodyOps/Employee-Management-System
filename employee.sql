DROP DATABASE IF EXISTS employee_managementDB;
CREATE DATABASE employee_managementDB;

USE employee_managementDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(45)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(45),
  salary DECIMAL (10, 2),
  department_id INT 
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(45),
  last_name VARCHAR(45),
  manager_id INT,
  role_id INT
);

INSERT INTO department (name)
VALUES ("Human Resources"), ("Research and Development"), ("Engineering"), ("Accounting"), ("Sales"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUE ("recruiter", 57500, 1), ("manager", 75000.00, 2), ("engineer", 52000, 3), ("accountant", 62500, 4), ("sales person", 85650, 5), ("lawyer", 190000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("John", "Doe", 1, 3), ("Mike", "Chan", 5, 1), ("Ashley", "Rodriguez", 3, null), ("Kevin", "Tupik", 3, 3), ("Malia", "Brown", 4, null), ("Sarah", "Lourd", 6, null);

SELECT * FROM employee;