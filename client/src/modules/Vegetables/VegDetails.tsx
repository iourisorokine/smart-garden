import React, { Dispatch, SetStateAction } from "react";
import axios from "axios";
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
  console.log(selectedVeg);
  const deleteVeg = () => {
    const id = selectedVeg._id;
    if (id) {
      axios.delete(`/:${id}`);
    }
  };
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
      {!!selectedVeg.spacing.betweenPlantsM && (
        <p>{`Espace entre les plants: ${selectedVeg.spacing.betweenPlantsM} m`}</p>
      )}
      {!!selectedVeg.spacing.betweenLinesM && (
        <p>{`Espace entre les lignes: ${selectedVeg.spacing.betweenLinesM} m`}</p>
      )}
      {!!selectedVeg.spacing.necessarySpaceSqm && (
        <p>{`Espace total par plant necessaire: ${selectedVeg.spacing.necessarySpaceSqm} m2`}</p>
      )}
      {!!selectedVeg.wateringFrequencyDays && (
        <p>{`Frequence d'arrosage: tous les ${selectedVeg.wateringFrequencyDays} jours`}</p>
      )}
      <div style={{ maxWidth: 500, margin: "auto" }}>
        {(selectedVeg.keyDates as []).map((item) => (
          <KeyDateDisplay date={item} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={deleteVeg}>supprimer</Button>
      </div>
    </div>
  );
};
