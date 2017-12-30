var mongoose = require("mongoose");
var Task = require("../models/Task");

var taskController = {};

// Show list of tasks
taskController.list = function(req, res) {
  Task.find({}).exec(function (err, tasks) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/tasks/index", {tasks: tasks});
    }
  });
};

// Show task by id
taskController.show = function(req, res) {
  Task.findOne({_id: req.params.id}).exec(function (err, task) {
    if (err) {
      console.log("Error:", err);
    }
    else {

      res.render("../views/tasks/show", {task: task});
    }
  });
};

// Create new task
taskController.create = function(req, res) {
  res.render("../views/tasks/create");
};

// Save new task
taskController.save = function(req, res) {
  var task = new Task(req.body);

  task.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/tasks/create");
    } else {
      console.log("Successfully created an task.");
      res.redirect("/task/show/"+task._id);
    }
  });
};

// Edit an task
taskController.edit = function(req, res) {
  Task.findOne({_id: req.params.id}).exec(function (err, task) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/tasks/edit", {task: task});
    }
  });
};

// Update an task
taskController.update = function(req, res) {
  Task.findByIdAndUpdate(req.params.id, { $set: { TaskID: req.body.TaskID, TaskName: req.body.TaskName, CreatedBy: req.body.CreatedBy, description: req.body.description, End_date: req.body.End_date, Created_date: req.body.Created_date }}, { new: true }, function (err, task) {
    if (err) {
      console.log(err);
      res.render("../views/tasks/edit", {task: req.body});
    }
    res.redirect("/task/show/"+task._id);
  });
};

// Delete an task
taskController.delete = function(req, res) {
  Task.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Task deleted!");
      res.redirect("/tasks");
    }
  });
};

function buildResultSet(docs) {
    var result = [];
    for(var object in docs){
      result.push(docs[object]);
    }
    return result;
   }
//autocomplete
taskController.autocomplete = function(req, res) {
   var regex = new RegExp(req.query["term"], 'i');
   var query = Task.find({"$or": [{"TaskName": regex}, {"description": regex}]}, { 'TaskName': 1 }).limit(20);
         
      // Execute query in a callback and return users list
  query.exec(function(err, task) {
      if (!err) {
         // Method to construct the json result set
         var result = buildResultSet(task); 
         console.log(result);
         res.send(result, {
            'Content-Type': 'application/json'
         }, 200);
      } else {
         res.send(JSON.stringify(err), {
            'Content-Type': 'application/json'
         }, 404);
      }
   });
}
 

module.exports = taskController;
