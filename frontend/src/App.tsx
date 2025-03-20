import React from "react";
import Title from "./components/Title";
import Presets from "./components/Presets";
import ChannelEditor from "./components/ChannelEditor";
import { Box, Card, Flex, Theme } from "@radix-ui/themes";
import ChannelVisualiser from "./components/ChannelVisualiser";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Theme accentColor="blue" radius="large" appearance="dark" >
      {children}
      {/* <ThemePanel /> */}
    </Theme>
  )
}


const App = () => {
  return (
    <ThemeWrapper>
      <Flex direction="column" height="100vh" >
        <Flex direction="row" width="100vw" >
          <Flex direction="column" width="50%" flexGrow="1">
            <Title />
            <Presets />
          </Flex>
          <Flex width="66%" flexGrow="1" style={{ padding: "0.5rem" }} >
            <ChannelEditor />
          </Flex>
        </Flex>
        <Box height="30%" style={{ padding: "1rem" }}>
          <ChannelVisualiser />
        </Box>
      </Flex>
    </ThemeWrapper>
  );
};

export default App;
