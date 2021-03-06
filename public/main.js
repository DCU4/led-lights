const api_key = '27a2f910-e4ee-48f3-ad3c-81f389d939f1';
let url = '192.168.1.186:8081';
// let url = 'localhost:8081';


const socket = io().connect(`ws://${url}`, {reconnect: true, transports : ['websocket'], path: '/socket.io'});
// const socket = io('ws://localhost:8080', { 'transports': ['websocket'] }).connect();

console.log(socket);


window.addEventListener("pageshow", function() { //when page loads
  
    var lightSwitch = document.getElementById("light");
    lightSwitch.addEventListener("change", function() { //add event listener for when checkbox changes
      socket.emit("light", Number(this.checked)); //send button status to server (as 1 or 0)
    });

    var rainbowSwitch = document.getElementById("rainbow");
    rainbowSwitch.addEventListener("change", function() {
      socket.emit("rainbow", Number(this.checked)); 
    });

    var sexyTimeSwitch = document.getElementById("sexy-time");
    sexyTimeSwitch.addEventListener("change", function() {
      socket.emit("sexy-time", Number(this.checked)); 
    });

    var colorChanger = document.querySelector('#color-changer');
    colorChanger.addEventListener('input', (e) => {
      colorChange(colorChanger)
    });

    emitMessage('yeooo', 'yeooo')
    
});


function emitMessage(el, msg) {
  var emitter = document.getElementById(el);
  emitter.addEventListener("change", function() {
    socket.emit(msg, Number(this.checked)); 
  });
}


socket.on('light', function(data) { //get button status from client
  console.log(data)
  let status = document.querySelector('#light-status');
  if (data == 1){
    status.innerHTML = 'On';
  } else {
    status.innerHTML = 'Off';
  }
});

socket.on('rainbow', function(data) { //get button status from client
  console.log(data)

});


function colorChange(colorChanger) {
 
  let colorPicked = document.querySelector('#color-picked');
  
  let color = colorChanger.value.match(/[A-Za-z0-9]{2}/g).map(function(v) { return parseInt(v, 16) }).join(",");
  console.log(color);
  socket.emit('color', color);
  colorPicked.innerHTML = color;
}