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

interface VegListItemProps {
  vegName: string;
  setSelectedVeg: Dispatch<SetStateAction<string | null>>;
}

export const VegListItem: React.FC<VegListItemProps> = ({
  vegName,
  setSelectedVeg,
}) => {
  const onClickHandler = () => {
    setSelectedVeg(vegName);
  };
  return (
    <div style={vegListStyle} onClick={onClickHandler}>
      {!!vegName && <h1>{vegName}</h1>}
    </div>
  );
};
