import React, { useState } from "react";
import { VegListItem } from "./VegListItem";
import { AddNewVegButton } from "./AddNewVegButton";
import { VegDetails } from "./VegDetails";

const vegListStyle = {
  padding: 20,
  display: "flex",
};

const vegetablesToDisplay = ["", "🌶", "🌽", "🍅", "🥕", "🍆"];

export const Vegetables: React.FC = () => {
  const [selectedVeg, setSelectedVeg] = useState<string | null>(null);
  const [isCreateVegView, setIsCreateVegView] = useState<boolean>(false);

  const createNewVeg = () => setIsCreateVegView(true);
  const vegetablesList = vegetablesToDisplay.map((item, index) => {
    if (index === 0)
      return <AddNewVegButton createNewVegHandler={createNewVeg} />;
    return <VegListItem vegName={item} setSelectedVeg={setSelectedVeg} />;
  });
  return (
    <div>
      {isCreateVegView ? (
        <div>
          <h3>Creer Nouvelle Fiche Legume</h3>
          <div onClick={() => setIsCreateVegView(false)}>
            <h3>fermer</h3>
          </div>
        </div>
      ) : !selectedVeg ? (
        <div style={vegListStyle}>{vegetablesList}</div>
      ) : (
        <VegDetails selectedVeg={selectedVeg} setSelectedVeg={setSelectedVeg} />
      )}
    </div>
  );
};
