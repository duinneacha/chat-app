var socket = io();

// Listen for an event on connect
socket.on('connect', function () {
  console.log('Connected to the server');


  // socket.emit('createMessage', {
  //   from: "Aidan",
  //   text: "Message successfully transmitted"
  // });

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);

});



