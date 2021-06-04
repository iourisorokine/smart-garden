import React, { SetStateAction, Dispatch } from "react";

const vegListStyle = {
  height: 60,
  width: 80,
  margin: 10,
  padding: 10,
  border: "solid 2px #7a7",
  borderRadius: 8,
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
    <div style={vegListStyle} onClick={onClickHandler}>
      <h2>+ Add</h2>
    </div>
  );
};
