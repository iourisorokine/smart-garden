import React from "react";
import axios from "axios";
import { Button } from "@material-ui/core";

const emptyParcels = [{}, {}, {}, {}, {}, {}, {}, {}];

const parcelStyle = {
  margin: 4,
  border: "solid 1px black",
  borderRadius: 4,
  width: 200,
  height: 200,
};

export const Garden: React.FC = () => {
  const addParcel = async () => {
    const response = await axios.post("api/parcel/", {});
    console.log(response);
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
          Ajouter
        </Button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {emptyParcels.map((item) => {
          return <div style={parcelStyle} />;
        })}
      </div>
    </div>
  );
};
