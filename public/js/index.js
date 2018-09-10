const socket = io();
const sendButton = document.getElementById('sendButton');
const messageForm = document.getElementById('messageForm');
const chatMessage = document.getElementById('chatMessage');
const messageList = document.getElementById("messages");
const locationButton = document.getElementById('sendLocation')

// const mmm = Mustache.render("sdsdsd");

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

socket.on('newMessage', message => {

  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = document.getElementById('message-template').innerHTML;
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  const li = document.createElement('li');
  li.innerHTML = html;

  messageList.appendChild(li);
});

socket.on('newLocationMessage', message => {

  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = document.getElementById('location-message-template').innerHTML;
  const html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  const li = document.createElement('li');
  li.innerHTML = html;
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

    // The server responded here, chear the message box of text
    chatMessage.value = '';
  });

  console.log(chatMessage.value);
});

locationButton.addEventListener('click', e => {
  if (!navigator.geolocation) {
    return alert('GeoLocation not supported by your browser');
  }

  locationButton.disabled = true;
  locationButton.innerText = 'Locating . . . . .';

  navigator.geolocation.getCurrentPosition(position => {
    locationButton.disabled = false;
    locationButton.innerText = 'Send Location';
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    alert('Unable to fetch location');
    locationButton.disabled = false;
    locationButton.innerText = 'Send Location';
  });
});
