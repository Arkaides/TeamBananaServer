const User = require("../../models/User");
const { ApolloError } = require("apollo-server-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  Mutation: {
    async registerUser(_, { registerInput: { username, email, password } }) {
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        throw new ApolloError(
          "A user is already registered with the email " + email,
          "USER_ALREADY_EXISTS"
        );
      }

      const encryptedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      const token = jwt.sign(
        { user_id: newUser._id, email },
        process.env.USER_SECRET,
        {
          expiresIn: "2h",
        }
      );

      newUser.token = token;

      const res = await newUser.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
    async loginUser(_, { loginInput: { email, password } }) {
      const user = await User.findOne({ email });

      if (user) {
        if (await bcrypt.compare(password, user.password)) {
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.USER_SECRET,
            {
              expiresIn: "2h",
            }
          );
          user.token = token;
          await user.save();
          return {
            id: user.id,
            ...user._doc,
          };
        } else {
          throw new ApolloError("Incorrect password", "INCORRECT_PASSWORD");
        }
      } else {
        throw new ApolloError("not found user", "NOT_FOUND_USER");
      }
    },
  },
  Query: {
    user: async (_, { ID }) => User.findById(ID),
    easyCheckToken: async (_, { where }) => User.findOne(where),
  },
};
