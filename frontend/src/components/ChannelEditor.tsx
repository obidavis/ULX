import { Card, Flex } from "@radix-ui/themes";
import React from "react";
import Selector from "./Selector";
import ColourPicker from "./ColourPicker";
import VerticalSlider from "./VerticalSlider";


const ChannelEditor: React.FC = () => {
  return (
    
          <Card style={{ height: "100%" }} >
            <Flex direction="column" gap="1rem" >
              <label>Channels</label>
              <Selector selected={1} onSelect={() => {}} options={12}/>
              <Flex direction="row" gap="1rem">
                <ColourPicker onChange={() => {}} onCommit={() => {}}/>
                <VerticalSlider value={0} onChange={() => {}} onCommit={() => {}} />
              </Flex>
            </Flex>
          </Card>

  )
};

export default ChannelEditor;