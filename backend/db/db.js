const MongoClient = require('mongodb').MongoClient;
const {
  db: { connectionString }
} = require('../config/config');
const client = new MongoClient(connectionString, {
  useNewUrlParser: true
});

// Define singleton db connection
let db;

exports.connectDb = async (database = 'todo') => {
  const connection = await client.connect();
  db = connection.db(database);
  return db;
};

exports.getDb = () => {
  if (!db) {
    throw new Error('Call connectDb first!');
  }
  return db;
};
