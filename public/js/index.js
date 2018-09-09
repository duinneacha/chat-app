const socket = io();
const sendButton = document.getElementById('sendButton');
const messageForm = document.getElementById('messageForm');
const chatMessage = document.getElementById('chatMessage');
const messageList = document.getElementById("messages");

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
  const li = document.createElement('li');
  li.innerHTML = `${message.from}: ${message.text}`
  messageList.appendChild(li);


});


// socket.emit can take three arguements - message listener to server, message, callback
// socket.emit('createMessage', {
//   from: 'Aidan',
//   text: 'Hi'
// }, function (dataFromServer) {
//   console.log('received message', dataFromServer);
// });



messageForm.addEventListener('submit', e => {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: chatMessage.value
  }, function () {
    chatMessage.value = "";
  });

  console.log(chatMessage.value);
});

