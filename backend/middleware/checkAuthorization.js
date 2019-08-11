const UserService = require('../services/User');

const checkAuthorization = (dependencies = {}) => async (req, res, next) => {
  const { User = UserService } = dependencies;
  const { jwtToken } = req.cookies;
  if (!jwtToken) {
    return res.sendStatus(401);
  }
  try {
    const { _id } = await User.verify(jwtToken);
    req._id = _id;
    return next();
  } catch (err) {
    return res.sendStatusCode(401);
  }
};

module.exports = checkAuthorization;
