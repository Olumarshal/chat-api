const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import other routers here
const authRouter = require('./src/routes/auth');
const chatRouter = require('./src/routes/chat');

const app = express();

app.use(cors({ origin: 'https://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', true);

// Home Route
app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to the Chat API home route!',
  });
});

// Use other routers
app.use('/api/v1/users', authRouter);
app.use('/api/v1/users', chatRouter);

app.all('*', async (req, res) => {
  res.send({
    message: 'route not found',
  });
});

module.exports = { app };
