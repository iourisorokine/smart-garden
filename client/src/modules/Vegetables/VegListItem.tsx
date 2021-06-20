import React, { CSSProperties, SetStateAction, Dispatch } from "react";

const vegListStyle = {
  height: 60,
  width: 80,
  margin: 10,
  padding: 10,
  border: "solid 2px #7a7",
  borderRadius: 8,
  display: "flex",
  flexDirection: "column" as CSSProperties["flexDirection"],
  alignItems: "center",
  justifyContent: "center",
};

interface VegListItemProps {
  vegName: string;
  vegEmoji?: string;
  setSelectedVeg: Dispatch<SetStateAction<string | null>>;
}

export const VegListItem: React.FC<VegListItemProps> = ({
  vegName,
  vegEmoji,
  setSelectedVeg,
}) => {
  const onClickHandler = () => {
    setSelectedVeg(vegName);
  };
  return (
    <div style={vegListStyle} onClick={onClickHandler}>
      {<h1 style={{ padding: 0, margin: 0 }}>{vegEmoji || "🍅"}</h1>}
      {!!vegName && (
        <p style={{ padding: 0, margin: 0, textAlign: "center" }}>{vegName}</p>
      )}
    </div>
  );
};
