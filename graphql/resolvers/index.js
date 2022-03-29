const tasksResolvers = require("./Tasks");
const usersResolvers = require("./Users");

module.exports = {
  Query: {
    ...tasksResolvers.Query,
    ...usersResolvers.Query,
  },
  Mutation: {
    ...tasksResolvers.Mutation,
    ...usersResolvers.Mutation,
  },
};
