const fs = require("fs");
const path = require("path");
const { Command } = require("commander");
const process = new Command();
const file = path.join(__dirname, "config.json");

const writeFile = (todo) => {
  const config = JSON.stringify(todo, null, 2);
  fs.writeFile(file, config, (writeError) => {
    if (writeError) {
      console.log("Error writing to file:", writeError);
    }
    console.log("Task Changes Successful");
  });
};

const generateTaskKey = (todo) => {
  const keys_length = Object.keys(todo).length;
  const task_id = keys_length + 1;
  return "task_" + task_id;
};

const addTask = (task) => {
  // * fetch the config.json file
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      console.log("Error occurred while reading config.json:", err);
    }

    // * convert the json file into an object
    const todo = JSON.parse(data);

    // * generate task key
    const task_key = generateTaskKey(todo);
    todo[task_key] = task;

    // * update the config file
    writeFile(todo);
  });
};

const showTasks = () => {
  // * reading config file and logging tasks
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      console.log("Error occurred while reading config.json:", err);
    }
    const todo = JSON.parse(data);
    console.log(todo);
  });
};

const updateTask = (task_key, taskDescription) => {
  // * read config file
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      console.log("Error occurred while reading config.json:", err);
    }
    const todo = JSON.parse(data);

    // * check whether input key exists or not
    if (!Object.hasOwn(todo, task_key)) {
      console.log(
        "Task key Does Not Exist!\nPlease use -show command to verify task keys"
      );
      return;
    }

    // * update task description provided
    todo[task_key] = taskDescription;

    // * update the config file
    writeFile(todo);
  });
};

const deleteTask = (task_key) => {
  // * read config file
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      console.log("Error occurred while reading config.json:", err);
    }
    const todo = JSON.parse(data);

    // * check whether input key exists or not
    if (!Object.hasOwn(todo, task_key)) {
      console.log(
        "Task key Does Not Exist!\nPlease use -show command to verify task keys"
      );
      return;
    }

    // * delete task
    delete todo[task_key];

    // * update the config file
    writeFile(todo);
  });
};

process
  .name("todo-app")
  .description("CLI which lets you add, delete and/or update tasks")
  .version("0.1.0");

process
  .command("add")
  .description("adds the described task")
  .argument("<string>", "task to add")
  .action(addTask);

process
  .command("show")
  .description("lists all tasks for user to refer")
  .action(showTasks);

process
  .command("update")
  .description("updates task based on task key")
  .argument("<string>", "task key to update")
  .argument("<string>", "updated task description")
  .action(updateTask);

process
  .command("delete")
  .description("deletes task based on task key")
  .argument("<string>", "task key to be deleted")
  .action(deleteTask);

process.parse();
