const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwtSecretKey } = require('../config/config');
const UserModel = require('../models/UserModel');

module.exports = class User {
  static sign(user) {
    return jwt.sign(user, jwtSecretKey);
  }

  static async verify(jwtToken) {
    let sign = {};
    try {
      sign = await jwt.verify(jwtToken, jwtSecretKey);
    } catch (err) {
      console.log(err);
    }
    return sign;
  }

  static async getVerified(jwtToken) {
    let user = {};
    if (!jwtToken) {
      return user;
    }

    // Verify user
    const { _id } = await User.verify(jwtToken);
    if (!_id) {
      return user;
    }

    // Token is verified, send back associated user info from the database
    return await User.readAndJoinTodos({ _id });
  }

  static async register(user) {
    const { username } = user;

    // Check if user exists
    const userExists = await User.read({ username });

    if (userExists) {
      return { userExists: true };
    }

    // Create new user and add todo property with empty array
    user = await User.create(user);
    user.todos = [];
    const { _id } = user;

    // Get the jwt token for future authorization
    const token = User.sign({ _id, username });
    return { user, token };
  }

  static async login(user) {
    const { username, password } = user;

    // Check if there's a user
    user = await User.readAndJoinTodos({ username });

    // Invalid username
    if (!user) {
      return {};
    }

    // Invalid password
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return { username };
    }

    // Valid username and password, update last login and get the jwt token for future authorization
    const { _id } = user;
    await User.updateById({ _id, last_login: new Date() });
    const token = User.sign({ _id, username });
    return { user, token };
  }

  static async create(user, UserDb = UserModel) {
    return await UserDb.createOne(user);
  }

  static async read(user, UserDb = UserModel) {
    return await UserDb.readOne(user);
  }

  static async readAndJoinTodos(user, UserDb = UserModel) {
    return await UserDb.readOneAndJoinTodos(user);
  }

  static async updateById(user, UserDb = UserModel) {
    const { _id, ...rest } = user;
    return await UserDb.updateOne({ _id }, rest);
  }
};
