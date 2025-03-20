import { create } from "zustand";
import { produce } from "immer";
import { ChannelState, Preset } from "../types";

interface PresetState {
  presets: Preset[];
  selectedPreset: number;
  selectedChannel: number;
  setSelectedPreset: (preset: number) => void;
  setSelectedChannel: (channel: number) => void;
  setColour: (colour: { r: number; g: number; b: number }) => void;
  setIntensity: (intensity: number) => void;
  savePresets(): Promise<void>;
  loadPresets(): Promise<Preset[]>;
  initPresets(presets: Preset[]): void;
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
    channels: Array.from({ length: 12 }, () => ({
      colour: { r: 200, g: 100, b: 0 },
      intensity: 50,
    })),
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
    try {
      const response = await fetch("/api/presets");
      const data = await response.json();
      return data.presets;
    } catch (e) {
      console.error(e);
      return get().presets;
    }
  },
  initPresets: (presets) => {
    set({ presets });
  }
}));

export default usePresetStore;
