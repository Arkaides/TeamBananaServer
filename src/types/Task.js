const { gql } = require("apollo-server");

module.exports = gql`
  type Task {
    id: ID!
    user: User!
    userId: ID!
    title: String!
    description: String!
  }

  input CreateTaskInput {
    userId: ID!
    title: String!
    description: String!
  }

  input UpdateTaskInput {
    userId: ID
    title: String
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
