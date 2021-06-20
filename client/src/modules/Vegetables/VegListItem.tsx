import React, { CSSProperties, SetStateAction, Dispatch } from "react";
import { Button } from "@material-ui/core";

export const vegListStyle = {
  minHeight: 60,
  minWidth: 80,
  margin: 10,
  padding: 10,
  borderColor: "#7a7",
  borderRadius: 4,
  display: "flex",
  flexDirection: "column" as CSSProperties["flexDirection"],
  alignItems: "center",
  justifyContent: "center",
};

interface VegListItemProps {
  vegName: string;
  vegEmoji?: string;
  selectCurrentVeg: () => void;
}

export const VegListItem: React.FC<VegListItemProps> = ({
  vegName,
  vegEmoji,
  selectCurrentVeg,
}) => {
  return (
    <Button variant="outlined" style={vegListStyle} onClick={selectCurrentVeg}>
      <div>
        {<h1 style={{ padding: 0, margin: 0 }}>{vegEmoji || "🍅"}</h1>}{" "}
        {!!vegName && (
          <p
            style={{
              padding: 0,
              margin: 0,
              textAlign: "center",
              textTransform: "none",
            }}>
            {vegName}
          </p>
        )}
      </div>
    </Button>
  );
};
