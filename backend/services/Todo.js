const { ObjectId } = require('mongodb');
const { offsetUTCTimeZone } = require('../utils/dateUtils');

module.exports = class Todo {
  static async insertOne(db, todo) {
    if (todo.due_date) {
      todo.due_date = offsetUTCTimeZone(new Date(todo.due_date));
    }
    todo.user_id = ObjectId(todo.user_id);

    const col = db.collection('todos');
    return await col.insertOne(todo);
  }

  static async findOneAndUpdate(db, todo) {
    if (todo.due_date) {
      todo.due_date = offsetUTCTimeZone(new Date(todo.due_date));
    }
    if (todo.user_id) {
      todo.user_id = ObjectId(todo.user_id);
    }
    todo._id = ObjectId(todo._id);
    const { _id, ...rest } = todo;

    const col = db.collection('todos');
    return await col.findOneAndUpdate({ _id }, { $set: rest }, { returnOriginal: false });
  }

  static async deleteOne(db, todo) {
    if (todo.user_id) {
      todo.user_id = ObjectId(todo.user_id);
    }
    todo._id = ObjectId(todo._id);

    const col = db.collection('todos');
    return await col.deleteOne(todo);
  }
};
