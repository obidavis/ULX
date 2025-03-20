import React from "react";
import { Theme, Button } from "@radix-ui/themes";

const App: React.FC = () => {
  return (
    <Theme accentColor="cyan" className="theme-container">
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>ULX</h1>
        <Button>Click me</Button>
      </div>
    </Theme>
  );
};

export default App;
