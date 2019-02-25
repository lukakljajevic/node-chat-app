let socket = io();

socket.on('connect', function() {
  console.log('Connected to the server.');

});

socket.on('disconnect', function() {
  console.log('Disconnected from the server.');
});

socket.on('newMessage', function(message) {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = $('#message-template').html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  $('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = $('#location-message-template').html();
  let html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  });
  $('#messages').append(html);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  let messageTextbox = $('input[name="message"]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function() {
    messageTextbox.val('');
  });
});

let locationButton = $('#send-location');
locationButton.click(function() {
  if (!navigator.geolocation) {
    return alert('Geolocation is not available.');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  setTimeout(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      locationButton.removeAttr('disabled').text('Send location');
    }, function() {
      alert('Unable to fetch location');
      locationButton.removeAttr('disabled').text('Send location');
    });
  }, 1500);
  
  

});