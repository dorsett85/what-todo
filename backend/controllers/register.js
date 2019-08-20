const UserService = require('../services/User');

exports.register = (dependencies = {}) => async (req, res) => {
  const { User = UserService } = dependencies;
  const { user, token, userExists } = await User.register(req.body);

  if (userExists) {
    return res.json({ userExists });
  }
  
  res.cookie('jwtToken', token);
  return res.json(user);
};
