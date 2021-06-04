import React, { Dispatch, SetStateAction } from "react";
import { Content } from "../../ui";

export interface VegDetailProps {
  selectedVeg: string;
  setSelectedVeg: Dispatch<SetStateAction<string | null>>;
}

export const VegDetails: React.FC<VegDetailProps> = ({
  selectedVeg,
  setSelectedVeg,
}) => {
  return (
    <Content flexDirection="row" justifyContent="space-between">
      <h3>Fiche {selectedVeg} detaillee</h3>
      <div onClick={() => setSelectedVeg(null)}>
        <h3>x</h3>
      </div>
    </Content>
  );
};
