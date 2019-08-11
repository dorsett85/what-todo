const router = require('express').Router();
const initialLoad = require('../controllers/initialLoad');
const login = require('../controllers/login');
const logout = require('../controllers/logout');
const { insertTodo, updateTodo, deleteTodo } = require('../controllers/todo');
const checkAuthorization = require('../middleware/checkAuthorization');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');

router.get('/initialLoad', asyncErrorHandler(initialLoad()))
router.post('/login', asyncErrorHandler(login()));
router.post('/logout', asyncErrorHandler(logout));

// Protected routes
router.use('/todo', checkAuthorization());
router.post('/todo', asyncErrorHandler(insertTodo()));
router.put('/todo', asyncErrorHandler(updateTodo()));
router.delete('/todo', asyncErrorHandler(deleteTodo()));


module.exports = router;
