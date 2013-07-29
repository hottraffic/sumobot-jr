// =======================
// Sumobot Jr demo program
// =======================

var five = require("johnny-five"), keypress = require('keypress');

keypress(process.stdin);

var board = new five.Board();

board.on("ready", function() {

  console.log("WobbleBot")
  console.log("Control the bot with the arrow keys, and SPACE to stop.")

  var left_wheel  = new five.Servo({ pin:  10, type: 'continuous' }).stop();
  var right_wheel = new five.Servo({ pin: 9, type: 'continuous'  }).stop();
  var smile1      = new five.Led({pin: 2});
  var smile2      = new five.Led({pin: 3});
  var smile3      = new five.Led({pin: 4});
  var smile4      = new five.Led({pin: 5});
  var smile5      = new five.Led({pin: 6});
  var direction   = 1;
  var current_smile = 0;
  var last_smile = 4
  var smile_array = Array(smile1,smile2,smile3,smile4,smile5);

  process.stdin.resume(); 
  process.stdin.setEncoding('utf8'); 
  process.stdin.setRawMode(true); 

   setInterval(function() {
      smile_array[current_smile].on(); 
      smile_array[last_smile].off(); 
      last_smile = current_smile;
      current_smile = (current_smile+direction) % 5
      if (current_smile == 0) {
        direction = 1;
      } else if (current_smile == 4) {
        direction = -1;
      }
     }, 100); 
      

  process.stdin.on('keypress', function (ch, key) {  

    if ( !key ) return;


    if ( key.name == 'q' ) {

      console.log('Quitting');
      process.exit();

    } else if ( key.name == 'down' ) {

      console.log('Backward');
      left_wheel.ccw();
      right_wheel.cw();

    } else if ( key.name == 'up' ) {

      console.log('Forward');
      left_wheel.cw();
      right_wheel.ccw();      

    } else if ( key.name == 'left' ) {

      console.log('Left');
      left_wheel.ccw();
      right_wheel.ccw();      


    } else if ( key.name == 'right' ) {

      console.log('Right');
      left_wheel.cw();
      right_wheel.cw();

    } else if ( key.name == 'space' ) {

      console.log('Stopping');
      left_wheel.stop();
      right_wheel.stop();

    } else if ( key.name == 'w' ) {

      console.log('Ram');
    left_wheel.cw();
    right_wheel.ccw();


    }



  });


});