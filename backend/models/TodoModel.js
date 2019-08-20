const { ObjectId } = require('mongodb');
const { getDb } = require('../db/db');

const addObjectId = todo => {
  if (todo._id && typeof todo._id === 'string') {
    todo._id = ObjectId(todo._id);
  }
  if (todo.user_id && typeof todo.user_id === 'string') {
    todo.user_id = ObjectId(todo.user_id);
  }
};

module.exports = class TodoModel {
  static async createOne(todo, db = getDb()) {
    addObjectId(todo);
    const col = db.collection('todos');
    const {
      ops: [newTodo]
    } = await col.insertOne({ ...todo, created: new Date() });
    return newTodo;
  }

  static async createMany(todos, db = getDb()) {
    for (let todo of todos) {
      addObjectId(todo);
    }
    const col = db.collection('todos');
    const {
      ops: newTodos
    } = await col.insertMany(todos);
    return newTodos;
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
