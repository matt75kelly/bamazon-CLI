const mysql = require("mysql");
const ask = require("inquirer");
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "vPjrS6%29w,",
    database: "bamazon"
});

function customerSale(data){
    let index = 0;
    ask.prompt([
        {
            type: "confirm",
            name: "sale",
            message: "\nWould you like to purchase one of these items?",
            default: true
        },
        {
            type: "input",
            name: "productID",
            message: "\nWhich item would you like to purchase?",
            when: answers=>{
                return answers.sale;
            },
            validate: value=>{
                if(!isNaN(value) && value <= data.length) {
                    index = value -1;
                    return true;
                }
                else return false;
            }
        },
        {
            type: "input",
            name: "quantity",
            message: "\nHow many of these would you like to buy?",
            when: answers=>{
                return answers.sale;
            },
            validate: value=>{
                if(!isNaN(value)){
                    if(value <= data[index].stock_quantity){
                        return true;
                    }
                    else{
                        console.log("\nI'm Sorry, but we have Insufficient Quantity to fulfill this Order.\n");
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
        }
    ]).then(answers=>{
        if(!answers.sale){
            console.log(`\nThank you for shopping with bAmazon!\nHave a Wonderful Day!`);
            connection.end();
        }
        else{
            let cost = answers.quantity * data[index].selling_price;
            console.log(`The Total Cost of this Purchase is: $${cost}.`);
            let sql = "UPDATE products SET ? WHERE ?"
            let newStock = data[index].stock_quantity - answers.quantity;
            connection.query(sql, [
                {
                    stock_quantity: newStock
                },
                {
                    item_id: answers.productID
                }
            ], err=>{
                if(err){
                    console.log(`\nInventory Error: ${err}`);
                }
                else{
                    console.log("\nYour order has successfully been fulfilled!\n");
                    setTimeout(printProducts, 4000);
                }
            });
        }
    })
}

function printProducts(){
    console.log("Welcome the bAmazon!!!\n");
    console.log("Here are today's HOT DEALS!\n");
    let sql = "SELECT `item_id`, `product_name`, `selling_price`, `stock_quantity` FROM products";
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
            customerSale(data);
        }
    })
}

connection.connect(error=>{
    if(error){
        console.log(`Connection Error ${error}`);
    }
    else{
        printProducts();
    }
});