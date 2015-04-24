var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
//var SerialPort = require("serialport").SerialPort
//var serialPort = new SerialPort("/dev/ttyUSB0", {
//  baudrate: 9600
//});

app.use('/', express.static(__dirname + '/public'));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('timerState', function(){
  	stoploop = false;
  	console.log("startingUarm");
  	clearlocalstorge();
  	start();
  });
  socket.on('time', function(msg){
  	getbrowserinput(msg);
  });
  socket.on('timeRest', function(){
  	restloop();
  });
  socket.on('clock',function(){
  	startClock();
  	console.log("clock");
  });
  socket.on('clockReset',function(){
  	resetClock();
  	console.log("stopClock");
  });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
  console.log('Wating for user to connect');
});

//setup som globel sutff for timer
var newtime = true;
var clocktime = 600;
var backspace = false;
var stoploop = false;

var stopClock = false;

// funtion section
function start(){
	//loop for looping clock and comperson
	if(stoploop == false){
		console.log(stoploop);
		var loopgroot = setInterval( function(){
			//clock loop
			writebackspace();
			printer(clock());
		}, 5000);

		var loopmin = setInterval( function(){
			//check loop
			compere();
			if(stoploop == true){
				clearInterval(loopgroot);
				clearInterval(loopmin);
			}
		}, 250);
	}
	
}
function startClock(){
	printer(getTime());
	stopClock = false;
	var clocktime = setInterval(function(){
		backspace = true;
		printer(getTime());
		if(stopClock = false){ 
			writebackspace();
		}
	},30000);
}
function resetClock(){
	stopClock = true;
}
function clock(){
	//gen new time or hold old time How ?
	if(newtime == true){
		//gen and save new time
		if(clocktime >= 5){
			clocktime = clocktime -5;
		}
		var returntime = timeConverter(clocktime)
		localStorage.setItem("clocktimesave" , returntime);
		newtime = false;
		return returntime;
	}
	if(newtime == false){
		//return old time
		return localStorage.getItem("clocktimesave");
	}
}
function getbrowserinput(getbrowserinputinput){
	//store input form browser in localstorge
	localStorage.setItem("browserinput", getbrowserinputinput);
}
function compere(){
	//compere time from node to the typed text
	var time1 = localStorage.getItem("clocktimesave");
	var time2 = localStorage.getItem("browserinput");

	console.log(time1 + " | " + time2);

	if(time1.length == time2.length){
		console.log("length is the same");
		if(time1 == time2){
			console.log("same");
			//gen and print new time
			newtime = true;
			backspace = true;
		}else if(time1 !== time2){
			//stet clock to true gen new time
			console.log("reloop");
			newtime = false;
			backspace = true;
			//test clock to false type old time again

			//print old time again (and set time 5 sec more back)
		}
	}else{
		newtime = false;
	}
}

function printer(clocktimeprinter){
	//printing out sended array to the serial port
		var printtime = clocktimeprinter;
		console.log("printnewtime: "+printtime);

		//convert time to array for looping
		var splittime = printtime.split("");

		//send loop to serial port
		for (i = 0; i < splittime.length; i++) {
			//wirte to serialPort
		  	//serialPort.write(splittime[i]);
		}			
}
function restloop(){
	//reset for new time
	clocktime = 600;
	console.log(stoploop);
	stoploop = true;
	console.log(stoploop);
}
function writebackspace(){
	if(backspace == true){
		//serialPort.write("b");
	}
}
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
function clearlocalstorge(){
	console.log("LocalStorageset");
	localStorage.setItem("clocktimesave" , "");
	localStorage.setItem("browserinput" ,  "");
}
function getTime() {
	var now     = new Date(); 
	var hour    = now.getHours();
	var minute  = now.getMinutes(); 
	if(hour.toString().length == 1) {
		var hour = '0'+hour;
	}
	if(minute.toString().length == 1) {
		var minute = '0'+minute;
	}
	var dateTime = hour+":"+minute;   
	return dateTime;
}