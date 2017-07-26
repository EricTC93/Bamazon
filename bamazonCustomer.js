var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",

	password: "password",
	database: "bamazon"
});

var itemList = [];

connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	listItems();
});

function listItems() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		// console.log(res);
		itemList = res;

		console.log("\n-----------------------------------")
		for(var i = 0; i<itemList.length; i++) {
			console.log("Id:" + itemList[i].item_id +
				" " + itemList[i].product_name + 
				" from " + itemList[i].department_name + "\n");
			console.log("     $" + itemList[i].price + 
				"  " + itemList[i].stock_quantity + " left\n" + 
				"-----------------------------------");
		}
	});
}