import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import React, { use, useCallback, useEffect } from "react";
import Selector from "./Selector";
import usePresetStore from "../hooks/usePresetStore";
import useSocket from "../hooks/useWebSocket";

const Presets: React.FC = () => {
  const numPresets = usePresetStore((state) => state.presets.length);
  const selectedPreset = usePresetStore((state) => state.selectedPreset);
  const setSelectedPreset = usePresetStore((state) => state.setSelectedPreset);
  const savePresets = usePresetStore((state) => state.savePresets);
  const preset = usePresetStore((state) => state.presets[selectedPreset]);
  const { sendPreset } = useSocket();

  useEffect(() => {
    sendPreset(preset);
  }, [selectedPreset]);

  return (
    <Box flexGrow="1" style={{ padding: "0.5rem" }}>
      <Card style={{ height: "100%" }}>
        <Flex direction="column" gap="1rem">
          <Text color="cyan">Presets</Text>
          <Selector
            selected={selectedPreset}
            onSelect={setSelectedPreset}
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
