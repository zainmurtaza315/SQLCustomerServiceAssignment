var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection ({
host: "localhost", 
port: "3306", 
user: "root", 
password: "root",
database: "bamazon_db"
}); 

connection.connect(function(err) {
 if (err) throw err;

 console.log("connected to database" + connection.threadId);

 selectAll();
 connection.end();
});


// inquirer prompting questions: 

// Create a "Prompt" with a series of questions.
inquirer
  .prompt([
    {
      type: "input",
      message: "Enter the product ID you are looking for?",
      name: "username"
    },
    // Confirm the amount of products you would like.
    {
      type: "",
      message: "How many are you looking for?",
      name: ""
    },
    
    // Here we ask the user to confirm.
    {
      type: "confirm",
      message: "Are you sure:",
      name: "confirm",
      default: true
    }
  ])
  .then(function(inquirerResponse) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    if (inquirerResponse.confirm) {
      console.log("\nWelcome " + inquirerResponse.username.name.default);
      console.log(
        "Your " + inquirerResponse.pokemon + " Order is ready!\n"
      );

      // decrement based on what ID was chosen 
    } else {
      console.log(
        "\nThat's okay " +
          inquirerResponse.username +
          ", come again when you are more sure.\n"
      );
    }
  });

  function selectAll() {
  connection.query("select * from products", function(err, res) {
    if (err) throw err;
    console.log(res);
    console.log(res.products); //throws out the 
    connection.end();
  });


// parse and get specific information from database (Use select all method to grab and display all of the data in node)
