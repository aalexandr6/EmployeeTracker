-- Inserts names of departments into department table
INSERT INTO departments
  (name)
VALUES
  ('Accounting'),
  ('Sales'),
  ('Customer Service'),
  ('Human Resources'),
  ('Information Technology'),
  ('Marketing');

-- Inserts names of roles into role table
INSERT INTO roles
  (title, salary, department_id)
VALUES
  ('Accountant', 900000, 1),
  ('Salesperson', 60000, 2),
  ('Customer Service Representative', 55000, 3),
  ('Human Resources Representative',65000, 4),
  ('IT Specialist', 1000000, 5),
  ('Marketing Specialist', 55000, 6);

-- Inserts names of employees into employee table
INSERT INTO employees
  (first_name, last_name, role_id, manager_id)

VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Doe', 2, 1),
  ('Jack', 'Doe', 3, 2),
  ('Jill', 'Doe', 4, 3),
  ('James', 'Doe', 5, 4),
  ('Jenny', 'Doe', 6, 5);
 