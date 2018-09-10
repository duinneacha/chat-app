const socket = io();
const sendButton = document.getElementById('sendButton');
const messageForm = document.getElementById('messageForm');
const chatMessage = document.getElementById('chatMessage');
const messageList = document.getElementById("messages");
const locationButton = document.getElementById('sendLocation')


const scrollToBottom = () => {

  // Selectors
  let newMessage

  // Heights
  const mClientHeight = messageList.clientHeight;
  const mScrollTop = messageList.scrollTop;
  const mScrollHeight = messageList.scrollHeight;
  const lastMessage = messageList.lastChild;
  const lastMessageHeight = lastMessage.clientHeight;
  const secondLastMessageHeight = (lastMessage.previousSibling === null) ? 0 : lastMessage.previousSibling.clientHeight;

  if (mClientHeight + mScrollTop + lastMessageHeight + secondLastMessageHeight >= mScrollHeight) {
    // console.log('clientHeight', mClientHeight);
    // console.log('scrollTop', mScrollTop);
    // console.log('scrollHeight', mScrollHeight);
    // console.log('secondlastMessageHeight', secondLastMessageHeight);
    // console.log('lastMessageHeight', lastMessageHeight);

    console.log('Should Scroll');

    messages.scrollTo(0, mScrollHeight);
  }
};

// Listen for an event on connect
socket.on('connect', function () {
  console.log('Connected to the server');
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
  scrollToBottom();
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
  scrollToBottom();
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

  if (chatMessage.value !== '') {
    socket.emit('createMessage', {
      from: 'User',
      text: chatMessage.value
    }, function () {

      // The server responded here, chear the message box of text
      chatMessage.value = '';
    });

  }

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
