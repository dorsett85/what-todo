const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
const { connectDb } = require('./db/db');
const apiRoutes = require('./routes/api');

const port = 4000;
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api', apiRoutes);

// Serve static assets if not on the webpack dev server
app.use('/', express.static(path.resolve(__dirname, '../build')));
app.use('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

// Connect to the database before opening the app
connectDb().then(() => {
  app.listen(port, () => console.log(`App listening on port ${port}!`));
});
