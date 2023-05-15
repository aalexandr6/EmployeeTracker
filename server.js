const express = require('express');
const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const PORT = process.env.PORT || 3001;
const app = express();
// Express middleware
app.use(express.json());
// connect to mysql database
//got rid of connection file and put it here
const connection = mysql2.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'password', //password
        database: 'etracker_db'
    },
    console.log(`Connected to the etracker_db database.`)

);
// function to start the application
const question = [{
            type: 'list',
            name: 'start',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all departments',
                'View all roles',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Update an employee manager',
                'View employees by manager',
                'View employees by department',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'Exit'
            ]
        }];
// function to start the application
function init () {
    inquirer.prompt(question).then((answer) => {
        switch (data.action) {
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'Update an employee manager':
                updateEmployeeManager();
                break;
            case 'View employees by manager':
                viewEmployeesByManager();
                break;
            case 'View employees by department':
                viewEmployeesByDepartment();
                break;
            case 'Delete a department':
                deleteDepartment();
                break;
            case 'Delete a role':
                deleteRole();
                break;
            case 'Delete an employee':
                deleteEmployee();
                break;
            case 'View the total utilized budget of a department':
                viewDepartmentBudget();
                break;
            case 'Quit':
                break
                default:
                    console.log(`Invalid action: ${answer.action}`);
                
        }
    });
}

// function to view all departments /promise
function viewAllDepartments() {
    connection.promise().query(
        `SELECT department.id, department.name AS department
        FROM department;`
    ).then(([rows, fields]) => {
        console.table(rows)
    }) 
    .catch(console.log)
    .then(() => init());
       
}

// function to view all roles /promise
function viewAllRoles() {
    connection.promise().query(
        `SELECT role.id, role.title, role.salary, department.name AS department
        FROM role
        LEFT JOIN department ON role.department_id = department.id;`
    ).then(([rows, fields]) => {
        console.table(rows);
    })
    .catch(console.log)
    .then(() => init());
}

// function to add a department /promise
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?'
        }
    ]).then((answer) => {
        connection.promise().query(
            `INSERT INTO department (name)
            VALUES (?);`, answer.department
        ).then(() => {
            console.log('Department added successfully!');
            init();
        }
        );
    });
}

// function to add a role /promise
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'input',
            name: 'department',
            message: 'What is the department ID of the role?'
        }
    ]).then((answer) => {
        connection.promise().query(
            `INSERT INTO role (title, salary, department_id)
            VALUES (?, ?, ?);`, [answer.role, answer.salary, answer.department]
        ).then(() => {
            console.log('Role added successfully!');
            init();
        }
        );
    });
}

// function to add an employee /promise
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?"
        },
        {
            type: 'input',
            name: 'role',
            message: "What is the employee's role ID?"
        },
        {
            type: 'input',
            name: 'manager',
            message: "What is the employee's manager ID?"
        }
    ]).then((answer) => {
        connection.promise().query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (?, ?, ?, ?);`, [answer.firstName, answer.lastName, answer.role, answer.manager]
        ).then(() => {
            console.log('Employee added successfully!');
            init();
        }
        );
    });
}

// function to view all employees /promise
function viewAllEmployees() {
    connection.promise().query(
        `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id;`
    ).then(([rows, fields]) => {
        console.table(rows);
        init();
    }
    );
}

// function to update an employee role /promise
function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee',
            message: "What is the employee's ID?"
        },
        {
            type: 'input',
            name: 'role',
            message: "What is the employee's new role ID?"
        }
    ]).then((answer) => {
        connection.promise().query(
            `UPDATE employee
            SET role_id = ?
            WHERE id = ?;`, [answer.role, answer.employee]
        ).then(() => {
            console.log('Employee role updated successfully!');
            init();
        }
        );
    });
}

// BONUS

// function to update an employee manager /promise
function updateEmployeeManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee',
            message: "What is the employee's ID?"
        },
        {
            type: 'input',
            name: 'manager',
            message: "What is the employee's new manager ID?"
        }
    ]).then((answer) => {
        connection.promise().query(
            `UPDATE employee
            SET manager_id = ?
            WHERE id = ?;`, [answer.manager, answer.employee]
        ).then(() => {
            console.log('Employee manager updated successfully!');
            init();
        }
        );
    });
}

// function to view employees by manager /promise
function viewEmployeesByManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'manager',
            message: "What is the manager's ID?"
        }
    ]).then((answer) => {
        connection.promise().query(
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON employee.manager_id = manager.id
            WHERE manager_id = ?;`, answer.manager
        ).then(([rows, fields]) => {
            console.table(rows);






init();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}
);

