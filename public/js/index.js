let socket = io();

socket.on('connect', function() {
  console.log('Connected to the server.');

});

socket.on('disconnect', function() {
  console.log('Disconnected from the server.');
});

socket.on('newMessage', function(message) {
  console.log('New message!');
  console.log(message);
});