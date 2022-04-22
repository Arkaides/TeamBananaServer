const Task = require("../../models/Task");

module.exports = {
  Mutation: {
    async createTask(_, { taskInput: { text, createdBy, deadline, checked } }) {
      const newTask = new Task({
        text: text,
        createdBy: createdBy,
        checked: checked,
        deadline: deadline,
      });

      const res = await newTask.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
    async updateTask(_, { id, taskInput }) {
      return await Task.findByIdAndUpdate(id, taskInput);
    },
    async removeTask(_, { id }) {
      return await Task.findByIdAndDelete(id);
    },
  },
  Query: {
    task: async (_, { ID }) => Task.findOne(ID),
    findManyTask: async (_, { where }) => Task.find(where),
  },
};
