const mysql = require("mysql");
const ask = require("inquirer");
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "vPjrS6%29w,",
    database: "bamazon"
});

function printDepartments(){
    let sql = "SELECT department, department_id, department_name, overhead_cost, product_sales FROM products INNER JOIN departments ON department_name = department";
    connection.query(sql, (error, data)=>{
        if(error){
            console.log(`Error: ${error}`);
        }
        else{
            console.log(data);
            console.log('\n-ID-|---------Department Name--------|' +
                '---------Over Head Cost---------|' + '-----------Total Sales----------|'
                + '----------Total Profit----------');
            // console.log(`\n__________________________________________________________________________________________________`);
            let array = [];
            for(let i = 0; i < data.length; i++){
                if(data[i].department_id > array.length){
                    let item = {
                        id = data[i].department_id,
                        name = data[i].department_name,
                        cost = data[i].overhead_cost,
                        sales = data[i].product_sales
                    }
                    array.push(item);
                }
                else {
                    array[data[i].department_id - 1].sales += data[i].product_sales;
                }
            }
            for(let j = 0; j < array.length; j++){
                let whiteSpace = "                               ";
                let idWhiteSpace = "   ";

                let idString = array[j].id.toString();
                let nameString = array[j].name;
                let overheadString = array[j].cost.toFixed(2).toString();
                let salesString = array[j].sales.toFixed(2).toString();
                let profitString = (array[j].sales - array[j].cost).toFixed(2).toString();

                let idSpace = idWhiteSpace.slice(idString.length);
                let nameSpace = whiteSpace.slice(nameString.length);
                let overheadSpace = whiteSpace.slice(overheadString.length);
                let salesSpace = whiteSpace.slice(salesString.length);
                let profitSpace = whiteSpace.slice(profitString.length);
                let line = `${idSpace}${idString} | ${nameString}${nameSpace}| ${overheadSpace}${overheadString}| ${salesSpace}${salesString}| ${profitSpace}${profitString}`;
                console.log(line);
            }
            menu();
        }
    })
}

function createDepartment(){
    ask.prompt([
        {
            type: "input",
            name: "deptName",
            message: "What is the name of the new Department?"
        },
        {
            type: "input",
            name: "cost",
            message: "What is the Operating Cost of the Department? (per fiscal period)",
            validate: value=>{
                if(!isNaN(value) && value > 0) return true;
                else return false;
            }
        }
    ]).then(answers=>{
        let sql = 'INSERT INTO departments SET';
        connection.query(sql, 
        {
            department_name: answers.deptName,
            overhead_cost: answers.cost
        },error =>{
            if(error){
                console.log(`Inventory Error: ${error}`);
            }
            else{
                console.log("New Department Successfully added!");
                menu();
            }
        })
        
    })
}

function menu(){
    console.log(`\nWelcome to the bAmazon Supervisor's Console!\n`)
    ask.prompt([
        {
            type: "list",
            name: "action",
            message: "What action would you like to take?",
            choices: ["View Product Sales by Department", "Create New Department", "Close Application"],
            default: "View Product Sales by Department"
        }
    ]).then(answers=>{
        switch(answers.action){
            case "View Product Sales by Department":
            printDepartments();
            break

            case "Create New Department":
            createDepartment();
            break

            case "Close Application":
            connection.end();
            break
        }
    })
}

connection.connect(error=>{
    if(error){
        console.log(`Database Connection Error: ${error}`);
    }
    else{
        menu();
    }
})