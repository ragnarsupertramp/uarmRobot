var express = require('express')
var app = express();
var http = require('http').Server(app);
io = require('socket.io')(http);
config = require('./config');

var KaliberBot = require('./components/kaliberBot');
var kaliberBot = new KaliberBot();

var SerialPort = require("serialport").SerialPort;
serialPort = new SerialPort(config.serial.connection, {
  baudrate: config.serial.baudrate
});

kaliberBot.init({
  time: config.countdown.defaultTime
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

  socket.on('stopTimer', function() {
    kaliberBot.stop();
  });

  socket.on('resetTimer', function() {
    kaliberBot.reset();
  });

  socket.on('updateTimer', function( time ) {
    kaliberBot.updateTime(time);
  });

  socket.on('getCountdownTime', function() {
    socket.emit('countdownTime', kaliberBot.getTime());
  });

  socket.on('getCountdownTimeInMinutes', function() {
    socket.emit('countdownTimeInMinutes', kaliberBot.getTimeInMinutes);
  });

  socket.on('disconnect', function() {
    console.log((new Date()) +  ' - Browser disconnected');
  });
});
