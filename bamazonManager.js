const mysql = require("mysql");
const ask = require("inquirer");
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "vPjrS6%29w,",
    database: "bamazon"
});

function printProducts(){
    let sql = "SELECT item_id, product_name, selling_price, stock_quantity FROM products";
    connection.query(sql, (error, data)=>{
        if(error){
            console.log(`Error: ${error}`);
        }
        else{
            console.log('\n-ID-|----------Product Name----------|' +
                '-----------List Price-----------|' + '-------Remaining Quantity-------');
            // console.log(`\n__________________________________________________________________________________________________`);
            for(let i = 0; i < data.length; i++){
                let whiteSpace = "                               ";
                let idWhiteSpace = "   ";

                let idString = data[i].item_id.toString();
                let nameString = data[i].product_name;
                let priceString = data[i].selling_price.toFixed(2).toString();
                let countString = data[i].stock_quantity.toString();

                let idSpace = idWhiteSpace.slice(idString.length);
                let nameSpace = whiteSpace.slice(nameString.length);
                let priceSpace = whiteSpace.slice(priceString.length);
                let countSpace = whiteSpace.slice(countString.length);
                let line = `${idSpace}${idString} | ${nameString}${nameSpace}| ${priceSpace}${priceString}| ${countSpace}${countString}`
                console.log(line);
            }
            setTimeout(menu, 2500);
        }
    })
}

function printLowProducts(){
    let sql = "SELECT item_id, product_name, selling_price, stock_quantity FROM products WHERE `stock_quantity` < 5";
    connection.query(sql, (error, data)=>{
        if(error){
            console.log(`Error: ${error}`);
        }
        else{
            console.log('\n-ID-|----------Product Name----------|' +
                '-----------List Price-----------|' + '-------Remaining Quantity-------');
            // console.log(`\n__________________________________________________________________________________________________`);
            for(let i = 0; i < data.length; i++){
                let whiteSpace = "                               ";
                let idWhiteSpace = "   ";

                let idString = data[i].item_id.toString();
                let nameString = data[i].product_name;
                let priceString = data[i].selling_price.toFixed(2).toString();
                let countString = data[i].stock_quantity.toString();

                let idSpace = idWhiteSpace.slice(idString.length);
                let nameSpace = whiteSpace.slice(nameString.length);
                let priceSpace = whiteSpace.slice(priceString.length);
                let countSpace = whiteSpace.slice(countString.length);
                let line = `${idSpace}${idString} | ${nameString}${nameSpace}| ${priceSpace}${priceString}| ${countSpace}${countString}`
                console.log(line);
            }
            setTimeout(menu, 2500);
        }
    })
}

function increaseStock(){
    let sql = "SELECT product_name, stock_quantity FROM products";
    connection.query(sql, (error, data)=>{
        if(error){
            console.log(`Inventory Error: ${error}`);
        }
        else{
            let array = [];
            for(let i = 0; i < data.length; i++){
                array.push(data[i].product_name)
            }
            ask.prompt([
            {
                type: "list",
                name: "product",
                message: "Which item would you like to increase the stock of?",
                choices: array
            },
            {
                type: "input",
                name: "quantity",
                message: "By how much would you like to increase the stock of this item?",
                validate: value=>{
                    if(!isNaN(value) && value > 0) return true;
                    else{
                        console.log(`\nI'm sorry, that doesn't make sense. Try again?`);
                        return false;
                    }
                }
            }
        ]).then(answers=>{
            console.log("Updating Inventory...");
            let newStock = Number(answers.quantity);
            for(let j = 0; j < data.length; j++){
                if(data[j].product_name === answers.product){
                    newStock += data[j].stock_quantity;
                }
            }
            let sql2 = "UPDATE products SET ? WHERE ?";
            connection.query(sql2, [
                {
                    stock_quantity : newStock
                },
                {
                    product_name : answers.product
                }
            ], err=>{
                    if(err){
                        console.log(`Error adding stock: ${err}`);
                    }
                    else{
                        console.log("Stock successfully added.");
                        setTimeout(menu, 2500);
                    }
                }
            )
        })
    }
    });
}

function addNewStock(){
    let sql = "SELECT department_name FROM departments";
    connection.query(sql,(err, data)=>{
        if(error){
            console.log(`Connection Error: ${err}`);
        }
        else{
            console.log(data);
            let depts = [];
            for(let j = 0; j < data.length; j++){
                depts.push(data[j].department_name);
            }
            ask.prompt([
                {
                    type: "input",
                    name: "productName",
                    message: "What is the name of the Product you wish to add?"
                },
                {
                    type: "list",
                    name: "department",
                    message: "Which department does this Product belong to?",
                    choices: depts
                },
                {
                    type: "input",
                    name: "price",
                    message: "What is the selling price for this Product?",
                    validate: value=>{
                        if(!isNaN(value) && value > 0) return true;
                        else return false;
                    }
                },
                {
                    type: "input",
                    name: "stock",
                    message: "What is the initial stock of this Product you would like to add to inventory?",
                    validate: value=>{
                        if(!isNaN(value) && value > 0) return true;
                        else return false;
                    }
                }
            ]).then(answers=>{
                let item ={
                    product_name: answers.productName,
                    department: answers.department,
                    selling_price: Number(answers.price).toFixed(2),
                    stock_quantity: Math.floor(Number(answers.stock)),
                    product_sales: 0
                };
                let sql2 = "INSERT INTO products SET ?"
                connection.query(sql2, item, error=>{
                    if(error){
                        console.log(`Creation Error: ${error}`);
                    }
                    else{
                        console.log(`Product successfully added into inventory!`);
                        setTimeout(menu, 2500);
                    }
                })
            })
        }
    })
    
}
 function menu(){
     ask.prompt([
         {
             type: "list",
             name: "action",
             message: "Welcome to the bAmazon inventory management tool?\nWhat would you like to do today?",
             choices: ["View Inventory", "View Low Stock Items", "Add Stock to Item", "Add New Product", "Close Application"]
         }  
     ]).then(answers=>{
         switch(answers.action){
             case "View Inventory":
             printProducts();
             break;

             case "View Low Stock Items":
             printLowProducts();
             break;

             case "Add Stock to Item":
             increaseStock();
             break;

             case "Add New Product":
             addNewStock();
             break;

             case "Close Application":
             connection.end();
             break;
         }
     })
 }
connection.connect(err=>{
    if(err){
        console.log("Cannot connect to inventory: " + err);
    }
    else{
        menu();
    }
});