import React from "react";
import { Slider } from "radix-ui";

interface VerticalSliderProps {
  value: number;
  onChange: (value: number) => void;
  onCommit: (value: number) => void;
}

const VerticalSlider: React.FC<VerticalSliderProps> = ({ value, onChange, onCommit }) => {
  return (
    <Slider.Root
      className="SliderRoot"
      orientation="vertical"
      value={[value]}
      defaultValue={[0]}
      onValueChange={(value) => onChange(value[0])}
      onValueCommit={(value) => onCommit(value[0])}
    >
      <Slider.Thumb className="SliderThumb" />
      <Slider.Track className="SliderTrack" />
    </Slider.Root>
  );
}

export default VerticalSlider;






