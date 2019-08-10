const MongoClient = require('mongodb').MongoClient;
const {
  config: {
    db: { connectionString }
  }
} = require('../config/config');
const client = new MongoClient(connectionString, {
  useNewUrlParser: true
});

exports.connectDb = (database = 'todo') => async callback => {
  const connection = await client.connect();
  return callback(connection.db(database));
};

exports.addDbToReq = (req, res, next) => {
  req.db = req.app.locals.db;
  return next();
}
