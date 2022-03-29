const { gql } = require("apollo-server");

module.exports = gql`
  type Task {
    text: String
    createdBy: String
    checked: Boolean
    deadline: String
  }
  type User {
    username: String
    email: String
    password: String
    token: String
  }
  input TaskInput {
    text: String
    username: String
    checked: Boolean
    deadline: String
  }
  input RegisterInput {
    username: String
    email: String
    password: String
  }
  input LoginInput {
    email: String
    password: String
  }
  type Query {
    task(id: ID!): Task
    user(id: ID!): User
  }
  type Mutation {
    createTask(taskInput: TaskInput): Task!
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
  }
`;
