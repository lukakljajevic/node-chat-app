const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '..' + '/public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected!');

  socket.on('disconnect', () => {
    console.log('Client disconnected!');
  });

  socket.on('createMessage', newMessage => {
    newMessage.createdAt = 1232132131;
    console.log('newMessage:', newMessage);
  });

  socket.emit('newMessage', {
    from: 'luka',
    text: 'Hey! Whats up!',
    createdAt: 123455
  });

  
});


 
server.listen(port, () => console.log(`Server is up on port ${port}.`));