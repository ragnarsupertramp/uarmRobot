var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
//var SerialPort = require("serialport").SerialPort
/*var SerialPort = new SerialPort("COM3", {
  baudrate: 9600
});*/

//header to public folder
app.use('/', express.static(__dirname + '/public'));

//socket info
io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
	console.log('user disconnected');
	});

	//filteren op socket events

	//save timer state
	socket.on('timerState', function(state){
		saveToLocal("timerState", state);
	});
	//save countdowntime
	socket.on('countDownTime', function(state){
		saveToLocal("countDownTime", state);
	});
	//save klok state
	socket.on('clockState', function(state){
		saveToLocal("clockState", state);
	});
});

//save tool voor het opslaan van de socket data.
function saveToLocal(state, setData){
	localStorage.setItem(state, setData);
}

//start server on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
  console.log('Wating for user to connect');
});