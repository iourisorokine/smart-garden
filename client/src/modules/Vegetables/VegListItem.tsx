import React from "react";
import { VegListItem as VegListItemStyledComponent } from "../../ui";

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
    <VegListItemStyledComponent
      variant="outlined"
      onClick={selectCurrentVeg}>
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
    </VegListItemStyledComponent>
  );
};
