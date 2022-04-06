const Task = require("../../models/Task");

module.exports = {
  Mutation: {
    async createTask(_, { taskInput: { text, email } }) {
      const newTask = new Task({
        text: text,
        createdBy: email,
        deadline: new Date().toISOString(),
        checked: false,
      });

      const res = await newTask.save();
      console.log(res);
      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
  Query: {
    task: async (_, { ID }) => Task.findOne(ID),
    findManyTask: async (_, { where }) => Task.find(where),
  },
};
