export interface ChannelState {
  colour: {
    r: number;
    g: number;
    b: number;
  };
  intensity: number;
}

export interface Preset {
  channels: ChannelState[];
}