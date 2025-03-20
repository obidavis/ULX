import React, { use, useEffect } from "react";
import Title from "./components/Title";
import Presets from "./components/Presets";
import ChannelEditor from "./components/ChannelEditor";
import { Box, Flex, Theme } from "@radix-ui/themes";
import ChannelVisualiser from "./components/ChannelVisualiser";
import usePresetStore from "./hooks/usePresetStore";

const ThemeWrapper = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Theme accentColor="cyan" radius="large" appearance="dark" >
      {children}
      {/* <ThemePanel /> */}
    </Theme>
  )
}


const App = () => {
  const loadPresets = usePresetStore((state) => state.loadPresets);
  const initPresets = usePresetStore((state) => state.initPresets);
  useEffect(() => {
    loadPresets().then((initPresets));
  }, []);
  return (
    <ThemeWrapper>
      <Flex direction="column" height="100vh" >
        <Flex direction="row" width="100vw" >
          <Flex direction="column" width="50%" flexGrow="1">
            <Title />
            <Presets />
          </Flex>
          <Flex minWidth="60%" flexGrow="1" style={{ padding: "0.5rem" }} >
            <ChannelEditor />
          </Flex>
        </Flex>
        <Box height="40%" style={{ padding: "1rem" }}>
          <ChannelVisualiser />
        </Box>
      </Flex>
    </ThemeWrapper>
  );
};

export default App;
