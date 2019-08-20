const UserService = require('../services/User');

exports.initialLoad = (dependencies = {}) => async (req, res) => {
  const { User = UserService } = dependencies;
  const { jwtToken } = req.cookies;
  const user = await User.getVerified(jwtToken);
  if (!user) {
    res.clearCookie('jwtToken');
    return res.json({});
  }
  return res.json(user);
};
