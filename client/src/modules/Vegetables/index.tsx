import React, { useState, useEffect } from "react";
import axios from "axios";
import { VegListItem } from "./VegListItem";
import { AddNewVegButton } from "./AddNewVegButton";
import { VegDetails } from "./VegDetails";
import { AddNewVegForm } from "./AddNewVegetable/AddNewVegForm";

const vegListStyle = {
  padding: 20,
  display: "flex",
};

export const Vegetables: React.FC = () => {
  const [selectedVeg, setSelectedVeg] = useState<any>(null);
  const [isCreateVegView, setIsCreateVegView] = useState<boolean>(false);
  const [vegetablesToDisplay, setVegetablesToDisplay] = useState<any[]>([""]);

  useEffect(() => {
    const loadVeges = async () => {
      try {
        const { data } = await axios.get("/api/vegetable");
        if (data) {
          setVegetablesToDisplay(["", ...data]);
        }
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadVeges();
  }, [isCreateVegView]);

  const createNewVeg = () => setIsCreateVegView(true);
  const vegetablesList = vegetablesToDisplay.map((item, index) => {
    const selectCurrentVeg = () => {
      setSelectedVeg(item);
    };
    if (index === 0)
      return <AddNewVegButton createNewVegHandler={createNewVeg} />;
    return (
      <VegListItem vegName={item.name} selectCurrentVeg={selectCurrentVeg} />
    );
  });
  return (
    <div>
      {isCreateVegView ? (
        <AddNewVegForm setIsCreateVegView={setIsCreateVegView} />
      ) : !selectedVeg ? (
        <div style={vegListStyle}>{vegetablesList}</div>
      ) : (
        <VegDetails selectedVeg={selectedVeg} setSelectedVeg={setSelectedVeg} />
      )}
    </div>
  );
};
