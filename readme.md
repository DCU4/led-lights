# LED LIGHTS

Using Node.js and websockets, this server lives on my raspberry pi and powers a 32 led light strip. The led lights themselves are controlled with python through a number of scripts. These mainly rely on the Adafruit_WS2801 module and some code that I found [here](https://tutorials-raspberrypi.com/how-to-control-a-raspberry-pi-ws2801-rgb-led-strip/). The server is running on express and websocket.io to run the python scripts.

---

## Controls

I put together a simple UI to perform basic commands such as on/off and changing colors through HTML inputs. I can control this from my phone, and I have it saved to the homescreen to have more of an "app" feel. The manifest.json gives some control here with the icon image to tap on and URL removed from the window.

<img width="325" title="LED light control UX" alt="Image of LED light control UX" src="/public/controls-ux.png" />

## TODO:
 - ~~Create a manifest.json~~
 - ~~Create images for manifest~~
 - ~~Refactor some of app.js~~


## To build yourself:
In terms of the pi setup and python, I almost completely took from the link above. It looks like the python library might be a bit old, but it works. 
