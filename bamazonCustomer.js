var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "BAMOZON"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  loadProducts();
});

function loadProducts() {
  
  connection.query("SELECT * FROM items", function(err, res) {
    if (err) throw err;

    console.table(res);

    promptCustomerForItem(res);
  });
}

function promptCustomerForItem(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "What is the ID of the item you would you like to purchase?",
      }
    ])
    .then(function(val) {
      checkIfShouldExit(val.choice);
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);

      if (product) {
        promptCustomerForQuantity(product);
      }
      else {
        console.log("\nThat item is not in the inventory.");
        loadProducts();
      }
    });
}

function promptCustomerForQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like?",
      }
    ])
    .then(function(val) {
      checkIfShouldExit(val.quantity);
      var quantity = parseInt(val.quantity);

      if (quantity > product.itemQuantity) {
        console.log("\nInsufficient quantity!");
        loadProducts();
      }
      else {
        makePurchase(product, quantity);
      }
    });
}
function makePurchase(product, quantity) {
  connection.query(
    "UPDATE products SET itemQuantity = itemQuantity - ? WHERE id = ?",
    [quantity, product.id],
    function(err, res) {
      console.log("\nSuccessfully purchased " + quantity + " " + product.itemName + "'s!");
      loadProducts();
    }
  );
}

function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].id === choiceId) {
      return inventory[i];
    }
  }
  // Otherwise return null
  return null;
}

function checkIfShouldExit(choice) {
  if (choice.toLowerCase() === "q") {
    console.log("Goodbye!");
    process.exit(0);
  }
}
