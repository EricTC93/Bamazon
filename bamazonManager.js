var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",

	password: "password",
	database: "bamazon"
});

var commandList = {
	type:"list",
	message:"What would like to do?",
	choices:["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"],
	name:"commnad"
}

connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	inquirer.prompt(commandList).then(selectCommand);
});


function selectCommand(res) {
	switch(res.commnad) {
		case "View Products for Sale":
			return listProducts();
			break;

		case "View Low Inventory":
			return listLowInventory();
			break;
		
		case "Add to Inventory":
			break;
		
		case "Add New Product":
			break;
		
		default:
			console.log("There was an error");
			break;
	}
}

function listProducts() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		productList = res;

		console.log("\n-----------------------------------")
		for(var i = 0; i<productList.length; i++) {

			console.log("Id:" + productList[i].item_id +
				" " + productList[i].product_name + 
				" from " + productList[i].department_name + "\n");
			console.log("     $" + productList[i].price + 
				"  " + productList[i].stock_quantity + " left\n" + 
				"-----------------------------------");
		}

		return;
	});
}

function listLowInventory() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		productList = res;

		console.log("\n-----------------------------------")
		for(var i = 0; i<productList.length; i++) {
			if (productList[i].stock_quantity <= 5) {
			
				console.log("Id:" + productList[i].item_id +
					" " + productList[i].product_name + 
					" from " + productList[i].department_name + "\n");
				console.log("     $" + productList[i].price + 
					"  " + productList[i].stock_quantity + " left\n" + 
					"-----------------------------------");
			}
			
		}

		return;
	});
}