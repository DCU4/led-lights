//       var grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
// const recognition = new SpeechRecognition();
// const speechRecognitionList = new SpeechGrammarList();
// speechRecognitionList.addFromString(grammar, 1);
// // recognition.grammars = false;
// recognition.continuous = true;
// recognition.lang = 'en-US';
// recognition.interimResults = false;
// recognition.maxAlternatives = 1;
const api_key = '27a2f910-e4ee-48f3-ad3c-81f389d939f1';
let url = '192.168.1.186:8081';
// let url = 'localhost:8081';
// elements
// var diagnostic = document.querySelector('.output');
// var bg = document.querySelector('html');
// var img = document.querySelector('img');

const socket = io().connect(`ws://${url}`, {reconnect: true, transports : ['websocket'], path: '/socket.io'});
// const socket = io('ws://localhost:8080', { 'transports': ['websocket'] }).connect();

console.log(socket);
// document.body.onclick = function() {
//     // recognition.start(); 
//     console.log('Ready to receive a color command.');
//     // getCat();
// }

// recognition.start(); 
// let deviceId;
// navigator.mediaDevices.enumerateDevices()
// .then(function(devices) {
//   devices.forEach(function(device) {
//     console.log(device);
//   });
// })
// .catch(function(err) {
//   console.log(err.name + ": " + err.message);
// });


// navigator.mediaDevices.getUserMedia({
//   audio: {
//     deviceId: 'default'
//   }, 
//   video:false
// })
// .then(function(stream) {
//   /* use the stream */
//   console.log('getUseMedia started')
//   recognition.start(); 
// })
// .catch(function(err) {
//   /* handle the error */
//   console.log('err',err);
// });



// recognition.onspeechstart = () => {
//     console.log('speech received')
// }

// recognition.onsoundstart = () => {
//     console.log('sound received')
// }


// recognition.onresult = function(event) {
//     var command = event.results[event.results.length - 1][0].transcript.replace(' ', '');
//     console.log(command);
//     if (command == 'show me what you got') {
//         img.classList.add('showing');
//     }
//     if (command == 'cat please') {
//         getCat();
//     }

//     socket.emit('command', command);
// }

// socket.on('response', function(res) {
//     console.log('res', res)
//     setColor(res);
// });



// functions
// function setColor(color) {
//     diagnostic.textContent = 'Result received: ' + color;
//     bg.style.backgroundColor = color;
// }


async function getCat() {
    let loader = document.querySelector('.loader');
    loader.classList.add('loading');
    let img = document.querySelector('img.cat');
    const call = await fetch('https://api.thecatapi.com/v1/images/search', {
        headers: {
            'x-api-key': api_key
        }
    });
    const cat = await call.json();
    console.log(cat);
    img.src = cat[0].url;
    img.onload = function() {
    loader.classList.remove('loading');
    img.classList.add('showing');
    }

}



window.addEventListener("pageshow", function() { //when page loads
  // let colorPicked = document.querySelector('#color-picked');
  // colorPicked.innerHTML = 'waitingg';
  // console.log(url);
  // fetch( `http://${url}/turn-on`,
  // {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  // })
  // .then(res=> {
   
  //   res.json();
  //   console.log(res)
  // })
  // .then(data => {
  //   console.log(data);
  // })
  // .catch(err =>console.log(err));
   // var audiobox = document.getElementById("audio");
    // audiobox.addEventListener("change", function() { //add event listener for when checkbox changes
    //   socket.emit("audio", Number(this.checked)); //send button status to server (as 1 or 0)
    // });

    

    var lightbox = document.getElementById("light");
    lightbox.addEventListener("change", function() { //add event listener for when checkbox changes
      socket.emit("light", Number(this.checked)); //send button status to server (as 1 or 0)
    });

 

    var colorChanger = document.querySelector('#color-changer');
    colorChanger.addEventListener('input', (e) => {
      colorChange(colorChanger)
    });
    
    

});

let lightswitch = document.querySelector('#lightswitch');
lightswitch && lightswitch.addEventListener('click', () => {
    lightswitch.innerHTML = 'off';
    fetch( `http://${url}/turn-off'`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err));
});

socket.on('light', function(data) { //get button status from client
  console.log(data)
  let status = document.querySelector('#light-status');
  if (data == 1){
    status.innerHTML = 'On';
  } else {
    status.innerHTML = 'Off';
  }

    // document.getElementById("light").checked = data; //change checkbox according to push button on Raspberry Pi
    // socket.emit("light", data); //send push button status to back to server
});

// socket.on('audio', function (data) { //get button status from client
//   console.log('audio', data);
//   document.getElementById("audio").checked = data; //change checkbox according to push button on Raspberry Pi
//   socket.emit("audio", data); //send push button status to back to server
// });

function colorChange(colorChanger) {
 
  let colorPicked = document.querySelector('#color-picked');
  
  let color = colorChanger.value.match(/[A-Za-z0-9]{2}/g).map(function(v) { return parseInt(v, 16) }).join(",");
  console.log(color);
  socket.emit('color', color);
  colorPicked.innerHTML = color;
}