// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var accounting = require("accounting-js");
var table = require("table");

// Mysql Connection
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

connection.connect(function(err) {
	if (err) throw err;
	return getInventory();
});

// Retrieves products from database
function getInventory() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		productList = res;

		return getDepartments();
	});
}

// Retrieves departments from database
function getDepartments() {
	connection.query("SELECT * FROM departments", function(err, res) {
		if (err) throw err;
		departmentList = res;

		return inquirer.prompt(commandList).then(selectCommand);
	});
}

function selectCommand(res) {
	switch(res.commnad) {
		case "View Product Sales by Department":
			return showSalesByDept();
			break;

		case "Create New Department":
			return createDepartment();
			break;
		
		default:
			console.log("There was an error");
			break;
	}
}

// Table that show the total sales by each department
function showSalesByDept() {

	// Table head
	var data = [
		[
			"department_id",
			"department_name",
			"over_head",
			"sales",
			"profit"
		]
	];

	// Creates table
	for(var i = 0; i<departmentList.length; i++) {

		var dept = departmentList[i];
		var productSales = caculateSales(dept);
		var profit = calculateProfit(dept,productSales);

		var row = [
			dept.department_id,
			dept.department_name,
			accounting.formatMoney(dept.over_head_costs),
			accounting.formatMoney(productSales),
			accounting.formatMoney(profit)
		];

		data.push(row);
	}

	var output = table.table(data);

	console.log(output);
	
}

// Calculates product sales for every product from a department
function caculateSales(dept) {
	var sales = 0;

	for(var i = 0; i<productList.length; i++) {
		if (productList[i].department_name === dept.department_name) {
			sales+=productList[i].product_sales;
		}
	}

	return sales;
}

// Calculates profit for a department based on sales and over head costs
function calculateProfit(dept,sales) {
	return sales - dept.over_head_costs;
}

// Creates a new department based on user input
function createDepartment() {
	var departmentQues = [{
		type:"input",
		message:"What's the name of the department?",
		name:"department_name"
	},{
		type:"input",
		message:"What's the total over head costs for the department? $",
		name:"over_head_costs"
	}];

	inquirer.prompt(departmentQues).then(addDepartment);
}

// Adds new department to the database
function addDepartment(res) {

	connection.query("INSERT INTO departments SET ?", res,
	    function(err, res) {
	    	if (err) throw err;

	    	console.log("Department added\n");
	    }
  	);
}
