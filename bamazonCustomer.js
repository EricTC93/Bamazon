// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var accounting = require("accounting-js");

// Mysql Connection
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",

	password: "password",
	database: "bamazon"
});

var productList = [];
var productIds = [];

connection.connect(function(err) {
	if (err) throw err;
	productsToPurchase();
});

// Displays the products to the user
function productsToPurchase() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;

		productList = res;

		console.log("\n-----------------------------------")
		for(var i = 0; i<productList.length; i++) {
			productIds.push(productList[i].item_id + "");
			console.log("Id:" + productList[i].item_id +
				" " + productList[i].product_name + 
				" from " + productList[i].department_name + "\n");
			console.log("     " + accounting.formatMoney(productList[i].price) + 
				"  " + productList[i].stock_quantity + " left\n" + 
				"-----------------------------------");
		}

		console.log("");

		// User selects product by id
		var customerQues = [{
			type:"list",
			message:"What is the id of the product you want to buy?",
			choices:productIds,
			name:"productSelected"
		},{
			type:"input",
			message:"How many would you like to purchase?",
			name:"quantity"
		}];

		return inquirer.prompt(customerQues).then(makePurchase);
	});
}

// Processes the purchase request
function makePurchase (res) {

	// Searches for the matching product
	for(var i = 0; i<productList.length; i++) {
		if(res.productSelected == productList[i].item_id) {
			var quantityReq = parseInt(res.quantity);
			var inStock = parseInt(productList[i].stock_quantity);

			// Can't buy more than is in stock
			if(quantityReq > inStock) {
				console.log("Insufficient quantity!\n");
			}

			inStock-=quantityReq;

			productList[i].stock_quantity = inStock;

			productList[i].product_sales += (productList[i].price * quantityReq);

			console.log("Purchase Successful");

			return updateBamazonDB(productList[i]);
		}
	}
}

// Updates the stock_quantity and product_sales in the mysql database
function updateBamazonDB(item) {

	connection.query("UPDATE products SET ? WHERE ?",
	[{
		stock_quantity: item.stock_quantity,
		product_sales: item.product_sales
    },{
        item_id: item.item_id
    }], 

    function(error) {
    	if (error) throw err;
    	console.log("Stock Updated\n");  
    });
}