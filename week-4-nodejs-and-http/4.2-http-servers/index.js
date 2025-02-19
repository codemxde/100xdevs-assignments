// # Assignment Statement
// * Express-ify the last week's todo assignment, and make the
// * todo application accessible and interactive through API calls

const fs = require("fs");
const filePath = "config.json";

const chalk = require("chalk");
const express = require("express");
app = express();

(function createJSONIfNotExists() {
  //  create json file if not already exists
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log(`Data file does not exist, attempting to create..`);
      initJSONFile();
    }
  });
})();

const initJSONFile = () => {
  fs.writeFile("config.json", JSON.stringify({}), (err) => {
    if (err) {
      throw new Error("Error in initialising JSON file");
    }
    console.log("Config.json created successfully");
  });
};

const addTask = (task, todo) => {
  const taskKey = generateTaskKey(todo);
  todo[taskKey] = task;
};

const updateTask = (taskKey, task, todo) => {
  if (!Object.hasOwn(todo, taskKey)) {
    throw new Error(
      "Task Key does not exist!\nPlease use GET request to view all valid options\n"
    );
  }
  todo[taskKey] = task;
};

const generateTaskKey = (todo) => {
  const taskKey = Object.keys(todo).length + 1;
  return "task_" + taskKey;
};

//  GET call to fetch all TODOs
app.get("/", function (req, res) {
  fs.readFile("config.json", "utf-8", (err, data) => {
    if (err) {
      console.log(chalk.red(err.message, "\n"));
      res.status(500).json({ msg: "Error occured while reaading config file" });
    }

    console.log(chalk.green("GET Successful\n"));
    res.json(JSON.parse(data));
  });
});

//  POST call to add a TODO
app.post("/", function (req, res) {
  const task = req.query.task;
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log(chalk.red(err.message, "\n"));
      res.status(500).json({ err: "Error occured while reaading config file" });
    }

    const todo = JSON.parse(data);
    addTask(task, todo);

    fs.writeFile(filePath, JSON.stringify(todo, null, 2), (err) => {
      if (err) {
        console.log(chalk.red(err.message, "\n"));
        res.status(500).json({
          err: "Failed to write file on disc",
        });
      }

      console.log(chalk.green("Succesfully Added Todo\n"));
      res.status(200).json({
        msg: "Succesfully Added Todo",
      });
    });
  });
});

// PUT call to update a TODO based on task key
app.put("/", function (req, res) {
  const taskKey = req.query.taskKey;
  const task = req.query.task;

  fs.readFile(filePath, "utf-8", function (err, data) {
    if (err) {
      console.log(chalk.red(err.message));
      res.status(500).send("Error occured while reaading config file");
    }
    const todo = JSON.parse(data);
    try {
      updateTask(taskKey, task, todo);
      fs.writeFile(filePath, JSON.stringify(todo, null, 2), (err) => {
        if (err) {
          throw new Error("Error occured while writing config file");
        } else {
          console.log(chalk.green("Updated TODO Successfully"));
          res.status(200).send("Updated TODO Successfully");
        }
      });
    } catch (err) {
      console.log(chalk.red(err.message));
      res
        .status(500)
        .json({ err: "Unexpected Error While Trying to Update Task" });
    }
  });
});

// DELETE call to remove a TODO based on task key
app.delete("/", function (req, res) {
  try {
    const { taskKey } = req.query;
    if (!taskKey) {
      console.log(chalk.red("Requested Parameter Not Sent\n"));
      res.status(400).send("Requested Parameter Not Sent");
      return;
    }

    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        throw new Error("Error occured while writing config file");
      }

      const todo = JSON.parse(data);
      if (!Object.hasOwn(todo, taskKey)) {
        // throw new Error("Key Provided is Invalid");
        console.log(chalk.red("Key Provided is Invalid\n"));
        res.status(400).send("Key Provided is Invalid");
        return;
      }

      delete todo[taskKey];

      fs.writeFile(filePath, JSON.stringify(todo, null, 2), (err) => {
        if (err) {
          throw new Error("Error Occurred Trying to Delete");
        }
        console.log(chalk.green("Task Delete Successfull\n"));
        res.status(200).send("Task Delete Successfull");
      });
    });
  } catch (error) {
    console.log(chalk.red(error));
    res.status(500).json({ err: error.message });
  }
});

app.listen("3000");
