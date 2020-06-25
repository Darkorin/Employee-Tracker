const mysql = require("mysql");
const inquirer = require("inquirer");
const employees = require("./employees");
const roles = require("./roles");
const dept = require("./dept");

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
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    console.log("Welcome to the Employee Management System!");
    start();
  });

const start = function() {
    inquirer
    .prompt({
      name: "menu1",
      type: "list",
      message: "Main Menu:",
      choices: ["Manage Employees", "Manage Roles", "Manage Departments", "View Budget", "Exit"]
    }).then(({menu1}, err)=> {
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
    }).then(({menu2}, err)=> {
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
    }).then(({menu2}, err)=> {
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
    }).then(({menu2}, err)=> {
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
    connection.query("SELECT * FROM department", function(err, results) {
    if (err) throw err;
    inquirer
    .prompt({
      name: "menu2",
      type: "list",
      message: "Budget Menu:",
      choices: function() {
          let choiceArray = ["Total Budget"];
          for(let i = 0; i < results.length; i++) {
            choiceArray.push(`${results[i].name} Budget`);
          }
          choiceArray.push("Back");
          return choiceArray;
      }
    }).then(({menu2}, err)=> {
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
    }).then(({menu2}, err)=> {
        switch (menu2) {
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

const addEmps = () => {
    
}

const updateEmps = () => {
    
}

const removeEmps = () => {
    
}

const viewRoles = () => {

}

const addRoles = () => {
    
}

const updateRoles = () => {
    
}

const removeRoles = () => {
    
}

const viewDept = () => {

}

const addDept = () => {
    
}

const removeDept = () => {
    
}

const totalBudget = () => {
    connection.query("SELECT salary FROM employee JOIN `role` ON role_id = `role`.id", function(err, results) {
        let budget = 0;
        results.forEach(employee => {
            budget += employee.salary;
        });
        console.log(`The Company-wide budget is: $${Math.floor(budget*100)/100}`)
        budgetPrompt();
    })
}

const deptBudget = (deptChoice) => {
    deptChoice = deptChoice.split(' ');
    deptChoice.pop();
    deptChoice = deptChoice.join(' ');
    connection.query("SELECT salary FROM employee JOIN `role` ON role_id = `role`.id JOIN department on department_id = department.id WHERE department.name = ?", deptChoice, function(err, results) {
        let budget = 0;
        results.forEach(employee => {
            budget += employee.salary;
        });
        console.log(`The budget for ${deptChoice} is: $${Math.floor(budget*100)/100}`)
        budgetPrompt();
    })
}

const viewAllEmps = () => {
    
}

const viewEmpSearch = () => {

}

const viewEmpByDept = () => {

}

const viewEmpByManager = () => {

}