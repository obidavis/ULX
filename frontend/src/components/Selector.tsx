import React from "react";
import { Box, RadioCards } from "@radix-ui/themes";

interface SelectorProps {
  selected: number;
  onSelect: (channel: number) => void;
  options: number;
}

const Selector: React.FC<SelectorProps> = ({ selected: selectedChannel, onSelect: setSelectedChannel, options: numChannels }) => {
  return (
      <RadioCards.Root defaultValue={String(selectedChannel)} columns={String(numChannels)} gap="2" onValueChange={(value) => setSelectedChannel(Number(value))}>
        {Array.from({ length: numChannels }, (_, i) => (
          <RadioCards.Item key={i} value={String(i + 1)} >
            {i + 1}
          </RadioCards.Item>
        ))}
      </RadioCards.Root>
  );
};

export default Selector;
