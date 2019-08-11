const UserService = require('../services/User');

const initialLoad = (dependencies = {}) => async (req, res) => {
  const { User = UserService } = dependencies;
  const { db } = req;
  const { jwtToken } = req.cookies;

  // Keep user object empty unless the jwt token is verified
  let user = {};
  if (!jwtToken) {
    return res.json(user);
  }

  // Verify user
  const { _id } = await User.verify(jwtToken);
  if (!_id) {
    return res.json(user);
  }

  // Token is verified, send back associated user info from the database
  user = await User.findOneJoinTodos(db, { _id });
  return res.json(user);
};

module.exports = initialLoad;
