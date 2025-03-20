import React from "react";
import { Box, Flex } from "@radix-ui/themes";
import usePresetStore from "../hooks/usePresetStore";

const ChannelVisualiser: React.FC = () => {
  const { presets, selectedPreset } = usePresetStore();
  const channels = presets[selectedPreset].channels;
  return (
    <Flex direction="row" gap="0.5rem" justify="center" height="100%">
      {channels.map((channel, index) => {
        const { r, g, b } = channel.colour;
        const heightPercentage = channel.intensity; // 0-100
        return (
          <Box
            key={index}
            width={`${100 / channels.length}%`}
            height={`${heightPercentage}%`}
            style={{
              backgroundColor: `rgb(${r}, ${g}, ${b})`,
              transition: "height 0.1s ease-in-out",
              borderRadius: "10px",
              marginInline: "1rem",
            }}
          />
        );
      })}
    </Flex>
  );
};

export default ChannelVisualiser;
