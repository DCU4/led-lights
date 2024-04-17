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

def brightness_increase(pixels, wait=0.01, step=1, red=sys.argv[1], green=sys.argv[2], blue=sys.argv[3]):
    # r = int(max(0, int(red) + step))
    # g = int(max(0, int(green) + step))
    # b = int(max(0, int(blue) + step))
    for j in range(int(256 // step)):
        for i in range(pixels.count()):
            r, g, b = pixels.get_pixel_rgb(i)
            r = int(max(0, r + step))
            g = int(max(0, g + step))
            b = int(max(0, b + step))
            pixels.set_pixel(i, Adafruit_WS2801.RGB_to_color(r, g, b))

            if j == 255:
                turned_on(pixels, int(red), int(green), int(blue))
        pixels.show()
        if wait > 0:
            time.sleep(wait)


# unsupported operand type(s) for &: 'str' and 'int'
def turned_on(pixels, r, g, b):
    pixels.set_pixels(Adafruit_WS2801.RGB_to_color(r, g, b))
    pixels.show()

if __name__ == "__main__":
    brightness_increase(pixels)