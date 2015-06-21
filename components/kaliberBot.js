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

    setTimeout(function() {
      _sendSerialData( _getTimeFromSecondsToString() );
    }, 500);
  }

  function startRobot() {
    if (!hasStarted) {
      hasStarted = true;

      // Send backspace to robot
      _sendSerialData( 'b' );
      _startTimer();
    }
  }

  function stopRobot() {
    if (hasStarted) {
      hasStarted = false;

      _stopTimer();
      resetRobot();
    }
  }

  function resetRobot() {
    // update current time back to initiated time
    currentTimeInSeconds = convertedRunningTimeInSeconds;

    _sendSerialData( _getTimeFromSecondsToString() );
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

      _sendSerialData( _getTimeFromSecondsToString() + "b" );
    } else {
      stopRobot();
      // Send message to all connected browsers
      io.emit('timerEvent', 'done');
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
    this.getTime = _getTimeFromSecondsToString;
  }

  module.exports = kaliberBot;