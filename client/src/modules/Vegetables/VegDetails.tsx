import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@material-ui/core";
import { KeyDateDisplay } from "./KeyDateDisplay";

export interface VegDetailProps {
  selectedVeg: any;
  setSelectedVeg: Dispatch<SetStateAction<string | null>>;
}

export const VegDetails: React.FC<VegDetailProps> = ({
  selectedVeg,
  setSelectedVeg,
}) => {
  return (
    <div style={{ paddingLeft: 24, paddingRight: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 24,
        }}>
        <h3>Fiche {selectedVeg.name} detaillee</h3>
        <Button
          variant="outlined"
          onClick={() => setSelectedVeg(null)}
          style={{ margin: 12 }}>
          fermer
        </Button>
      </div>
      <p>{selectedVeg.description}</p>
      {!!selectedVeg.spacingBetweenPlants && (
        <p>{`Espace entre les plants: ${selectedVeg.spacingBetweenPlants} m`}</p>
      )}
      {!!selectedVeg.spacingBetweenLines && (
        <p>{`Espace entre les lignes: ${selectedVeg.spacingBetweenLines} m`}</p>
      )}
      {!!selectedVeg.necessarySpacePerPlant && (
        <p>{`Espace total par plant necessaire: ${selectedVeg.necessarySpacePerPlant} m`}</p>
      )}
      {!!selectedVeg.wateringFrequency && (
        <p>{`Frequence d'arrosage: tous les${selectedVeg.wateringFrequency} jours`}</p>
      )}
      <div>
        {(selectedVeg.keyDates as []).map((item) => (
          <KeyDateDisplay date={item} />
        ))}
      </div>
    </div>
  );
};
