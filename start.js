var childProcess = require('child_process');
require('./server.js');

console.log('Welcome to Kaliber Robotclock!');

childProcess.exec('node server.js', function () {
  console.log('Server has been started! Starting chromium');
  childProcess.exec('chromium localhost:8000 --kiosk --incognito');
});
