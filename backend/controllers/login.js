const UserService = require('../services/User');

const login = (dependencies = {}) => async (req, res) => {
  const { User = UserService } = dependencies;
  const { db } = req;
  const { username, password } = req.body;

  // Check if there's a user
  const user = await User.findOneJoinTodos(db, { username });

  // Invalid username
  if (!user) {
    return res.json({});
  }

  // Invalid password
  if (password !== user.password) {
    return res.json({ username });
  }

  // Valid username and password, update last login and get the jwt token for future authorization
  const { _id } = user;
  await User.updateOne(db, { _id, last_login: new Date() });
  const token = User.sign({ _id, username });
  res.cookie('jwtToken', token);
  return res.json(user);
};

module.exports = login;
