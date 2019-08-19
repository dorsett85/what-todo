const UserService = require('../services/User');

exports.login = (dependencies = {}) => async (req, res) => {
  const { User = UserService } = dependencies;
  const { user, token } = await User.login(req.body);
  
  res.cookie('jwtToken', token);
  return res.json(user);
};
