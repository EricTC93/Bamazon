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

var productList = [];
var productIds = [];

connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	getInventory();
});

function getInventory() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		productList = res;
		return inquirer.prompt(commandList).then(selectCommand);
	});
}

function selectCommand(res) {
	switch(res.commnad) {
		case "View Products for Sale":
			return listProducts();
			break;

		case "View Low Inventory":
			return listLowInventory();
			break;
		
		case "Add to Inventory":
			return inventoryToAdd();
			break;
		
		case "Add New Product":
			return createProduct();
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

function inventoryToAdd() {

	for(var i = 0; i<productList.length; i++) {
		productIds.push(productList[i].item_id + "");
	}

	var managerQues = [{
		type:"list",
		message:"What is the id of the product you want to add inventory to?",
		choices:productIds,
		name:"productSelected"
	},{
		type:"input",
		message:"How many would you like to add?",
		name:"quantity"
	}];

	inquirer.prompt(managerQues).then(addInventory);
}


function addInventory(res) {
	for(var i = 0; i<productList.length; i++) {
		if(res.productSelected == productList[i].item_id) {
			var quantityAdd = parseInt(res.quantity);
			var inStock = parseInt(productList[i].stock_quantity);

			inStock+=quantityAdd;

			productList[i].stock_quantity = inStock;
			console.log("Iventory Change Successful");

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

    function(err) {
    	if (err) throw err;
    	console.log("Stock Updated");
    });

    return;
}

function createProduct() {
	var productQues = [{
		type:"input",
		message:"What's the name of the product?",
		name:"product_name"
	},{
		type:"input",
		message:"What department does the product come from?",
		name:"department_name"
	},{
		type:"input",
		message:"What is the price of the product? $",
		name:"price"
	},{
		type:"input",
		message:"How many are you adding to your inventory?",
		name:"stock_quantity"
	}];

	inquirer.prompt(productQues).then(addProduct);
}

function addProduct(res) {
	// console.log(res);

	connection.query("INSERT INTO products SET ?", res,
    function(err, res) {
    	if (err) throw err;
      // console.log(res.affectedRows + " product inserted!\n");
      console.log("Product added");
    }
  );
}