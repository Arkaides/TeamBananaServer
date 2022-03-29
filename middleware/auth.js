const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.USER_SECRET);
        return user;
      } catch (error) {
        throw new Error("Invalid/Expired token");
      }
    }
    throw new Error("Auth token must be 'Bearer [token]'");
  }
  throw new Error("Auth header must be provided");
};
