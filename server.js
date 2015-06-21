var express = require('express')
var app = express();
var http = require('http').Server(app);
io = require('socket.io')(http);

var KaliberBot = require('./components/kaliberBot');
var kaliberBot = new KaliberBot();

var SerialPort = require("serialport").SerialPort;
serialPort = new SerialPort("/dev/ttyUSB0", {
  baudrate: 9600
});

kaliberBot.init({
  time: 30
});

app.use('/', express.static(__dirname + '/public'));

http.listen(8000, function(){
  console.log('listening on *:8000');
});

io.on('connection', function(socket) {
  console.log((new Date()) + ' - Browser connected');

  socket.on('startTimer', function() {
    kaliberBot.start();
  });

  socket.on('stopTimer',function(){
    kaliberBot.stop();
  });

  socket.on('disconnect', function() {
    console.log((new Date()) +  ' - Browser disconnected');
    kaliberBot.stop();
  });
});