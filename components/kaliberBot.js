var SerialPort = require("serialport").SerialPort;
// var serialPort = new SerialPort("/dev/ttyUSB0", {
//  baudrate: 9600
// });

function kaliberBot() {

	var hasStarted,
	runningTimeInMinutes = 10,
	convertedRunningTimeInSeconds,
	currentTimeInSeconds,
	localTimer;

	function initialize( args ) {
		if ( args.hasOwnProperty( "time" ) ) {
			// update variable
			runningTimeInMinutes = args.time;
		}

		_convertTimeToSeconds( runningTimeInMinutes );

		currentTimeInSeconds = convertedRunningTimeInSeconds;
		hasStarted = false;

		_sendSerialData( _getTimeFromSecondsToString() );
	}

	function startRobot() {
		if (!hasStarted) {
			hasStarted = true;

			_startTimer();
			// start commando naar serial
		}
	}

	function stopRobot() {
		if (hasStarted) {
			hasStarted = false;

			_stopTimer();
			// stop commando naar serial
			resetRobot();
		}
	}

	function resetRobot() {
		// update current time back to initiated time
		currentTimeInSeconds = convertedRunningTimeInSeconds;
	}

	function _convertTimeToSeconds( minutes ) {
		if (typeof minutes === 'number') {
			var timeInSeconds = parseInt( minutes * 60 );
			convertedRunningTimeInSeconds = timeInSeconds;
			console.log((new Date()) + ' - time converted: ' + timeInSeconds + ' seconds.');
		} else {
			console.error((new Date()) + ' - minutes is not a valid number type');
			console.log((new Date()) + ' - using default running time (' + runningTimeInMinutes + ').');
		}
	}

	function _getTimeFromSecondsToString() {
		var theTime = "";
		var minutes = parseInt( currentTimeInSeconds / 60 );
		var seconds = currentTimeInSeconds % 60;

		if (currentTimeInSeconds > 60) {
			theTime += minutes < 10 ? "0" + minutes : minutes;
			theTime += ":";
			theTime += seconds < 10 ? "0" + seconds : seconds;
		} else {
			theTime += "00:";
			theTime += seconds < 10 ? "0" + seconds : seconds;
		}
		return theTime;
	}

	function _updateCurrentTime() {
		if (currentTimeInSeconds > 0) {
			currentTimeInSeconds = currentTimeInSeconds - 5;
			console.log((new Date()) + ' - new time: ' + _getTimeFromSecondsToString());

			_sendSerialData( _getTimeFromSecondsToString() );
		} else {
			stopRobot();
		}
	}

	function _startTimer() {
		localTimer = setInterval(function() { 
			_updateCurrentTime();
		}, 5000);
		console.log((new Date()) + ' - Timer started!');
	}

	function _stopTimer() {
		clearInterval(localTimer);
		console.log((new Date()) + ' - Timer stopped!');
	}

	function _sendSerialData( data ) {
		console.log((new Date()) + ' - send data to serial: ' + data);

		var serialData = data.split("");

		//send loop to serial port
		for (i = 0; i < serialData.length; i++) {
			// Send to serialport
		  	serialPort.write( serialData[i] );
		  }				
		}

		this.init = initialize;
		this.start = startRobot;
		this.stop = stopRobot;
		this.reset = resetRobot;
		this.getTime = _getTimeFromSecondsToString;
	}

	module.exports = kaliberBot;