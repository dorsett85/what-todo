const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config/config');
const UserModel = require('../models/UserModel');

module.exports = class User {
  static sign(user) {
    return jwt.sign(user, jwtSecretKey);
  }

  static async verify(jwtToken) {
    let sign;
    try {
      sign = await jwt.verify(jwtToken, jwtSecretKey);
    } catch (err) {
      console.log(err);
    }
    return sign;
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
    if (password !== user.password) {
      return { username };
    }

    // Valid username and password, update last login and get the jwt token for future authorization
    const { _id } = user;
    await User.updateById({ _id, last_login: new Date() });
    const token = User.sign({ _id, username });
    return { user, token };
  }

  static async readAndJoinTodos(user, UserDb = UserModel) {
    return await UserDb.readAndJoinTodos(user);
  }

  static async updateById(user, UserDb = UserModel) {
    const { _id, ...rest } = user;
    return await UserDb.updateOne({ _id }, rest);
  }
};
