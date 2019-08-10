const router = require('express').Router();
const loginController = require('../controllers/login');
const logoutController = require('../controllers/login');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');

router.post('/login', asyncErrorHandler(loginController()));
router.post('/logout', asyncErrorHandler(logoutController));

module.exports = router;
