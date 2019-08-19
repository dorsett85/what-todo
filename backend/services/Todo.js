const TodoModel = require('../models/TodoModel');
const { offsetUTCTimeZone } = require('../utils/dateUtils');

const addTimezoneOffset = todo => {
  if (todo.due_date) {
    todo.due_date = offsetUTCTimeZone(new Date(todo.due_date), todo.utcTimezoneOffset);
  }
  return todo;
};

module.exports = class Todo {
  static async create(todo, TodoDb = TodoModel) {
    addTimezoneOffset(todo);
    const {
      ops: [newTodo]
    } = await TodoDb.createOne(todo);
    return newTodo;
  }

  static async update(todo, TodoDb = TodoModel) {
    addTimezoneOffset(todo);
    const { _id, ...rest } = todo;
    return TodoDb.updateOne({ _id }, rest);
  }

  static async delete(todo, TodoDb = TodoModel) {
    return await TodoDb.deleteOne(todo);
  }
};
