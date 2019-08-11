const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
const apiRoutes = require('./routes/api');
const { connectDb, addDbToReq } = require('./db/db');

const port = 4000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(addDbToReq);

app.use('/api', apiRoutes);

// Serve static assets if not on the webpack dev server
app.use('/', express.static(path.resolve(__dirname, '../build')));
app.use('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

// Initialize db connection after the app starts
connectDb()(db => {
  app.locals.db = db;
  app.listen(port, () => console.log(`App listening on port ${port}!`));
});
