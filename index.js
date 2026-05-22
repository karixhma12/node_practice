const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const filePath = path.join(__dirname,"sample.txt");

fs.readFile(filePath,"utf-8",function(err,data){
    if(err){
        console.log(err);
    }
    else{
        console.log(data);
    }
})

console.log(chalk.blue("Hello from Node.js!"));
console.log(chalk.red.bold("This is an error message!"));
console.log(chalk.green.underline("This is a success message!"));

