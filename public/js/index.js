let socket = io();

socket.on('connect', function() {
  console.log('Connected to the server.');

});

socket.on('disconnect', function() {
  console.log('Disconnected from the server.');
});

socket.on('newMessage', function(message) {
  let li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  let li = $('<li></li>');
  let a = $('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $('input[name="message"]').val()
  }, function() {

  });
});

let locationButton = $('#send-location');
locationButton.click(function() {
  if (!navigator.geolocation) {
    return alert('Geolocation is not available.');
  } 
  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    alert('Unable to fetch location');
  })
  

});