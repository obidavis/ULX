from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
import json
import os
import logging
from random import randint

from models import Preset, PresetData, ChannelState, Colour
from led_driver import display_channels

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[logging.StreamHandler()]
)

logger = logging.getLogger(__name__)

app = FastAPI()
app.mount("/ulx", StaticFiles(directory="../frontend/dist", html=True), name="ulx")

PRESETS_FILE = "presets.json"

presets: list[Preset] = []
clients: list[WebSocket] = []

@app.get("/api/presets", response_model=PresetData)
async def get_presets():
    """Returns stored presets"""
    logger.info("GET /api/presets request received.")
    return {"presets": [p.model_dump() for p in presets]}


@app.post("/api/presets")
async def save_presets(data: PresetData):
    """Saves presets to file"""
    logger.info("POST /api/presets request received.")
    global presets
    presets = data.presets
    save_presets_to_file(presets)
    logger.info("Presets saved to file.")

    return {"message": "Presets saved"}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """Handles WebSocket connections"""
    await websocket.accept()
    clients.append(websocket)
    logger.info(f"New WebSocket connection: {websocket.client}")

    try:
        while True:
            message = await websocket.receive_json()
            update = Preset(**message)
            display_channels(update.channels)

    except WebSocketDisconnect:
        clients.remove(websocket)
        logger.info(f"WebSocket disconnected: {websocket.client}")



def load_presets() -> list[Preset]:
    if os.path.exists(PRESETS_FILE):
        try:
            with open(PRESETS_FILE, "r") as f:
                data = json.load(f)
                logger.info("Presets loaded from file.")
                return PresetData(**data).presets  
        except (json.JSONDecodeError, ValueError) as e:
            logger.error(f"Error loading presets: {e}")
            return create_default_presets()
    else:
        logger.warning("Presets file not found. Generating defaults.")
        return create_default_presets()


def save_presets_to_file(presets: list[Preset]):
    try:
        with open(PRESETS_FILE, "w") as f:
            json.dump({"presets": [p.dict() for p in presets]}, f, indent=4)
        logger.info("Presets successfully saved to file.")
    except Exception as e:
        logger.error(f"Error saving presets: {e}")


def create_default_presets() -> list[Preset]:
    presets = []

    # Create a rainbow preset
    rainbow = [
        ChannelState(
            colour=Colour(r=i%2*255, g=(i//2)%2*255, b=(i//4)%2*255),
            intensity=50
        )
        for i in range(12)
    ]
    presets.append(Preset(channels=rainbow))

    # Create a red preset
    red_stripes = [
        ChannelState(
            colour=Colour(r=150 if i % 2 == 0 else 255, g=0, b=0), # alternate red and dark red
            intensity=100
        )
        for i in range(12)
    ]
    presets.append(Preset(channels=red_stripes))

    blue_stripes = [
        ChannelState(
            colour=Colour(r=0, g=100 if i % 2 == 0 else 20, b=200), # alternate blue and cyan
            intensity=i * 8 # increase intensity with each channel
        )
        for i in range(12)
    ]
    presets.append(Preset(channels=blue_stripes))

    random = [
        ChannelState(
            colour=Colour(r=randint(0, 255), g=randint(0, 255), b=randint(0, 255)),
            intensity=randint(0, 100)
        )
        for _ in range(12)
    ]
    presets.append(Preset(channels=random))
    presets.extend(reversed(presets)) # add some more random presets

    return presets



if __name__ == "__main__":
    presets = load_presets()
    display_channels(presets[0].channels)
    logger.info("Starting FastAPI server...")
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
