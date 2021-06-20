import React from "react";
import { Button } from "@material-ui/core";

const vegListStyle = {
  minHeight: 60,
  minWidth: 80,
  margin: 10,
  padding: 10,
  borderColor: "#7a7",
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

interface AddNewVegButtonProps {
  createNewVegHandler: () => void;
}

export const AddNewVegButton: React.FC<AddNewVegButtonProps> = ({
  createNewVegHandler,
}) => {
  const onClickHandler = () => {
    createNewVegHandler();
  };
  return (
    <Button variant="outlined" style={vegListStyle} onClick={onClickHandler}>
      <h4 style={{ textTransform: "none" }}>+ Ajouter</h4>
    </Button>
  );
};
