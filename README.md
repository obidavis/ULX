# ULX - Ultra Light (& Sound) dmX controller

## Overview 

This is a proof of concept quick and dirty UI for a hypothetical lighting controller to be used solely as job application material for Obi Davis. Given a lack of hardware and any detailed specification, it doesn't actually function as a lighting controller, although it does control lights. 

This project shows a potential avenue for how a GUI running on a Raspberry Pi could be made to interface with some GPIOs. Given the hardware I had in my house, this is shown through a web-based GUI that controls some columns of LEDs on a 32x8 LED matrix, setting their colour and number of pixels filled. The interface allows these parameters to be set, saved to presets and recalled. 

## Design

The essential end to end setup here is a web based UI (React) communicating with a Python backend (FastAPI) over both HTTP and WebSocket. The preset saving and loading is handled over HTTP, and the real-time changes are done via WebSocket. The python server interacts directly with the GPIOs to drive the LED matrix. This can be deployed as an entirely self contained unit by just running a browser on the Pi and connecting a monitor, but it also allows the possibility of remote control via phone or laptop. 

Whether this is the best general approach is definitely not clear. The overhead of running an entire web browser for a relatively straightforward set of controls is probably overkill, and JSON over the network is obviously more cumbersome than a proper serialised bytestream, especially given this is all running on one machine. I also don't know what the overhead of python GPIO bindings are on the Pi. Nevertheless, it was quick to develop and it may be absolutely fine under full load.

## Functionality

The program allows parameters (colour and size) to be set for 12 channels of lights which can be saved in 8 banks of presets. These numbers are just what fit nicely on the screen, however, and many many more would be straightforward to implement. 

Updates in the GUI are reflected in real time on the LEDs, including (obviously) recalling presets but also live clicking and dragging of the colour picker etc. I made no effort to throttle this update speed as it seemed happy. There's also a live preview direct in the GUI in the form of some coloured bars. 

## Setup

### Building the frontend

It's probably easiest to build this on a machine other than the Pi that has Node etc. installed, and just copy over the `dist` directory to the target `frontend` folder

```bash
cd frontend
npm run build
```

### Running the backend

Disclaimer: I haven't tested this on a cleanly imaged Pi

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip3 install -r requirements.txt
sudo .venv/bin/python3 src/server.py
```

### Operation

The GUI is accessible at localhost:8000/ulx, and the LEDs will be driven off GPIO18, although unless you have the same matrix as me it probably won't look right! 

## Issues

This was made in a day, so there's certainly a few issues:

- No tests! This, and the lack of detailed documentation, is due to time constraints and the relative smallness of the project.
- Source of truth is a little vague. Both the frontend and backend keep their own in-memory representation of the channel states and aren't explicitly synced. They don't seem to disagree in practice, but this should be approached very carefully.
- Data flow only goes GUI -> GPIOs. This is mainly to do with what hardware I had lying about. I thought about making some kind of global brightness physical knob that could be reflected in the GUI but I didn't have anything appropriate. Nothing in this architecture would make this challenging to add, though.
- No reconnect handling with the websocket. Again, I didn't get round to this. 
- Undo/Redo functionality would be very nice to have. 