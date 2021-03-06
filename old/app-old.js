
// var server = require('http').createServer({}, handleServer);//require http server, and create server with function handleServer()
// var fs = require('fs'); //require filesystem module
// var io = require('socket.io')(server) //require socket.io module and pass the http object (server)
// // var io = require('socket.io').listen(http);
// var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
// var LED04 = new Gpio(4, 'out'); //use GPIO pin 4 as output
// var LED06 = new Gpio(6, 'out'); //use GPIO pin 4 as output
// var pushButton = new Gpio(17, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
// //Put all the LED variables in an array
// var leds = [LED04, LED06];

// var audioIn = new G pio(18, 'in', 'both', {debounceTimeout: 100});


// // var Sensor = require('pigpio-vma309');
// // var sensor = new Sensor({pin:18});

// // var trigger = [];
// // var lightSwitch = 0;
// // sensor.on('alert',  (duration) => {
// //   console.log(duration);
// //   // if (duration > 40 && duration < 120 && trigger.length < 2) {
// //   //   trigger.push(duration);   
// //   // } 

// //   // if (trigger.length == 1){
// //     lightSwitch = !lightSwitch ? 1 : 0;
// //     leds.forEach((l,e) => {
// //       if (l.readSync() != lightSwitch) { //only change LED if status has changed
// //         setTimeout(()=> {
// //           l.writeSync(lightSwitch); //turn LED on or off
// //         },500);
// //         trigger = [];
// //       }
// //     });
// //   // }
// // });




// io.sockets.on('connection', function (socket) {// WebSocket Connection
//   console.log('connection')
//   var lightvalue = 0; //static variable for current status
//   pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton
//     if (err) { //if an error
//       console.error('There was an error', err); //output error message to console
//       return;
//     }
//     lightvalue = value;
//     socket.emit('light', lightvalue); //send button status to client
//   });
  
//   socket.on('light', function(data) { //get light switch status from client
//     console.log('data onlight',data)
//     lightvalue = (data);
//     leds.forEach((l,e) => {
//       // console.log(l);
//       if (lightvalue != l.readSync()) { //only change LED if status has changed
//         l.writeSync(lightvalue); //turn LED on or off
//       }
//     });
//   });

//   // // speech commands
//   // socket.on('command', (command) => {
//   //   let response = command;
//   //   console.log(response);
//   //   if (response == 'turn on') {
//   //     leds.forEach((l,e) => {
//   //       // console.log(l);
//   //       if (l.readSync() == 0) { //only change LED if status has changed
//   //         l.writeSync(1); //turn LED on or off
//   //       }
//   //     });
//   //   }
//   //   socket.emit('response', response);

//   // });

//   // audio 
//   // var audiovalue = 0;
//   // audioIn.watch(function (err, value) { 
//   //   if (err) { //if an error
//   //     console.error('There was an error', err); //output error message to console
//   //     return;
//   //   }
//   //   console.log('watch', value);
//   //   audiovalue = value;
//   //   socket.emit('audio', audiovalue); //send button status to client
//   // });

//   // socket.on('audio', function(data) { //get light switch status from client
//   //   console.log('data onaudio',data)
//   //   audiovalue = data;
//   //   leds.forEach((l,e) => {

//   //     audiovalue = (data == l.readSync() ? 0 : 1);
//   //     // console.log(audiovalue, l.readSync());
//   //     if (audiovalue != l.readSync()) { //only change LED if status has changed
//   //       l.writeSync(audiovalue); //turn LED on or off
//   //     }
//   //   });
//   // });
  
  
// });


// connecting to Raspberry Pi SPI
// leds.connect(32); // assign number of WS2801 LEDs

// // set all colors to yellow
// console.log("fill all yellow");
// // fill(r, g, b)
// // r, g, b: value as hex (0x00 = 0, 0xFF = 255, 0x7F = 127)
// // leds.fill(0xFF, 255, 0x00);
// leds.fill(255, 255, 255);

  
// // after 2 seconds set first 6 LEDs to (red, green, blue, red, green, blue)
// setTimeout(function(){
//   console.log("red green blue red green blue");
//   // setRGB(ledIndex, hexColor);
//   // ledIndex: 0 = LED1, 1 = LED2, …
//   // hexColor: '#FF0000' = red, '#00FF00' = green, ...
//   // leds.setRGB(0, '#FF0000');    // set LED1 to red
//   // leds.setRGB(1, '#00FF00');    // set LED2 to green
//   // leds.setRGB(2, '#0000FF');    // set LED3 to blue

//   // // setColor(ledIndex, color);
//   // // ledIndex: 0 = LED1, 1 = LED2, …
//   // // color: array[red, green, blue] = [255,0,0] = red, [0,255,0] = green
//   // leds.setColor(3, [255,0,0]);  // set LED4 to red
//   // leds.setColor(4, [0,255,0]);  // set LED5 to green
//   // leds.setColor(5, [0,0,255]);  // set LED6 to blue
  
//   // send all set colors to SPI via update();
//   for(var i = 0; i < 33; i++) {
//     leds.setColor(i, [0,0,255]);
//       // leds.setChannelPower(i, (i/32));
//   }
//   leds.update();
// }, 2000);



const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
var leds = require('rpi-ws2801');
// var path = require('path');
// var filePath = "./lightswitch/views/index.html"
// var resolvedPath = path.resolve(filePath);

// app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images



app.get('/', (req, res) => {
  if (res.statusCode === 200) {
    // turnOn(255, 255, 0)
    res.sendFile('/views/index.html', {
      root: __dirname
    });
   
  } else {
    return res.status(404);
  }
});


app.get('/turn-on', (req, res) => {
  if (res.statusCode === 200) {
  
    
 res.sendFile('/views/index.html', {
        root: __dirname
      });
  
} else {
  return res.status(404);
}


});


// app.post('/turn-on', (req, res) => {
//   console.log('turn on')
//   if (res.statusCode === 200) {
  
    
//   turnOn(255,255,255,res)

  
// } else {
//   return res.status(404);
// }


// });


app.get('/color', (req, res) => {

  if (res.statusCode === 200) {
    
    turnOn(255, 0, 255)
  } else {
    return res.status(404);
  }

});

app.post('/turn-off', (req, res) => {

  if (res.statusCode === 200) {
    
    turnOff()
    res.json('okay')
  } else {
    return res.status(404);
  }

});



io.sockets.on('connection', function(socket) {

  console.log('connected');
  
  // speech commands
  socket.on('command', (command) => {
    let response = command;
    console.log(response);
    socket.emit('response', response);

    if (response == 'lights on' || response == 'lightson') {
      leds.forEach((l,e) => {
        if (l.readSync() == 0) { //only change LED if status has changed
          l.writeSync(1); //turn LED on or off
        }
      });
    }

    if (response == 'lights off' || response == 'lightsoff') {
      leds.forEach((l,e) => {
        if (l.readSync() == 1) { //only change LED if status has changed
          l.writeSync(0); //turn LED on or off
        }
      });
    }
  });


  // light input
  socket.on('light', function(data) { //get light switch status from client
    console.log('data onlight',data)
    lightvalue = (data);
    if(data) {
      turnOn()
      socket.emit('light', data);
      // NEED A SELECT LIST
    } else {
      turnOff()
      socket.emit('light', data);
    }
    // leds.forEach((l,e) => {
    //   // console.log(l);
    //   if (lightvalue != l.readSync()) { //only change LED if status has changed
    //     l.writeSync(lightvalue); //turn LED on or off
    //   }
    // });
  });


  // color
  socket.on('color', function(data) { //get light switch status from client
    console.log('COLOR',data)
    let rgb = data.split(',');
    // let {r,g,b} = rgb;
    // console.log({r,g,b})
    changeColor(rgb[0], rgb[1], rgb[2])
    
  });
});




function turnOff() {
  var exec = require('child_process').exec;
  exec(`python "${__dirname}/turn_off.py"`, function (error, stdout, stderr) {
    if (error) {
      console.log('errorororor',error)
    } else {
      console.log('stdout: ' + stdout);
    }
  });
}


function runScript(script) {
  var exec = require('child_process').exec;
  exec(`python "${__dirname}/${script}.py"`, function (error, stdout, stderr) {
    if (error) {
      console.log('errorororor',error)
    } else {
      console.log('stdout: ' + stdout);
    }
  });
}



function turnOn(r=255,g=255,b=255,res) {

  var exec = require('child_process').exec;
  var child;
  console.log('herllo tere')
  if (exec){
  exec(`python "${__dirname}/turn_on.py" ${r} ${g} ${b}`, function (error, stdout, stderr) {
    if (error) {
      console.log('errorororor',error);
     
    } else {
      
      console.log('stdout: ' + stdout);

    }
  });
} else {
  res.json({'error': exec});
}

}

function changeColor(r,g,b) {


  var exec = require('child_process').exec;
  var child;

  exec(`python "${__dirname}/change_color.py" ${r} ${g} ${b}`, function (error, stdout, stderr) {
    if (error) {
      console.log('errorororor',error)
    } else {
      
      console.log('stdout: ' + stdout);
    }
  });

}


http.listen(8080, () => {
  console.log('connected to serverrrr');
});

process.on('SIGINT', function () { //on ctrl+c
  // leds.forEach((l,e) => {
  //   l.writeSync(0); // Turn LED off
  //   l.unexport(); // Unexport LED GPIO to free resources
  //   // pushButton.unexport(); // Unexport Button GPIO to free resources
  //   process.exit(); //exit completely
  // });
  leds.disconnect();
  turnOff();
  process.exit()
});
  