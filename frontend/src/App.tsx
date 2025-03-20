import React from "react";
import Title from "./components/Title";
import Presets from "./components/Presets";
import ChannelEditor from "./components/ChannelEditor";
import { Flex, Theme } from "@radix-ui/themes";

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
      <Flex direction="row" width="100vw" >
        <Flex direction="column" width="50%" flexGrow="1">
          <Title />
          <Presets />
        </Flex>
        <Flex width="50%" flexGrow="1" style={{ padding: "0.5rem" }} >
          <ChannelEditor />
        </Flex>
      </Flex>
    </ThemeWrapper>
  );
};

export default App;
