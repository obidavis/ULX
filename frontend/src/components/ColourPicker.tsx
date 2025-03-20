import { Box } from "@radix-ui/themes";
import React, { useState } from "react";
import { ColorPicker, useColor, IColor } from "react-color-palette";
import "react-color-palette/css";

interface ColourPickerProps {
  onChange: (colour: IColor) => void;
  onCommit: (colour: IColor) => void;
}

const ColourPicker: React.FC<ColourPickerProps> = ({
  onChange,
  onCommit 
}) => {
  const [color, setColor] = useColor("#000000");
  return (
    <Box width="100%" height="100%">
      <ColorPicker
        color={color}
        onChange={(colour) => {
          setColor(colour);
          onChange(colour);
        }}
        onChangeComplete={onCommit}
        hideAlpha
        hideInput
      />
    </Box>
  );
};

export default ColourPicker;
