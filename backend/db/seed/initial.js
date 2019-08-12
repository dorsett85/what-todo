const { connectDb } = require('../db');

connectDb()(async db => {
  // Drop collections
  try {
    await db.dropCollection('users');
    await db.dropCollection('todos');
  } catch (err) {
    // No-op, collections don't exist
  }

  try {
    const userCollection = db.collection('users');
    const todoCollection = db.collection('todos');

    // Add user
    let _id;
    const user = { username: 'clayton', password: 'hcs', last_login: new Date() };
    const {
      ops: [record]
    } = await userCollection.insertOne(user);
    _id = record._id;

    // Add todos
    const user_id = _id;
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
    await todoCollection.insertMany(todos);
    console.log('Success! Database seeded with test user and todos');
  } catch (err) {
    console.log(err);
  }

  process.exit();
});
