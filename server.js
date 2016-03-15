var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

var httpServer = http.createServer(app).listen(3000, function (req, res) {
	console.log('Server Running http://localhost:3000');
});

var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', function(socket) {
  console.log('connection user ...');
  socket.on('message', function(data) {
    console.log('message recive and send');
    console.log(data);
    io.sockets.emit('message', data);
  });
});
