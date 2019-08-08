const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());

app.post('/api/login', async (req, res, next) => {
  const { username, password } = req.body;
  return res.json(`You tried to login as user ${username} with password ${password}`);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
