let socket = io();

socket.on('connect', function() {
  console.log('Connected to the server.');

  socket.emit('createEmail', {
    to: 'luka@kljajevic.com',
    text: 'Hey this is Luka'
  });

  socket.emit('createMessage', {
    from: 'marco',
    text: 'Hey! Whats up man!'
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from the server.');
});

socket.on('newEmail', function(email) {
  console.log('New email!');
  console.log(email);
});

socket.on('newMessage', function(message) {
  console.log('New message!', message);
});