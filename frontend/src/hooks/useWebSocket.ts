import useWebSocket from "react-use-websocket";
import { ChannelState, Preset } from "../types";
import { useCallback } from "react";

const useSocket = () => {
  const url = "ws://localhost:8000/ws";
  const { sendMessage } = useWebSocket(url);
  const sendPreset = useCallback((preset: Preset) => {
    sendMessage(JSON.stringify(preset));
  }, [sendMessage]);
  const sendChannel = useCallback((channel: number, data: ChannelState) => {
    sendMessage(JSON.stringify({ channel, data }, (key, value) =>
      typeof value === "number" ? value.toFixed(2) : value
    ));
  }, [sendMessage]);
  return { sendPreset, sendChannel };
};

export default useSocket;