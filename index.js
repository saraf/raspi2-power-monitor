var Gpio = require('pigpio').Gpio,
    gpio;

var SysLogger = require('ain2');
var sysconsole = new SysLogger();

gpio = new Gpio(35);

const checkIntervalDuringBrownout   = 5000;
const checkIntervalDuringGoodSupply = 100;
var timer = 100;

/*
setInterval(function() { 
  var brownoutState = isUnderVoltage();

}, 100);
*/

function startTimer() {
  setTimeout(function() {
    var brownoutState = isUnderVoltage();

    if(brownoutState) {
      console.log("Brownout - telling the syslog ...");
      sysconsole.log("Brownout ... Power Supply Voltage went below 4.63 V");
      timer = checkIntervalDuringBrownout;
    }
    else {
      timer = checkIntervalDuringGoodSupply;
      //console.log("All good!");
   }
    startTimer();
  }, timer);
}

function isUnderVoltage() {
  var ledStatus = gpio.digitalRead(); 
  if(ledStatus === 1) {
    //console.log("all good");
    return 0;
  }
  else if (ledStatus === 0) {
    //console.log("brownout");
    return 1;
  }
  else {
    console.log("We got neither a 1 or a 0: ", ledStatus);
  }
}

startTimer();
