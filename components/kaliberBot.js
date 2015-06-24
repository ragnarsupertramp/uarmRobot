function kaliberBot() {

  var hasStarted,
  runningTimeInMinutes = config.countdown.defaultTime,
  convertedRunningTimeInSeconds,
  currentTimeInSeconds,
  localTimer,
  updateIntervalTime = config.countdown.intervalTimer;

  function initialize( args ) {
    if ( args.hasOwnProperty( "time" ) ) {
      // update variable
      runningTimeInMinutes = args.time;
    }

    _convertTimeToSeconds( runningTimeInMinutes );

    currentTimeInSeconds = convertedRunningTimeInSeconds;
    hasStarted = false;
  }

  function startRobot() {
    if (!hasStarted) {
      hasStarted = true;

      _sendSerialData( 'a' );
      _startTimer();
    }
  }

  function stopRobot() {
    if (hasStarted) {
      hasStarted = false;

      _stopTimer();
      _sendSerialData( 'd' );
    }
  }

  function resetRobot() {
    // update current time back to initiated time
    currentTimeInSeconds = convertedRunningTimeInSeconds;

    if (!hasStarted) {
      _sendSerialData( _getTimeFromSecondsToString() );
    }
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

    if (currentTimeInSeconds >= 60) {
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
    currentTimeInSeconds = currentTimeInSeconds - updateIntervalTime;

    if (currentTimeInSeconds < 0) {
      stopRobot();
      // Send message to all connected browsers
      io.emit('timerEvent', 'done');        
    } else {
      _sendSerialData( 'b' + _getTimeFromSecondsToString() );
    }
  }

  function _startTimer() {
    localTimer = setInterval(function() { 
      _updateCurrentTime();
    }, (updateIntervalTime * 1000));
    console.log((new Date()) + ' - Timer started!');
  }

  function _stopTimer() {
    clearInterval(localTimer);
    console.log((new Date()) + ' - Timer stopped!');
  }

  function _sendSerialData( data ) {
    var serialData = data.split("");

    //send loop to serial port
    for (i = 0; i < serialData.length; i++) {
      // Send to serialport
      try {
        serialPort.write( serialData[i] );
      } catch (err) {
        console.log((new Date()) + ' - Error on serial: ' + err.message);
      }   
    }
  }

  this.init = initialize;
  this.start = startRobot;
  this.stop = stopRobot;
  this.reset = resetRobot;
  this.updateTime = _convertTimeToSeconds;
  this.getTime = _getTimeFromSecondsToString;
  this.getTimeInMinutes = runningTimeInMinutes;
}

module.exports = kaliberBot;