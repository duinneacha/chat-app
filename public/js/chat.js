const socket = io();
const sendButton = document.getElementById('sendButton');
const messageForm = document.getElementById('messageForm');
const chatMessage = document.getElementById('chatMessage');
const messageList = document.getElementById("messages");
const locationButton = document.getElementById('sendLocation')

// Listen for an event on connect
socket.on('connect', function () {
  let qd = {};
  if (window.location.search) {
    window.location.search.substr(1).split`&`.forEach(item => { let [k, v] = item.split`=`; v = v && decodeURIComponent(v); (qd[k] = qd[k] || []).push(v) })
  }

  const params = {
    name: qd['name'][0],
    room: qd['room'][0]
  }

  socket.emit('join', params, (err) => {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {

    }
  })


  //console.log('Connected to the server');
});

socket.on('disconnect', function () {
  //console.log('Disconnected from server');
});

// Listen for updated user list
socket.on('updateUserList', userArray => {

  const usersDiv = document.getElementById('users');
  usersDiv.innerHTML = "";

  var olList = document.createElement('ol');
  userArray.forEach((user) => {
    let newLI = document.createElement('li');
    newLI.innerHTML = user;
    olList.appendChild(newLI)
  })
  usersDiv.appendChild(olList);

})

const scrollToBottom = () => {
  // Selectors
  const lastMessage = messageList.lastChild;

  // Heights
  const mClientHeight = messageList.clientHeight;
  const mScrollTop = messageList.scrollTop;
  const mScrollHeight = messageList.scrollHeight;
  const lastMessageHeight = lastMessage.clientHeight;
  const secondLastMessageHeight = (lastMessage.previousSibling === null) ? 0 : lastMessage.previousSibling.clientHeight;

  // Check to see if the recently entered chat messages will dissapear off the screen - if so move the bottom visually
  if (mClientHeight + mScrollTop + lastMessageHeight + secondLastMessageHeight >= mScrollHeight) {

    // Scroll (keep) to the bottom of the message list if close to the end
    messages.scrollTo(0, mScrollHeight);
  }
};



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
      // from: chatMessage.name,
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
