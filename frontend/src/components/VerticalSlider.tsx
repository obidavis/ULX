import React, { useEffect } from "react";
import { Slider } from "radix-ui";

interface VerticalSliderProps {
  value: number;
  onChange: (value: number) => void;
  onCommit: (value: number) => void;
}

const VerticalSlider: React.FC<VerticalSliderProps> = ({
  value,
  onChange,
  onCommit,
}) => {
  const [cachedValue, setCachedValue] = React.useState(value);
  useEffect(() => {
    setCachedValue(value);
  }, [value]);
  return (
    <Slider.Root
      className="SliderRoot"
      orientation="vertical"
      value={[cachedValue]}
      onValueChange={(value) => {
        setCachedValue(value[0]);
        onChange(value[0]);
      }}
      onValueCommit={(value) => {
        setCachedValue(value[0]);
        onCommit(value[0]);
      }}
    >
      <Slider.Thumb className="SliderThumb" />
      <Slider.Track className="SliderTrack" />
    </Slider.Root>
  );
};

export default VerticalSlider;
