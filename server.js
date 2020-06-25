const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "employee_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    console.log("Welcome to the Employee Management System!");
    start();
});

const start = function () {
    inquirer
        .prompt({
            name: "menu1",
            type: "list",
            message: "Main Menu:",
            choices: ["Manage Employees", "Manage Roles", "Manage Departments", "View Budget", "Exit"]
        }).then(({ menu1 }, err) => {
            switch (menu1) {
                case "Manage Employees":
                    empPrompt();
                    break;
                case "Manage Roles":
                    rolePrompt();
                    break;
                case "Manage Departments":
                    deptPrompt();
                    break;
                case "View Budget":
                    budgetPrompt();
                    break;
                case "Exit":
                    exit();
                    break;
                default:
                    throw err;
            }
        })
}

const empPrompt = () => {
    inquirer
        .prompt({
            name: "menu2",
            type: "list",
            message: "Employee Menu:",
            choices: ["View Employees", "Add Employees", "Update Employees", "Remove Employees", "Back"]
        }).then(({ menu2 }, err) => {
            switch (menu2) {
                case "View Employees":
                    viewEmps();
                    break;
                case "Add Employees":
                    addEmps();
                    break;
                case "Update Employees":
                    updateEmps();
                    break;
                case "Remove Employees":
                    removeEmps();
                    break;
                case "Back":
                    start();
                    break;
                default:
                    throw err;
            }
        })
}

const rolePrompt = () => {
    inquirer
        .prompt({
            name: "menu2",
            type: "list",
            message: "Employee Menu:",
            choices: ["View Roles", "Add Roles", "Update Roles", "Remove Roles", "Back"]
        }).then(({ menu2 }, err) => {
            switch (menu2) {
                case "View Roles":
                    viewRoles();
                    break;
                case "Add Roles":
                    addRoles();
                    break;
                case "Update Roles":
                    updateRoles();
                    break;
                case "Remove Roles":
                    removeRoles();
                    break;
                case "Back":
                    start();
                    break;
                default:
                    throw err;
            }
        })
}

const deptPrompt = () => {
    inquirer
        .prompt({
            name: "menu2",
            type: "list",
            message: "Employee Menu:",
            choices: ["View Departments", "Add Departments", "Remove Departments", "Back"]
        }).then(({ menu2 }, err) => {
            switch (menu2) {
                case "View Departments":
                    viewDept();
                    break;
                case "Add Departments":
                    addDept();
                    break;
                case "Remove Departments":
                    removeDept();
                    break;
                case "Back":
                    start();
                    break;
                default:
                    throw err;
            }
        })
}

const budgetPrompt = () => {
    connection.query("SELECT * FROM department", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt({
                name: "menu2",
                type: "list",
                message: "Budget Menu:",
                choices: function () {
                    let choiceArray = ["Total Budget"];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(`${results[i].name} Budget`);
                    }
                    choiceArray.push("Back");
                    return choiceArray;
                }
            }).then(({ menu2 }, err) => {
                switch (menu2) {
                    case "Total Budget":
                        totalBudget();
                        break;
                    case "Back":
                        start();
                        break;
                    default:
                        deptBudget(menu2);
                }
            })
    })
}

const exit = () => {
    console.log("Exiting Employee Management System.");
    connection.end();
    process.exit();
}

const viewEmps = () => {
    inquirer
        .prompt({
            name: "menu3",
            type: "list",
            message: "View Employees:",
            choices: ["All Employees", "Name Search", "By Department", "By Manager", "Back"]
        }).then(({ menu3 }, err) => {
            switch (menu3) {
                case "All Employees":
                    viewAllEmps();
                    break;
                case "Name Search":
                    viewEmpSearch();
                    break;
                case "By Department":
                    viewEmpByDept();
                    break;
                case "By Manager":
                    viewEmpByManager();
                    break;
                case "Back":
                    empPrompt();
                    break;
                default:
                    throw err;
            }
        })
}

const viewAllEmps = () => {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager, title, salary, `name` AS Department FROM employee employee LEFT JOIN employee manager ON employee.manager_id = manager.id LEFT JOIN `role` ON employee.role_id = `role`.id LEFT JOIN department ON department_id = department.id", function (err, results) {
        if (err) throw err;
        console.table(results);
        viewEmps();
    })
}

const viewEmpSearch = () => {
    inquirer.prompt({
        name: "name",
        type: "input",
        message: "Enter employee name:"
    }).then(({ name }, err) => {
        if (err) throw err;
        connection.query("SELECT employee.id, employee.first_name, employee.last_name, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager, title, salary, `name` AS Department FROM employee employee LEFT JOIN employee manager ON employee.manager_id = manager.id LEFT JOIN `role` ON employee.role_id = `role`.id LEFT JOIN department ON department_id = department.id WHERE CONCAT(employee.last_name, ', ', employee.first_name) = ? OR CONCAT(employee.first_name, ' ', employee.last_name) = ? OR employee.first_name = ? OR employee.last_name = ?", [name, name, name, name], function (err, results) {
            if (err) throw err;
            console.table(results);
            viewEmps();
        })
    })
}

const viewEmpByDept = () => {
    connection.query("SELECT * FROM department", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt({
                name: "menu4",
                type: "list",
                message: "View Employees by Department:",
                choices: function () {
                    let choiceArray = ["All Departments"];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].name);
                    }
                    choiceArray.push("Back");
                    return choiceArray;
                }
            }).then(({ menu4 }) => {
                switch (menu4) {
                    case "All Departments":
                        viewEmpByDeptAll();
                        break;
                    case "Back":
                        start();
                        break;
                    default:
                        viewEmpByDeptSingle(menu4);
                }
            })
    })
}

const viewEmpByManager = () => {
    connection.query("SELECT * FROM employee WHERE manager_id IS NULL", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt({
                name: "menu4",
                type: "list",
                message: "View Employees by Manager:",
                choices: function () {
                    let choiceArray = ["All Managers"];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(`${results[i].first_name} ${results[i].last_name}`);
                    }
                    choiceArray.push("Back");
                    return choiceArray;
                }
            }).then(({ menu4 }) => {
                switch (menu4) {
                    case "All Managers":
                        viewEmpByManagerAll();
                        break;
                    case "Back":
                        start();
                        break;
                    default:
                        viewEmpByManagerSingle(menu4);
                }
            })
    })
}

const viewEmpByDeptAll = () => {
    connection.query("SELECT `name` AS Department, employee.id, employee.first_name, employee.last_name, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager, title, salary FROM employee employee LEFT JOIN employee manager ON employee.manager_id = manager.id LEFT JOIN `role` ON employee.role_id = `role`.id LEFT JOIN department ON department_id = department.id ORDER BY `name`", function (err, results) {
        if (err) throw err;
        console.table(results);
        viewEmpByDept();
    })
}

const viewEmpByDeptSingle = deptChoice => {
    connection.query("SELECT `name` AS Department, employee.id, employee.first_name, employee.last_name, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager, title, salary FROM employee employee LEFT JOIN employee manager ON employee.manager_id = manager.id LEFT JOIN `role` ON employee.role_id = `role`.id LEFT JOIN department ON department_id = department.id WHERE `name` = ?", deptChoice, function (err, results) {
        if (err) throw err;
        console.table(results);
        viewEmpByDept();
    })
}

const viewEmpByManagerAll = () => {
    connection.query("SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS Manager, employee.id, employee.first_name, employee.last_name,  title, salary, `name` AS Department FROM employee employee INNER JOIN employee manager ON employee.manager_id = manager.id INNER JOIN `role` ON employee.role_id = `role`.id INNER JOIN department ON department_id = department.id ORDER BY Manager", function (err, results) {
        if (err) throw err;
        console.table(results);
        viewEmpByManager();
    })
}

const viewEmpByManagerSingle = managerChoice => {
    connection.query("SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS Manager, employee.id, employee.first_name, employee.last_name,  title, salary, `name` AS Department FROM employee employee INNER JOIN employee manager ON employee.manager_id = manager.id INNER JOIN `role` ON employee.role_id = `role`.id INNER JOIN department ON department_id = department.id HAVING Manager = ?", managerChoice, function (err, results) {
        if (err) throw err;
        console.table(results);
        viewEmpByManager();
    })
}

const addEmps = () => {

}

const updateEmps = () => {

}

const removeEmps = () => {

}

const viewRoles = () => {
    inquirer
        .prompt({
            name: "menu3",
            type: "list",
            message: "View Roles:",
            choices: ["All Roles", "By Department", "Back"]
        }).then(({ menu3 }, err) => {
            switch (menu3) {
                case "All Roles":
                    viewAllRoles();
                    break;
                case "By Department":
                    viewRolesByDept();
                    break;
                case "Back":
                    rolePrompt();
                    break;
                default:
                    throw err;
            }
        })
}

const viewAllRoles = () => {
    connection.query("SELECT role.id, title, salary, `name` AS department FROM `role` JOIN department ON department_id = department.id ORDER BY role.id", function (err, results) {
        if (err) throw err;
        console.table(results);
        viewRoles();
    })
}

const viewRolesByDept = () => {
    connection.query("SELECT `name` FROM department", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt({
                name: "menu4",
                type: "list",
                message: "View Roles by Department:",
                choices: function () {
                    let choiceArray = ["All Departments"];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].name);
                    }
                    choiceArray.push("Back");
                    return choiceArray;
                }
            }).then(({ menu4 }) => {
                switch (menu4) {
                    case "All Departments":
                        viewRolesByDeptAll();
                        break;
                    case "Back":
                        start();
                        break;
                    default:
                        viewRolesByDeptSingle(menu4);
                }
            })
    })
}

const viewRolesByDeptAll = () => {
    connection.query("SELECT role.id, title, salary, `name` AS department FROM `role` JOIN department ON department_id = department.id ORDER BY `name`", function (err, results) {
        if (err) throw err;
        console.table(results);
        viewRolesByDept();
    })
}

const viewRolesByDeptSingle = deptChoice => {
    connection.query("SELECT role.id, title, salary, `name` AS department FROM `role` JOIN department ON department_id = department.id WHERE `name` = ?", deptChoice, function (err, results) {
        if (err) throw err;
        console.table(results);
        viewRolesByDept();
    })
}

const addRoles = () => {
    inquirer.prompt({
        name: "name",
        type: "input",
        message: "Enter a name for your role"
    }).then(({ name }, err) => {
        connection.query("SELECT `name` FROM department", function (err, results) {
            if (err) throw err;
            inquirer.prompt({
                name: "dept",
                type: "list",
                message: `What dept is ${name} in?`,
                choices: function () {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].name);
                    }
                    choiceArray.push("Back");
                    return choiceArray;
                }
            }).then(({ dept }, err) => {
                if (err) throw err;
                inquirer.prompt({
                    name: "salary",
                    type: "input",
                    message: `Enter a salary for ${name}`
                }).then(({ salary }, err) => {
                    let deptID;
                    connection.query("SELECT `name`, department.id FROM department JOIN role ON department.id = department_id WHERE `name` = ?", dept, function (err, results) {
                        deptID = results[0].id;
                        connection.query("INSERT INTO role (title, salary, department_id) VALUE (?, ?, ?)", [name, salary, deptID], function (err) {
                            if (err) throw err;
                            console.log(`${name} Role Added.`);
                            rolePrompt();
                        })
                    })
                })
            })
        })
    })
}

const updateRoles = () => {

}

const removeRoles = () => {
    connection.query("SELECT title FROM role", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt({
                name: "menu3",
                type: "list",
                message: "Remove Role:",
                choices: function () {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].title);
                    }
                    choiceArray.push("Back");
                    return choiceArray;
                }
            }).then(({ menu3 }) => {
                switch (menu3) {
                    case "Back":
                        start();
                        break;
                    default:
                        connection.query("DELETE FROM role WHERE title = ?", menu3, function (err) {
                            if (err) throw err;
                            console.log(`${menu3} Removed.`);
                            rolesPrompt();
                        });
                }
            })
    })
}

const viewDept = () => {
    connection.query("SELECT * FROM department", function (err, results) {
        if (err) throw err;
        console.table(results);
        deptPrompt();
    })
}

const addDept = () => {
    inquirer.prompt({
        name: "name",
        type: "input",
        message: "Enter a name for your department"
    }).then(({ name }, err) => {
        if (err) throw err;
        connection.query("INSERT INTO department (name) VALUE (?)", name, function (err) {
            if (err) throw err;
            console.log(`${name} Department Added.`);
            deptPrompt();
        })
    })
}

const removeDept = () => {
    connection.query("SELECT `name` FROM department", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt({
                name: "menu3",
                type: "list",
                message: "Remove Department:",
                choices: function () {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].name);
                    }
                    choiceArray.push("Back");
                    return choiceArray;
                }
            }).then(({ menu3 }) => {
                switch (menu3) {
                    case "Back":
                        start();
                        break;
                    default:
                        connection.query("DELETE FROM department WHERE `name` = ?", menu3, function (err) {
                            if (err) throw err;
                            console.log(`${menu3} Removed.`);
                            deptPrompt();
                        });
                }
            })
    })
}
const totalBudget = () => {
    connection.query("SELECT name AS Department, SUM(salary) AS Budget FROM employee JOIN `role` ON role_id = `role`.id JOIN department on department_id = department.id GROUP BY (department.name)", function (err, results) {
        if (err) throw err;
        let budget = 0;
        results.forEach(dept => {
            budget += dept.Budget;
        });
        console.table(results);
        console.log(`Total: $${Math.floor(budget * 100) / 100}`)
        budgetPrompt();
    })
}

const deptBudget = deptChoice => {
    deptChoice = deptChoice.split(' ');
    deptChoice.pop();
    deptChoice = deptChoice.join(' ');
    connection.query("SELECT title AS Role, salary AS Salary FROM employee JOIN `role` ON role_id = `role`.id JOIN department on department_id = department.id WHERE department.name = ?", deptChoice, function (err, results) {
        if (err) throw err;
        let budget = 0;
        results.forEach(employee => {
            budget += employee.Salary;
        });
        console.table(results);
        console.log(`${deptChoice} Total: $${Math.floor(budget * 100) / 100}`)
        budgetPrompt();
    })
}