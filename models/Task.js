const { model, Schema } = require("mongoose");

const taskSchema = new Schema({
  text: String,
  createdBy: String,
  checked: Boolean,
  deadline: String,
});

module.exports = model("Task", taskSchema);
