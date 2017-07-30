var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("table");
 
// var data = [
//     ['0A', '0B', '0C'],
//     ['1A', '1B', '1C'],
//     ['2A', '2B', '2C']
// ];

// var output = table.table(data);

// console.log(output);

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
		// console.log(productList);
		return getDepartments();
	});
}

function getDepartments() {
	connection.query("SELECT * FROM departments", function(err, res) {
		if (err) throw err;
		departmentList = res;
		// console.log(departmentList);
		return inquirer.prompt(commandList).then(selectCommand);
		// console.log(caculateSales(departmentList[0]));
		// console.log(calculateProfit(departmentList[0],15000));
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

function showSalesByDept() {

	var data = [
		[
			"department_id",
			"department_name",
			"over_head",
			"sales",
			"profit"
		]
	];

	for(var i = 0; i<departmentList.length; i++) {

		var dept = departmentList[i];
		var productSales = caculateSales(dept);
		var profit = calculateProfit(dept,productSales);

		var row = [
			dept.department_id,
			dept.department_name,
			dept.over_head_costs,
			productSales,
			profit
		];

		data.push(row);
	}

	var output = table.table(data);

	console.log(output);
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

function createDepartment() {
	var departmentQues = [{
		type:"input",
		message:"What's the name of the department?",
		name:"department_name"
	},{
		type:"input",
		message:"What's the total over head costs for the department?",
		name:"over_head_costs"
	}];

	inquirer.prompt(departmentQues).then(addDepartment);
}

function addDepartment(res) {
	// console.log(res);

	connection.query("INSERT INTO departments SET ?", res,
    function(err, res) {
    	if (err) throw err;
    	// console.log(res.affectedRows + " product inserted!\n");
    	console.log("Department added");
    }
  );
}
