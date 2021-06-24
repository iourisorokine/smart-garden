import React from "react";
import { VegListItem as VegListItemStyledComponent } from "../../ui";


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
    <VegListItemStyledComponent variant="outlined" onClick={onClickHandler}>
      <h4 style={{ textTransform: "none" }}>+ Ajouter</h4>
    </VegListItemStyledComponent>
  );
};
