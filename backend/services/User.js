const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { jwtSecretKey } = require('../config/config');
const { offsetUTCTimeZone } = require('../utils/dateUtils');

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
    } finally {
      return sign;
    }
  }

  static async findOneJoinTodos(db, user) {
    if (user._id) {
      user._id = ObjectId(user._id);
    }
    const col = db.collection('users');

    const [userWithTodo] = await col
      .aggregate([
        { $match: user },
        {
          $lookup: {
            from: 'todos',
            localField: '_id',
            foreignField: 'user_id',
            as: 'todos'
          }
        }
      ])
      .toArray();

    return userWithTodo;
  }

  static async updateOne(db, user) {
    user._id = ObjectId(user._id);
    const { _id, ...rest } = user;
    const col = db.collection('users');
    return await col.updateOne({ _id }, { $set: rest });
  }
};
