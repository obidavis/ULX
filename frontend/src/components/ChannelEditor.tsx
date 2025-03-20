import { Card, Flex } from "@radix-ui/themes";
import React, { useCallback, useEffect } from "react";
import Selector from "./Selector";
import ColourPicker from "./ColourPicker";
import VerticalSlider from "./VerticalSlider";
import usePresetStore from "../hooks/usePresetStore";
import { ColorService, IColor } from "react-color-palette";
import useSocket from "../hooks/useWebSocket";

const ChannelEditor: React.FC = () => {
  const selectedChannel = usePresetStore((state) => state.selectedChannel);
  const selectedPreset = usePresetStore((state) => state.selectedPreset);
  const setSelectedChannel = usePresetStore(
    (state) => state.setSelectedChannel
  );
  const preset = usePresetStore((state) => state.presets[selectedPreset]);
  const intensity = usePresetStore(
    (state) => state.presets[selectedPreset].channels[selectedChannel].intensity
  );
  const colour = usePresetStore(
    (state) => state.presets[selectedPreset].channels[selectedChannel].colour
  );
  const setColor = usePresetStore((state) => state.setColour);
  const setIntensity = usePresetStore((state) => state.setIntensity);

  const { sendPreset } = useSocket();

  useEffect(() => {
    sendPreset(preset);
  }, [colour, intensity, preset]);

  const handleColourChange = useCallback(({ rgb }: IColor) => {
    setColor({
      r: rgb.r,
      g: rgb.g,
      b: rgb.b,
    });
  }
  , [selectedChannel, colour, setColor]);
  
  const handleColourCommit = useCallback(({ rgb }: IColor) => {
    setColor({
      r: rgb.r,
      g: rgb.g,
      b: rgb.b,
    });
  }, [selectedChannel, colour, setColor]);

  const handleIntensityChange = useCallback((intensity: number) => {
    setIntensity(intensity);
  }, [selectedChannel, intensity, setIntensity]);

  const handleIntensityCommit = useCallback((intensity: number) => {
    setIntensity(intensity);
  }, [selectedChannel, intensity, setIntensity]);

  const color: IColor = ColorService.convert("rgb", { ...colour, a: 1 });
  return (
    <Card style={{ height: "100%", width: "100%" }}>
      <Flex direction="column" gap="1rem">
        <label>Channels</label>
        <Selector
          selected={selectedChannel}
          onSelect={setSelectedChannel}
          options={12}
        />
        <Flex direction="row" gap="1rem">
          <ColourPicker
            value={color}
            onChange={handleColourChange}
            onCommit={handleColourCommit}
          />
          <VerticalSlider
            value={intensity}
            onChange={handleIntensityChange}
            onCommit={handleIntensityCommit}
          />
        </Flex>
      </Flex>
    </Card>
  );
};

export default ChannelEditor;
