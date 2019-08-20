const TodoModel = require('../models/TodoModel');

module.exports = class Todo {
  static async create(todo, TodoDb = TodoModel) {
    return await TodoDb.createOne(todo);
  }

  static async update(todo, TodoDb = TodoModel) {
    const { _id, ...rest } = todo;
    return TodoDb.updateOne({ _id }, rest);
  }

  static async delete(todo, TodoDb = TodoModel) {
    return await TodoDb.deleteOne(todo);
  }
};
