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
	choices:["View Product Sales by Department","Create New Department"],
	name:"commnad"
}

var productList = [];
var departmentList = [];
// var productIds = [];

connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	return getInventory();
});

function getInventory() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		productList = res;
		console.log(productList);
		return getDepartments();
	});
}

function getDepartments() {
	connection.query("SELECT * FROM departments", function(err, res) {
		if (err) throw err;
		departmentList = res;
		console.log(departmentList);
		// return inquirer.prompt(commandList).then(selectCommand);
		console.log(caculateSales(departmentList[0]));
		console.log(calculateProfit(departmentList[0],15000));
	});
}

function selectCommand(res) {
	switch(res.commnad) {
		case "View Product Sales by Department":
			return;
			break;

		case "Create New Department":
			return;
			break;
		
		default:
			console.log("There was an error");
			break;
	}
}

function caculateSales(dept) {
	var sales = 0;

	for(var i = 0; i<productList.length; i++) {
		if (productList[i].department_name === dept.department_name) {
			sales+=productList[i].product_sales;
		}
	}

	return sales;
}

function calculateProfit(dept,sales) {
	return sales - dept.over_head_costs;
}
