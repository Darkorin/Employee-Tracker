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
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

const start = function() {
    console.log("Welcome to the Employee Management System!");
    inquirer
    .prompt({
      name: "menu1",
      type: "list",
      message: "Main Menu:",
      choices: ["View", "Add", "Update", "Delete", "Exit"]
    }).then(({menu1}, err)=> {
        switch (menu1) {
            case "View":
                viewPrompt();
                break;
            case "Add":
                addPrompt();
                break;
            case "Update":
                updatePrompt();
                break;
            case "Delete":
                deletePrompt();
                break;
            case "Exit":
                exit();
                break;
            default:
                throw err;
        }
    })
}