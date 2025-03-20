import { Card, Flex } from "@radix-ui/themes";
import React, { useCallback, useEffect } from "react";
import Selector from "./Selector";
import ColourPicker from "./ColourPicker";
import VerticalSlider from "./VerticalSlider";
import usePresetStore from "../store";
import { ColorService, IColor } from "react-color-palette";

const ChannelEditor: React.FC = () => {
  const selectedChannel = usePresetStore((state) => state.selectedChannel);
  const selectedPreset = usePresetStore((state) => state.selectedPreset);
  const setSelectedChannel = usePresetStore(
    (state) => state.setSelectedChannel
  );
  const intensity = usePresetStore(
    (state) => state.presets[selectedPreset].channels[selectedChannel].intensity
  );
  const colour = usePresetStore(
    (state) => state.presets[selectedPreset].channels[selectedChannel].colour
  );
  const setColor = usePresetStore((state) => state.setColour);
  const setIntensity = usePresetStore((state) => state.setIntensity);

  const handleColourCommit = useCallback(({ rgb }: IColor) => {
    setColor({
      r: rgb.r,
      g: rgb.g,
      b: rgb.b,
    });
  }, []);

  const handleIntensityCommit = useCallback((intensity: number) => {
    setIntensity(intensity);
  }, []);

  const color: IColor = ColorService.convert("rgb", { ...colour, a: 1 });
  return (
    <Card style={{ height: "100%" }}>
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
            onChange={() => {}}
            onCommit={handleColourCommit}
          />
          <VerticalSlider
            value={intensity}
            onChange={() => {}}
            onCommit={handleIntensityCommit}
          />
        </Flex>
      </Flex>
    </Card>
  );
};

export default ChannelEditor;
