const UserService = require('../services/User');

exports.login = (dependencies = {}) => async (req, res) => {
  const { User = UserService } = dependencies;
  const { user, token } = await User.login(req.body);

  // If token exists, the user was successfully logged in
  if (token) {
    res.cookie('jwtToken', token);
  }
  return res.json(user);
};
