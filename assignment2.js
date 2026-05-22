const fs = require("fs");
const path = require("path");
const {Command} = require("commander");
const program = new Command();

const todosPath = path.join(__dirname,"todos.json");

function readTodos(todosPath){
    if(!fs.existsSync(todosPath)){
        return [];
    }
    const data = fs.readFileSync(todosPath,"utf-8");
    return JSON.parse(data);
}

function saveTodos(todos){
    fs.writeFileSync(todosPath,JSON.stringify(todos,null,2));
}


program
    .name("todo")
    .description("A filesystem based todo list")
    .version("14.0.3")

program
    .command("add")
    .argument("<task>")
    .action((todo)=>{
        let currentTodos = readTodos();
        currentTodos.push({id:currentTodos.length+1, task: todo, done: false});
        saveTodos(currentTodos);
        console.log(`Added : ${todo}`);
    })

program.parse();    
    



