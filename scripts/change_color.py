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
pixels = Adafruit_WS2801.WS2801Pixels(
    PIXEL_COUNT, spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE), gpio=GPIO)


# unsupported operand type(s) for &: 'str' and 'int'
def change_color(pixels, r, g, b):
    print(r, g, b)
    pixels.set_pixels(Adafruit_WS2801.RGB_to_color(r, g, b))
    pixels.show()

if __name__ == "__main__":
    change_color(pixels, int(sys.argv[1]), int(sys.argv[3]), int(sys.argv[2]))