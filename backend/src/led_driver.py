from models import Colour, ChannelState, Preset
import board
import neopixel
import time

data_pin = board.D18

rows = 8
cols = 32

pixels = neopixel.NeoPixel(data_pin, rows * cols, auto_write=False, brightness=0.1)

# The matrix I am using traverses column first, alternating direction
def index(row, col):
    if col % 2 == 0:
        return col * rows + row
    else:
        return col * rows + (rows - row - 1)

# neopixel needs ints
def set_pixel(row, col, colour: Colour):
    pixels[index(row, col)] = (
        int(colour.r),
        int(colour.g),
        int(colour.b)
    )

def display_channels(channels: list[ChannelState]):
    pixels.fill((0, 0, 0))
    for i, channel in enumerate(channels):
        # every other column is skipped
        col = i * 2

        # map intensity to height (0-100 to 0-8)
        mapped = channel.intensity / 100 * rows
        filled_leds = int(mapped)
        remainder = mapped - filled_leds

        # fill the column with the colour
        for row in range(filled_leds):
            set_pixel(row, col, channel.colour)
        
        # fill the remainder with scaled colour
        if filled_leds < rows and remainder > 0:
            scaled_colour = Colour(
                r=channel.colour.r * remainder,
                g=channel.colour.g * remainder,
                b=channel.colour.b * remainder
            )
            set_pixel(filled_leds, col, scaled_colour)
    pixels.show()

def main():
    channels: list[ChannelState] = [
        ChannelState(
            colour=Colour(r=i%2*255, g=(i//2)%2*255, b=(i//4)%2*255),
            intensity=i*4) 
        for i in range(12)
    ]
    display_channels(channels)

if __name__ == "__main__":
    main()

