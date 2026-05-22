const {Command} = require("commander");
const program = new Command();
const fs = require("fs");
const path = require("path");

program
    .name("word-count cli")
    .description("counts the number of words in a file")
    .version("14.0.3")

program
    .command("count")
    .argument("<file>")
    .action((file)=>{
        fs.readFile(file,"utf-8",(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                const words = data.split(" ").length;
                console.log(`There are ${words} words in this file`)
            }
        })

    }) 
    
program.parse();    