import React, { useState } from "react";
import { VegListItem } from "./VegListItem";

const vegListStyle = {
  padding: 20,
  display: "flex",
};

const vegetablesToDisplay = ["+ Add", "🌶", "🌽", "🍅", "🥕", "🍆"];

export const Vegetables: React.FC = () => {
  const [selectedVeg, setSelectedVeg] = useState<string | null>(null);
  const vegetablesList = vegetablesToDisplay.map((item) => (
    <VegListItem vegName={item} setSelectedVeg={setSelectedVeg} />
  ));
  return (
    <div>
      {!selectedVeg ? (
        <div style={vegListStyle}>{vegetablesList}</div>
      ) : (
        <div style={vegListStyle}>
          <h3>Fiche {selectedVeg} detaillee</h3>
          <div onClick={() => setSelectedVeg(null)}>
            <h3>fermer</h3>
          </div>
        </div>
      )}
    </div>
  );
};
