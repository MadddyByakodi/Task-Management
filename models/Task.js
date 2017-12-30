var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  TaskID: String,
  TaskName: String,
  CreatedBy: String,
  description: String,
  End_date: { type: Date, default: Date.now },
  Created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', TaskSchema);