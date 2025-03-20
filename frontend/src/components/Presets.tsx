import { Box, Button, Card, Flex } from "@radix-ui/themes";
import React from "react";
import Selector from "./Selector";


const Presets: React.FC = () => {
  const loading = false;
  const handleSelect = () => {};
  const handleSave = () => {};
  const numPresets = 10;
  const selected = 1;
  return (
    <Box flexGrow="1" style={{ padding: "0.5rem" }}>
      <Card style={{ height: "100%" }}>
        <Flex direction="column" gap="1rem">
          <label>Presets</label>
          <Selector selected={selected} onSelect={handleSelect} options={numPresets} />
          <Button variant="outline" onClick={handleSave} loading={loading}>Save</Button>
        </Flex>
      </Card>
    </Box>
  );
};

export default Presets;
