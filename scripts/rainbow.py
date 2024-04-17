#!/usr/bin/python
# Simple demo of of the WS2801/SPI-like addressable RGB LED lights.
import time
import RPi.GPIO as GPIO

# Import the WS2801 module.
import Adafruit_WS2801
import Adafruit_GPIO.SPI as SPI

# import args
import sys

# Configure the count of pixels:
# PIXEL_COUNT = 32
PIXEL_COUNT = 96

# Alternatively specify a hardware SPI connection on /dev/spidev0.0:
SPI_PORT = 0
SPI_DEVICE = 0
pixels = Adafruit_WS2801.WS2801Pixels(PIXEL_COUNT, spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE), gpio=GPIO)


# Define the wheel function to interpolate between different hues.
def wheel(pos):
    if pos < 85:
        return Adafruit_WS2801.RGB_to_color(pos * 3, 255 - pos * 3, 0)
    elif pos < 170:
        pos -= 85
        return Adafruit_WS2801.RGB_to_color(255 - pos * 3, 0, pos * 3)
    else:
        pos -= 170
        return Adafruit_WS2801.RGB_to_color(0, pos * 3, 255 - pos * 3)

# Define rainbow cycle function to do a cycle of all hues.



def rainbow_cycle_successive(pixels, wait=0.1):
    for i in range(pixels.count()):
        # tricky math! we use each pixel as a fraction of the full 96-color wheel
        # (thats the i / strip.numPixels() part)
        # Then add in j which makes the colors go around per pixel
        # the % 96 is to make the wheel cycle around
        pixels.set_pixel(i, wheel(((i * 256 // pixels.count())) % 256))
        pixels.show()
        if wait > 0:
            time.sleep(wait)
    return pixels

def rainbow_cycle_successive_off(pixels, wait=0.1):
    pixels.show()
    for i in reversed(range(pixels.count())):
        # tricky math! we use each pixel as a fraction of the full 96-color wheel
        # (thats the i / strip.numPixels() part)
        # Then add in j which makes the colors go around per pixel
        # the % 96 is to make the wheel cycle around
        pixels.set_pixel(i, wheel(((i * 256 // pixels.count())) % 256))
        pixels.show()
        if wait > 0:
            time.sleep(wait)    

def sexy_time(pixels, wait=0.1):
    for i in range(pixels.count()):
        pixels.set_pixel(i, wheel(((i * -256 // pixels.count())) % -256))
        pixels.show()
        if wait > 0:
            time.sleep(wait)            


def rainbow_cycle(pixels, wait=0.005):
    for j in range(256):  # one cycle of all 256 colors in the wheel
        for i in range(pixels.count()):
            pixels.set_pixel(i, wheel(((i * 256 // pixels.count()) + j) % 256))
        pixels.show()
        if wait > 0:
            time.sleep(wait)

def rainbow_colors(pixels, wait=0.05):
    for j in range(256):  # one cycle of all 256 colors in the wheel
        for i in range(pixels.count()):
            pixels.set_pixel(i, wheel(((256 // pixels.count() + j)) % 256))
        pixels.show()
        if wait > 0:
            time.sleep(wait)



if __name__ == "__main__":
    if sys.argv[1] == "c":
        rainbow_colors(pixels)
    if sys.argv[1] == "cy":
        rainbow_cycle(pixels)
    if sys.argv[1] == "cys":
        rainbow_cycle_successive(pixels)
    if sys.argv[1] == "cysoff":
        rainbow_cycle_successive_off(pixels)    
    if sys.argv[1] == "sexy-time":
        sexy_time(pixels)  