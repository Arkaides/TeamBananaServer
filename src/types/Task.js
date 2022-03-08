const { gql } = require("apollo-server");

module.exports = gql`
type Task {
  id: ID!
  mail: String!
  description: String!
}

input CreateTaskInput {
  mail: String!
  description: String!
}

input UpdateTaskInput {
  mail: String
  description: String
}

input DeleteTaskInput {
  id: ID!
}

type DeletePayload {
  id: ID!
}

type Query {
  tasks: [Task]
}

type Mutation {
  createTask(input: CreateTaskInput!): Task!
  updateTask(id: ID!, input: UpdateTaskInput!): Task!
  deleteTask(id: ID!): DeletePayload!
}

`;
