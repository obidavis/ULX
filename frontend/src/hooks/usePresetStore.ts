import { create } from "zustand";
import { produce } from "immer";

interface ChannelState {
  colour: {
    r: number;
    g: number;
    b: number;
  };
  intensity: number;
}

interface Preset {
  channels: ChannelState[];
}

interface PresetState {
  presets: Preset[];
  selectedPreset: number;
  selectedChannel: number;
  setSelectedPreset: (preset: number) => void;
  setSelectedChannel: (channel: number) => void;
  setColour: (colour: { r: number; g: number; b: number }) => void;
  setIntensity: (intensity: number) => void;
  savePresets(): Promise<void>;
  loadPresets(): Promise<void>;
}

const generateRandomState = (): ChannelState => ({
  colour: {
    r: Math.random() * 255,
    g: Math.random() * 255,
    b: Math.random() * 255,
  },
  intensity: Math.random() * 100,
});

const usePresetStore = create<PresetState>((set, get) => ({
  presets: Array.from({ length: 8 }, () => ({
    channels: Array.from({ length: 12 }, generateRandomState),
  })),
  selectedPreset: 0,
  selectedChannel: 0,
  setSelectedPreset: (preset) => set({ selectedPreset: preset }),
  setSelectedChannel: (channel) => set({ selectedChannel: channel }),
  setColour: (colour) => {
    set(
      produce((state) => {
        state.presets[state.selectedPreset].channels[
          state.selectedChannel
        ].colour = colour;
      })
    );
  },
  setIntensity: (intensity) => {
    set(
      produce((state) => {
        state.presets[state.selectedPreset].channels[
          state.selectedChannel
        ].intensity = intensity;
      })
    );
  },
  savePresets: async () => {
    await fetch("/api/presets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        presets: usePresetStore.getState().presets,
      }),
    });
  },
  loadPresets: async () => {
    const response = await fetch("/api/presets");
    const data = await response.json();
    set({ presets: data });
  },
}));

export default usePresetStore;
