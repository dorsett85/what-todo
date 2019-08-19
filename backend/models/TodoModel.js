const { ObjectId } = require('mongodb');
const { getDb } = require('../db/db');

const addObjectId = todo => {
  if (todo._id) {
    todo._id = ObjectId(todo._id);
  }
  if (todo.user_id) {
    todo.user_id = ObjectId(todo.user_id);
  }
};

module.exports = class TodoModel {
  static async createOne(todo, db = getDb()) {
    addObjectId(todo);
    const col = db.collection('todos');
    return await col.insertOne(todo);
  }

  static async updateOne(todo, update, db = getDb()) {
    addObjectId(todo);
    addObjectId(update);
    const col = db.collection('todos');
    return await col.findOneAndUpdate(todo, { $set: update }, { returnOriginal: false });
  }

  static async deleteOne(todo, db = getDb()) {
    addObjectId(todo);
    const col = db.collection('todos');
    return await col.deleteOne(todo);
  }
};
