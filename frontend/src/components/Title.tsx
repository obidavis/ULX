import { Box, Text } from "@radix-ui/themes";
import React from "react";

const Title: React.FC = () => {
  return (
    <Box style={{ padding: "1rem" }}>
      <Text color="cyan" size="9">ULX</Text>
      <br />
      <Text color="cyan">Ultra Light (& sound) dmX Controller</Text>
    </Box>
  );
};

export default Title;
