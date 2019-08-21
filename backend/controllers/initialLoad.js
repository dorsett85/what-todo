const UserService = require('../services/User');

exports.initialLoad = (dependencies = {}) => async (req, res) => {
  const { User = UserService } = dependencies;
  const { jwtToken } = req.cookies;
  const user = await User.getVerified(jwtToken);

  // Clear the jwt if no user is returned
  if (!user._id) {
    res.clearCookie('jwtToken');
  }
  return res.json(user);
};
