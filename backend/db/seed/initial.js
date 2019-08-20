const { connectDb } = require('../db');
const UserModel = require('../../models/UserModel');
const TodoModel = require('../../models/TodoModel');

connectDb().then(async db => {
  // Drop collections
  try {
    await db.dropCollection('users');
    await db.dropCollection('todos');
  } catch (err) {
    // No-op, collections don't exist
  }

  try {
    // Add user
    const user = await UserModel.createOne({
      username: 'clayton',
      password: 'clayton',
      last_login: new Date()
    });
    const { _id: user_id } = user;

    // Add todos
    const due_date = new Date();
    due_date.setDate(due_date.getDate() + 1);
    const todos = [
      {
        user_id,
        name: 'Pickup laundry',
        due_date,
        completed: false
      },
      {
        user_id,
        name: 'Take out trash',
        due_date,
        completed: false
      },
      {
        user_id,
        name: 'Finish todo app',
        due_date,
        completed: true
      }
    ];
    await TodoModel.createMany(todos);
    console.log('Success! Database seeded with test user and todos');
  } catch (err) {
    console.log(err);
  }
  process.exit();
});
