from pydantic import BaseModel, Field

class Colour(BaseModel):
    r: float = Field(ge=0, le=255)
    g: float = Field(ge=0, le=255)
    b: float = Field(ge=0, le=255)


class ChannelState(BaseModel):
    colour: Colour
    intensity: float = Field(ge=0, le=100)

class Preset(BaseModel):
    channels: list[ChannelState]

class PresetData(BaseModel):
    presets: list[Preset]