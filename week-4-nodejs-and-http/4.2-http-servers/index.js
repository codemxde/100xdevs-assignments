// # Assignment Statement
// * Express-ify the last week's todo assignment, and make the
// * todo application accessible and interactive through API calls

const fs = require("fs");
const filePath = "config.json";

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

const generateTaskKey = (todo) => {
  const taskKey = Object.keys(todo).length + 1;
  return "task_" + taskKey;
};

//  GET call to fetch all TODOs
app.get("/", function (req, res) {
  fs.readFile("config.json", "utf-8", (err, data) => {
    res.json(JSON.parse(data));
  });
});

//  POST call to add a TODO
app.post("/", function (req, res) {
  const task = req.query.task;
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error occured while reaading config file");
    }

    const todo = JSON.parse(data);
    addTask(task, todo);

    fs.writeFile(filePath, JSON.stringify(todo, null, 2), (err) => {
      if (err) {
        console.log("Error occurred while writing config file");
        res.status(500).json({
          msg: "Failed to write file on disc",
        });
      }

      res.status(200).json({
        msg: "Succesfully Added Todo",
      });
    });
  });
});

app.listen("3000");
