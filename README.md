# EmployeeTracker (CMS)

## Project Description

This project is CLI application with no starter code that allows the user to view and manage the departments, roles, and employees in a company. It will be built using node, inquirer, and MySQL. The application will be invoked by using the following command:



```bash
node server.js
```

## (CMS) Content Management System

A content management system (CMS) is a software application that can be used to manage the creation and modification of digital content. They are typically used for enterprise content management (ECM) it typically supports multiple users in a collaborative environment. Features include include Web-based publishing, format management, history editing and version control, indexing, search, and retrieval.

## Criteria

```bash
Given a command line application that accepts user input
When I start the application
Then I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
When I choose to view all departments
Then I am presented with a formatted table showing department names and department ids
When I choose to view all roles
Then I am presented with the job title, role id, the department that role belongs to, and the salary for that role
When I choose to view all employees
Then I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
When I choose to add a department
Then I am prompted to enter the name of the department and that department is added to the database
When I choose to add a role
Then I am prompted to enter the name, salary, and department for the role and that role is added to the database
When I choose to add an employee
Then I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
When I choose to update an employee role
Then I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Console.Table

Method used to log arrays or objects to the print line in a table format. It is similar to console.log, but it is easier to read.

## Questions


[aalexandr6](https://github.com/aalexandr6) at aalexanderp6@gmail.com
