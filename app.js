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
		console.log("bit");
		setup();
	});
	//save countdowntime
	socket.on('countDownTime', function(state){
		saveToLocal("countDownTime", state);
	});
	//save klok state
	socket.on('clockState', function(state){
		saveToLocal("clockState", state);
		console.log("bit");
		setup();
	});
	//save input van de robot arm
	socket.on('browserText', function(state){
		saveToLocal("browserText", state);
	});
});

//de tijd van nu in twee variable.
var hour = "";
var min = "";
function currenttime(){
	//voer deze funtie 1 keer uit om te zorgen dat de tijd word gezet
	var currentdate = new Date();
	hour = currentdate.getHours();
	min = currentdate.getMinutes();
}

//exe and looping time
function setup(){
	timerStateVar = localStorage.getItem('timerState');
	console.log(timerStateVar);
	if(timerStateVar == "true"){
		var countDownLoopTimer = setInterval(function(){
			//dataprinter aan roepen
		}, 5000);
		var checkLoopTimer = setInterval(function(){
			//false betekend stoppen met/UIT geen LOOP
			//compere functie
			compere();
		}, 250);
	}			
	//stop de loops als de button naar false in gezet
	if(timerStateVar == "false"){
		clearInterval(countDownLoopTimer);
		clearInterval(checkLoop);
	}

	if(localStorage.getItem('clockState') == "true"){
		var countDownLoopClock = setInterval(function(){
			console.log("i'am a clock");
		}, 5000);
		var checkLoopClock = setInterval(function(){
			//false betekend stopen met/UIT geen LOOP
			if(localStorage.getItem('clockState') == "false"){
				clearInterval(countDownLoopClock);
				clearInterval(checkLoopClock);
			}
		}, 250);
	}
}

//reset en set localstorge
var initDone = false;
function reset_init(){
	initDone = true;
	localStorage.setItem("timerState", "");
	localStorage.setItem("countDownTime", "");
	localStorage.setItem("clockState", "");
	localStorage.setItem("browserText", "");
}
//aftellen naar 0 voor countdowntimer
var newtime = true;
var time = localStorage.getItem('countDownTime');
function clockCountdown(){
	if(newtime == true){
		//gen and save new time
		if(time >= 5){
			time = time -5;
		}
		var returntime = timeConverter(time)
		localStorage.setItem("clockTimeSave" , returntime);
		newtime = false;
		return returntime;
	}
	if(newtime == false){
		//return old time
		return localStorage.getItem("clockTimeSave");
	}
}	

//compere the time from the server white the text form the browser
function compere(){
	//compere time from node to the typed text
	var time1 = localStorage.getItem("clockTimeSave");
	var time2 = localStorage.getItem("browserText");

	console.log(time1 + " | " + time2);

	if(time1.length == time2.length){
		console.log("length is the same");
		if(time1 == time2){
			console.log("same");
			//gen and print new time
			newtime = true;
			backspace = true;
		}else if(time1 !== time2){
			//nog een keer u
			console.log("reloop");
			newtime = false;
			backspace = true;
		}
	}else{
		newtime = false;
	}
}

//printer naar serial COM
function printerToSerial(timePrinter){
	//printing out sended array to the serial port
	var printTime = timePrinter;
	console.log("printnewtime: "+printTime);
	//convert time to array for looping
	var splitTime = printTime.split("");
	//send loop to serial port
	for (i = 0; i < splitTime.length; i++) {
		//wirte to serialPort
	  	//serialPort.write(splitTime[i]);
	}	
}

//stuur een backspace voor het weer leeg maken van het scherm
function writebackspace(){
	if(backspace == true){
		//serialPort.write("b");
	}
}

//convert sec time to normal time
function timeConverter(sec) {
	//convert sec to Hour:min:sec
	var hr = Math.floor(sec / 3600);
	var min = Math.floor((sec - (hr * 3600))/60);
	sec -= ((hr * 3600) + (min * 60));
	sec += ''; min += '';
	while (min.length < 2) {min = '0' + min;}
	while (sec.length < 2) {sec = '0' + sec;}
	hr = (hr)?':'+hr:'';
	return hr + min + ':' + sec;
}

//save tool voor het opslaan van de socket data.
function saveToLocal(state, setData){
	localStorage.setItem(state, setData);
}

//start server on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
  console.log('Wating for user to connect');
});