# ULX - Ultra Light (& Sound) dmX controller

## Overview 

This is a proof of concept quick and dirty UI for a hypothetical lighting controller to be used solely as job application material for Obi Davis. Given a lack of hardware and any detailed specification, it doesn't interface with a lighting controller, although it does control lights. 

This project shows a potential avenue for how a GUI running on a Raspberry Pi could be made to interface with some GPIOs. Given the hardware I had in my house, this is shown through a web-based GUI that controls some columns of a 32x24 LED matrix, setting their colour, number of pixels filled, and optionally a pulsing animation. The interface allows these parameters to be set, saved to presets and recalled. 

## Design

Many options are feasible for this setup, and the following choices were made in the interest of development speed. 

The GUI is implemented as a web page, designed with Tailwind and React, which communicates with a python backend responsible for communicating with the hardware (LEDs) and storing presets. This is probably not very performant, although it does open the doors for personal device based remote control without an attached monitor, so it is not a terrible idea by any stretch. In fact, if running Chromium on the Pi isn't a performance bottleneck and if the latency is low, it would be a very stong choice. 

Communication between the UI and GPIOs is handled through a python server and the Pi's python GPIO bindings. Again, this is a development speed choice, but it's unclear whether a  pure native C implementation woould be faster enough to warrant the added overhead. I think stress tests with realistic workloads would be a good move early on in the design of this product.
