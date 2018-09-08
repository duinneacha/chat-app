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


  // Emit a message to a single client
  // socket.emit('newMessage', {
  //   from: 'localHost',
  //   text: 'Message from the middle',
  //   createdAt: 324324
  // })

  // Send a message to the client that has just requested - using socket.emit
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat room',
    createdAt: new Date().getTime()
  });

  // Send a message to all clients connected (other than the connecting client) - using socket.broadcast.emit
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'A new user has joined the chat room',
    createdAt: new Date().getTime()
  })

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
    socket.broadcast.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
}); //io.on connection


server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = { app };
