const jwt = require('jsonwebtoken');
const {
  config: { jwtSecretKey }
} = require('../config/config');

const login = (dependencies = {}) => async (req, res) => {
  const { jwToken = jwt } = dependencies;
  const { db } = req;
  const { username, password } = req.body;

  // Check if there's a user
  const col = db.collection('users');
  const user = await col.findOne({ username });

  // Invalid username
  if (!user) {
    return res.json();
  }

  // Invalid password
  if (password !== user.password) {
    return res.json({ username });
  }

  // Valid username and password, update last login and get the jwt token for future authorization
  await col.updateOne({ _id: user._id }, { $set: { last_login: new Date() } });
  const token = jwToken.sign({ id: user._id, username }, jwtSecretKey);
  res.cookie('jwtToken', token);
  return res.json(user);
};

module.exports = login;
