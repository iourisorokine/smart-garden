import React, { useState } from "react";
import { Vegetables } from "../Vegetables";
import { Garden } from "../Garden";
import { Button } from "evergreen-ui";

const wrapperStyle = {
  maxWidth: 900,
  margin: "auto",
  display: "flex",
  flexDirection: "column" as "column",
  border: "solid 1px #aaa",
};

const headerStyle = {
  padding: 20,
};

const views = {
  VEGES: "VEGES",
  GARDEN: "GARDEN",
};

export const Home: React.FC = () => {
  const [view, setView] = useState(views.VEGES);
  return (
    <div style={wrapperStyle}>
      <div style={headerStyle}>
        <h1>Welcome to Smart Garden</h1>
      </div>
      <div style={{ display: "flex", flex: 1, padding: 10 }}>
        <div style={{ padding: 10 }}>
          <Button
            size="large"
            appearance={view === views.VEGES ? "primary" : "default"}
            border="greenyellow"
            // background="green"
            onClick={() => setView(views.VEGES)}>
            <h3>Legumes</h3>
          </Button>
        </div>
        <div style={{ padding: 10 }}>
          <Button
            size="large"
            appearance={view === views.GARDEN ? "primary" : "default"}
            border="greenyellow"
            // background="green"
            onClick={() => setView(views.GARDEN)}>
            <h3>Jardin</h3>
          </Button>
        </div>
      </div>
      {view === views.VEGES && <Vegetables />}
      {view === views.GARDEN && <Garden />}
    </div>
  );
};
