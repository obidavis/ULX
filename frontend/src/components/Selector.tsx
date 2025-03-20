import React from "react";
import { Box, RadioCards } from "@radix-ui/themes";

interface SelectorProps {
  selected: number;
  onSelect: (channel: number) => void;
  options: number;
}

const Selector: React.FC<SelectorProps> = ({ selected, onSelect, options }) => {
  return (
    <RadioCards.Root
      value={selected.toString()}
      columns={options.toString()}
      gap="2"
      onValueChange={(value) => onSelect(Number(value))}
    >
      {Array.from({ length: options }, (_, i) => (
        <RadioCards.Item key={i} value={i.toString()}>
          {i + 1}
        </RadioCards.Item>
      ))}
    </RadioCards.Root>
  );
};

export default Selector;
