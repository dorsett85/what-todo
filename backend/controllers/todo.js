const TodoService = require('../services/Todo');

exports.createTodo = (dependencies = {}) => async (req, res) => {
  const { Todo = TodoService } = dependencies;
  const { _id: user_id } = req;
  const todo = await Todo.create({ user_id, ...req.body });
  return res.json(todo);
};

exports.updateTodo = (dependencies = {}) => async (req, res) => {
  const { Todo = TodoService } = dependencies;
  const { _id: user_id } = req;
  const { value } = await Todo.update({ user_id, ...req.body });
  return res.json(value);
};

exports.deleteTodo = (dependencies = {}) => async (req, res) => {
  const { Todo = TodoService } = dependencies;
  const { _id } = req.body;
  await Todo.delete({ _id });
  return res.json(_id);
};
