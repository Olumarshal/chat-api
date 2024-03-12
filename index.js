const dotenv = require('dotenv');
const { connect } = require('./src/utils/db');
const { app } = require('./app');
const http = require('http');

dotenv.config();

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const start = async () => {
  try {
    await connect();

    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();

module.exports = { io };
