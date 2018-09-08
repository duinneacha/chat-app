const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, './../public');
const express = require('express');
const socketIO = require('socket.io');


const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);


// Create the websockets server
var io = socketIO(server);

// Let node know the static folder
app.use(express.static(publicPath));


// Listen for a connection
io.on('connection', (socket) => {
  console.log('New user connected')

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = { app };
