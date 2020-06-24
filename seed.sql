USE employee_db;

INSERT INTO department VALUES (1, "Engineering");
INSERT INTO department VALUES (2, "Accounting");
INSERT INTO department VALUES (3, "Sales");

INSERT INTO role VALUES (1, "Engineer", 80000.00, 1);
INSERT INTO role VALUES (2, "Seinor Engineer", 100000.00, 1);
INSERT INTO role VALUES (3, "Accountant", 70000.00, 2);
INSERT INTO role VALUES (4, "Senior Accountant", 90000.00, 2);
INSERT INTO role VALUES (5, "Salesman", 50000.00, 3);
INSERT INTO role VALUES (6, "Senior Salesman", 70000.00, 3);

INSERT INTO employee VALUES (1, "David", "Stewart", 1, 2);
INSERT INTO employee VALUES (2, "Tim", "Dusterdieck", 2, NULL);
INSERT INTO employee VALUES (3, "Phillip", "Fry", 3, 4);
INSERT INTO employee VALUES (4, "Hubert", "Farnsworth", 4, NULL);
INSERT INTO employee VALUES (5, "Joe", "Simpson", 5, 6);
INSERT INTO employee VALUES (6, "John", "Coats", 6, NULL);