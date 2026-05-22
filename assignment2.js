const fs = require("fs");
const path = require("path");
const {Command} = require("commander");
const program = new Command();

const todosPath = path.join(__dirname,"todos.json");

function readTodos(){
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

program 
    .command("done")
    .argument("<id>")
    .action((id)=>{
        let todos = readTodos();
        let todo = todos.find((todo)=>{
            return todo.id === parseInt(id);
        })
        if(!todo){
            console.log("Todo not found!");
        }
        else{
            todo.done = true;
            saveTodos(todos);
            console.log(`Marked as done : ${todo.task}`);
        }

    }) 
    
program 
    .command("delete")
    .argument("<id>")
    .action((id)=>{
        let todos = readTodos();
        let todo = todos.find((todo)=>{
            return todo.id===parseInt(id)
        })
        if(!todo){
            console.log("Todo not found!");
        }
        else{
            let newTodos = todos.filter((todo)=>{
            return todo.id!=parseInt(id)
            })
            saveTodos(newTodos);
            console.log(`Deleted : ${todo.task}`)
        }
        
    })    

program   
    .command("list")
    .action((todosPath)=>{
        const todos = readTodos();
        if(todos.length===0){
            console.log("No todos yet!");
        }
        else{
            todos.forEach(item=>{
                console.log(`${item.id} : ${item.done ? '✅' : '⬜'} - ${item.task}` )
            })
        }
        
    })

program.parse();    



    



