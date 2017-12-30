var express = require('express');
var router = express.Router();
var task = require("../controllers/TaskController.js");

// Get all tasks
router.get('/', function(req, res) {
  task.list(req, res);
});

// Get single task by id
router.get('/show/:id', function(req, res) {
  task.show(req, res);
});

// Create task
router.get('/create', function(req, res) {
  task.create(req, res);
});

// Save task
router.post('/save', function(req, res) {
  task.save(req, res);
});

// Edit task
router.get('/edit/:id', function(req, res) {
  task.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  task.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  task.delete(req, res);
});

router.get('/autocomplte', function(req, res) {
	task.autocomplete(req, res)
});

module.exports = router;
