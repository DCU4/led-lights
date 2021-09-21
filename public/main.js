const api_key = '27a2f910-e4ee-48f3-ad3c-81f389d939f1';
let url = '192.168.1.186:8081';
// let url = 'localhost:8081';


const socket = io().connect(`ws://${url}`, {reconnect: true, transports : ['websocket'], path: '/socket.io'});
// const socket = io('ws://localhost:8080', { 'transports': ['websocket'] }).connect();


window.addEventListener("load", function() { //when page loads
    const lightSwitch = document.getElementById("light");
    const rainbowSwitch = document.getElementById("rainbow");
    const sexyTimeSwitch = document.getElementById("sexy-time");
    const colorChanger = document.querySelector('#color-changer');

    lightSwitch.addEventListener("change", function() { //add event listener for when checkbox changes
      socket.emit("light", Number(this.checked)); //send button status to server (as 1 or 0)
      if(!this.checked) {
        rainbowSwitch.checked = false;
        sexyTimeSwitch.checked = false;
      }
    });

    rainbowSwitch.addEventListener("change", function() {
      socket.emit("rainbow", Number(this.checked)); 
    });

    sexyTimeSwitch.addEventListener("change", function() {
      socket.emit("sexy-time", Number(this.checked)); 
    });

    colorChanger.addEventListener('input', (e) => {
      colorChange(colorChanger)
    });

    emitMessage('yeooo', 'yeooo')
    
});


function emitMessage(el, msg) {
  const emitter = document.getElementById(el);
  emitter.addEventListener("change", function() {
    socket.emit(msg, Number(this.checked)); 
  });
}


socket.on('light', function(data) { //get button status from client
  let status = document.querySelector('#light-status');
  var lightSwitch = document.getElementById("light");
  if (data == 1){
    status.innerHTML = 'On';
    lightSwitch.checked = true;
  } else {
    status.innerHTML = 'Off';
    lightSwitch.checked = false;
  }
});

// socket.on('rainbow', function(data) { //get button status from client
//   console.log(data)
// });


function colorChange(colorChanger) {
  let colorPicked = document.querySelector('#color-picked');
  let color = colorChanger.value.match(/[A-Za-z0-9]{2}/g).map(function(v) { return parseInt(v, 16) }).join(",");
  socket.emit('color', color);
  colorPicked.innerHTML = color;
}