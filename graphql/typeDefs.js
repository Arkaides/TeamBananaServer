const { gql } = require("apollo-server");

module.exports = gql`
  type Task {
    _id: ID!
    text: String
    createdBy: String
    checked: Boolean
    deadline: String
  }
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    token: String
  }
  input TaskInput {
    text: String
    createdBy: String
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
  input TaskWhereInput {
    createdBy: String
  }
  input TokenWhereInput {
    token: String
  }
  type Query {
    task(id: ID!): Task
    findManyTask(where: TaskWhereInput): [Task!]
    user(id: ID!): User
    easyCheckToken(where: TokenWhereInput): User
  }
  type Mutation {
    createTask(taskInput: TaskInput): Task!
    updateTask(id: ID!, taskInput: TaskInput): Task!
    removeTask(id: ID!): Task!
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
  }
`;
