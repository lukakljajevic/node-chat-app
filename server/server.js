const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '..' + '/public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

const {generateMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected!');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('disconnect', () => {
    console.log('Client disconnected!');
  });

  socket.on('createMessage', message => {
    console.log('newMessage:', message);
    io.emit('newMessage', generateMessage(message.from, message.text));

    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  

  
});


 
server.listen(port, () => console.log(`Server is up on port ${port}.`));