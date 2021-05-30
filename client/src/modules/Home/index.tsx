import React, { useState } from "react";
import { Vegetables } from "../Vegetables";
import { Garden } from "../Garden";

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

const buttonStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  margin: 20,
  padding: "0px 10px",
  border: "solid 2px #7a7",
  borderRadius: 8,
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
      <div style={{ display: "flex", flex: 1 }}>
        <div style={buttonStyle} onClick={() => setView(views.VEGES)}>
          <h2>Legumes</h2>
        </div>
        <div style={buttonStyle} onClick={() => setView(views.GARDEN)}>
          <h2>Jardin</h2>
        </div>
      </div>
      {view === views.VEGES && <Vegetables />}
      {view === views.GARDEN && <Garden />}
    </div>
  );
};
