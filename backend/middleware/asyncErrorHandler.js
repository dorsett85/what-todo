/**
 * Async Error Handler
 * Function wrapper to catch Express asynchronous errors
 */
const asyncErrorHandler = fn => (req, res, next) => (
  fn(req, res, next).catch((err) => {
    if (process.env.NODE_ENV !== 'development') { return next(err); }
    console.log(err);
    return res.status(500).json(err.stack);
  })
);

module.exports = asyncErrorHandler;
