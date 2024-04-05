const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
var leds = require('rpi-ws2801');
const cors = require('cors')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

let lightOn = false;

app.get('/', (req, res) => {
  if (req.statusCode === 200) {
    res.sendFile('/views/index.html', {
      root: __dirname
    });
  } else {
    return res.status(404);
  }
});


app.get('/turn-on', (req, res) => {
  if (res.statusCode === 200) {

    // res.sendFile('/views/index.html', {
    //   root: __dirname
    // });

    turnOn();

  } else {
    return res.status(404);
  }

});


app.get('/color', (req, res) => {

  if (res.statusCode === 200) {
    turnOn(255, 0, 255)
  } else {
    return res.status(404);
  }

});

app.post('/playlist-color', (req, res) => {
  const [r,g,b] = req.body.color.split(',');
  console.log(r,g,b);
  if (res.statusCode === 200) {
    changeColor(r,g,b)
  } else {
    return res.status(404);
  }

});



io.sockets.on('connection', function (socket) {

  console.log('connected');

  // speech commands
  socket.on('command', (command) => {
    let response = command;
    console.log(response);
    socket.emit('response', response);

  });


  // light input
  socket.on('light', (data) => {
    console.log('data onlight', data)
    lightvalue = (data);
    if (data) {
      turnOn()
      socket.emit('light', data);
    } else {
      turnOff()
      socket.emit('light', data);
    }
  });


  // color
  socket.on('color', (data) => {
    console.log('COLOR', data)
    let rgb = data.split(',');
    changeColor(rgb[0], rgb[1], rgb[2]);
  });


  socket.on('rainbow', (data) => {
    if (data) {
      runScript('rainbow.py', 'cys');
    } else {
      runScript('turn_off.py');
      // runScript('rainbow.py', 'cysoff');
    }
    socket.emit('rainbow', data);
  });


  // emitScript(socket, 'rainbow', 'rainbow.py', 'c');

  // emitScript(socket, 'rainbow', 'rainbow.py', 'cy');

  emitScript(socket, 'sexy-time', 'rainbow.py', 'sexy-time');

  emitScript(socket, 'yeooo', 'ireland.py');

});



function emitScript(socket, msg, script, args) {
  socket.on(msg, (data) => {
    console.log(data);
    if (data) {
      runScript(script, args);
    } else {
      runScript('turn_off.py');
    }
    socket.emit(msg, data);
    socket.emit('light', data);
  });
}

function runScript(script, args) {
  var exec = require('child_process').exec;
  exec(`python "${__dirname}/scripts/${script}" ${args}`, function (error, stdout, stderr) {
    if (error) {
      console.log('errorororor', error)
    } else {
      console.log('stdout: ' + stdout);
    }
  });
}



function turnOff() {
  var exec = require('child_process').exec;
  exec(`python "${__dirname}/scripts/turn_off.py"`, function (error, stdout, stderr) {
    if (error) {
      console.log('errorororor', error)
    } else {
      console.log('stdout: ' + stdout);
    }
  });
}


function turnOn(r = 255, g = 255, b = 255) {
  var exec = require('child_process').exec;
  exec(`python "${__dirname}/scripts/turn_on.py" ${r} ${g} ${b}`, function (error, stdout, stderr) {
    if (error) {
      console.log('errorororor', error);
    } else {
      console.log('stdout: ' + stdout);
    }
  });

}

function changeColor(r, g, b) {
  var exec = require('child_process').exec;
  exec(`python "${__dirname}/scripts/change_color.py" ${r} ${g} ${b}`, function (error, stdout, stderr) {
    if (error) {
      console.log('errorororor', error)
    } else {
      console.log('stdout: ' + stdout);
    }
  });
}


http.listen(8081, () => {
  console.log('connected to serverrrr');
});

process.on('SIGINT', function () { //on ctrl+c
  leds.disconnect();
  turnOff();
  process.exit()
});
