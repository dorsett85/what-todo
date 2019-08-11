const express = require('express');
var cookieParser = require('cookie-parser')
const apiRoutes = require('./routes/api');
const { connectDb, addDbToReq } = require('./db/db');

const port = 4000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(addDbToReq);

app.use('/api', apiRoutes);

app.post('/api/login', async (req, res, next) => {
  const { username, password } = req.body;
  return res.json(`You tried to login as user ${username} with password ${password}`);
});

// Initialize db connection after the app starts
connectDb()(db => {
  app.locals.db = db;
  app.listen(port, () => console.log(`App listening on port ${port}!`));
})
