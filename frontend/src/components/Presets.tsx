import { Box, Button, Card, Flex } from "@radix-ui/themes";
import React, { use } from "react";
import Selector from "./Selector";
import usePresetStore from "../hooks/usePresetStore";

const Presets: React.FC = () => {
  const numPresets = usePresetStore((state) => state.presets.length);
  const selected = usePresetStore((state) => state.selectedPreset);
  const handleSelect = usePresetStore((state) => state.setSelectedPreset);
  const savePresets = usePresetStore((state) => state.savePresets);
  return (
    <Box flexGrow="1" style={{ padding: "0.5rem" }}>
      <Card style={{ height: "100%" }}>
        <Flex direction="column" gap="1rem">
          <label>Presets</label>
          <Selector
            selected={selected}
            onSelect={handleSelect}
            options={8}
          />
          <Button variant="outline" onClick={savePresets} loading={false}>
            Save
          </Button>
        </Flex>
      </Card>
    </Box>
  );
};

export default Presets;
