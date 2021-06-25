import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";

const emptyParcels = [{}, {}, {}, {}, {}, {}, {}, {}];

const parcelStyle = {
  margin: 4,
  border: "solid 1px black",
  borderRadius: 4,
  width: 120,
  height: 120,
};

export const Garden: React.FC = () => {
  const [parcelsToDisplay, setParcelsToDisplay] = useState([]);

  const loadParcels = async () => {
    const allParcels = await axios.get("api/parcel/");
    if (allParcels?.data?.length) {
      setParcelsToDisplay(allParcels.data);
    }
  };

  useEffect(() => {
    loadParcels();
  }, []);

  const addParcel = async () => {
    await axios.post("api/parcel/", {});
    loadParcels();
  };

  return (
    <div
      style={{
        padding: 24,
      }}>
      <h2>Jardin</h2>
      <p>
        Page en construction - ça va venir - avec plan des parcelles et contenus
        de chacune d'elles
      </p>
      <div>
        <Button variant="outlined" onClick={addParcel}>
          Ajouter Parcelle
        </Button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {parcelsToDisplay.map((item, index) => {
          return <div key={index} style={parcelStyle} />;
        })}
      </div>
    </div>
  );
};
