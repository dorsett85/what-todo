const TodoService = require('../services/Todo');

exports.insertTodo = (dependencies = {}) => async (req, res) => {
  const { Todo = TodoService } = dependencies;
  const { db, _id: user_id } = req;

  const {
    ops: [newTodo]
  } = await Todo.insertOne(db, { user_id, ...req.body });
  return res.json(newTodo);
};

exports.updateTodo = (dependencies = {}) => async (req, res) => {
  const { Todo = TodoService } = dependencies;
  const { db, _id: user_id } = req;
  const { value } = await Todo.findOneAndUpdate(db, { user_id, ...req.body });
  return res.json(value);
};

exports.deleteTodo = (dependencies = {}) => async (req, res) => {
  const { Todo = TodoService } = dependencies;
  const { db } = req;
  const { _id } = req.body;
  await Todo.deleteOne(db, { _id });
  return res.json(_id);
};
