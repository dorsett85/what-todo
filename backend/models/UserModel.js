const { ObjectId } = require('mongodb');
const { getDb } = require('../db/db');

const addObjectId = user => {
  if (user._id) {
    user._id = ObjectId(user._id);
  }
  return user;
};

module.exports = class UserModel {
  static async readAndJoinTodos(user, db = getDb()) {
    addObjectId(user);
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

  static async updateOne(user, update, db = getDb()) {
    addObjectId(user);
    const col = db.collection('users');
    return await col.updateOne(user, { $set: update });
  }
};
