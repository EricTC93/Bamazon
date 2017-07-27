var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",

	password: "password",
	database: "bamazon"
});

var productIds = [];

connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	listProducts();
});

function listProducts() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		// console.log(res);
		productList = res;

		console.log("\n-----------------------------------")
		for(var i = 0; i<productList.length; i++) {
			productIds.push(productList[i].item_id + "");
			console.log("Id:" + productList[i].item_id +
				" " + productList[i].product_name + 
				" from " + productList[i].department_name + "\n");
			console.log("     $" + productList[i].price + 
				"  " + productList[i].stock_quantity + " left\n" + 
				"-----------------------------------");
		}

		console.log(productIds);

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

		inquirer.prompt(customerQues).then(makePurchase);
	});
}

function makePurchase (res) {
	for(var i = 0; i<productList.length; i++) {
		if(res.productSelected == productList[i].item_id) {
			var quantityReq = parseInt(res.quantity);
			var inStock = parseInt(productList[i].stock_quantity);

			if(quantityReq > inStock) {
				console.log("Insufficient quantity!");
				return;
			}

			inStock-=quantityReq;
			// console.log(inStock);
			productList[i].stock_quantity = inStock;
			console.log("Purchase Successfull");
			// console.log(productList[i]);
			return updateStockQuantity(productList[i]);
		}
	}
}

function updateStockQuantity(item) {

	connection.query("UPDATE products SET ? WHERE ?",
	[{
		stock_quantity: item.stock_quantity
    },{
        item_id: item.item_id
    }], 

    function(error) {
    	if (error) throw err;
    	console.log("Stock Updated");
    });

    return;
}