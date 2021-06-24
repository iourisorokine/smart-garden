import React, { useState, useEffect } from "react";
import { Content } from "../../../ui";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Select,
} from "@material-ui/core";
import { EventName, KeyDate } from "../types";
import { KeyDateDisplay } from "../KeyDateDisplay";
import { AddKeyDateForm } from "./AddKeyDateForm";

export interface AddKeyDateArgs {
  newKeyDateEventType: EventName;
  newEventDescription: string;
  earliestDateMonth: number;
  latestDateMonth: number;
  numberDaysLater?: number;
  referenceEventForKeyDate: EventName;
}

export interface AddNewVegFormProps {
  setIsCreateVegView: (v: React.SetStateAction<boolean>) => void;
}

export const AddNewVegForm: React.FC<AddNewVegFormProps> = ({
  setIsCreateVegView,
}) => {
  const [vegName, setVegName] = useState<string>("");
  const [vegDescription, setVegDescription] = useState<string>("");
  const [vegEmoji, setVegEmoji] = useState<string>("");
  const [spacingBetweenPlants, setSpacingBetweenPlants] = useState("0");
  const [spacingBetweenLines, setSpacingBetweenLines] = useState("0");
  const [necessarySpacePerPlant, setNecessarySpacePerPlant] = useState("0");
  const [minHarvest, setMinHarvest] = useState("0");
  const [maxHarvest, setMaxHarvest] = useState("0");
  const [wateringFrequency, setWateringFrequency] = useState("0");
  const [keyDates, setKeyDates] = useState<KeyDate[]>([]);
  const [isAddKeyDateView, setIsAddKeyDateView] = useState<boolean>(false);

  useEffect(() => {
    const calculatedSpacePerPlant = (
      Number(spacingBetweenPlants) * Number(spacingBetweenLines)
    ).toFixed(2);
    setNecessarySpacePerPlant(calculatedSpacePerPlant);
  }, [spacingBetweenPlants, spacingBetweenLines]);

  const handleSpacingBetweenLines = (e: any) => {
    if (e) {
      setSpacingBetweenLines(e.target.value);
    }
  };

  const handleSpacingBetweenPlants = (e: any) => {
    if (e) {
      setSpacingBetweenPlants(e.target.value);
    }
  };

  const addKeyDate = ({
    newKeyDateEventType,
    newEventDescription,
    earliestDateMonth,
    latestDateMonth,
    numberDaysLater,
    referenceEventForKeyDate,
  }: AddKeyDateArgs) => {
    const calculationMethod = !!numberDaysLater
      ? {
          differenceInDays: numberDaysLater,
          toEvent: referenceEventForKeyDate,
        }
      : undefined;
    const newKeyDate = {
      eventName: newKeyDateEventType,
      description: newEventDescription,
      earliest: earliestDateMonth,
      latest: latestDateMonth,
      calculationMethod,
    };
    const updatedKeyDates = keyDates.concat([newKeyDate]);
    setKeyDates(updatedKeyDates);
    setIsAddKeyDateView(false);
    return;
  };

  const deleteKeyDate = (index: number) => {
    const newDates = keyDates;
    newDates.splice(index, 1);
    setKeyDates([...newDates]);
  };

  const createVegDoc = async () => {
    await axios.post("api/vegetable", {
      name: vegName,
      description: vegDescription,
      emoji: vegEmoji,
      spacing: {
        betweenPlantsM: Number(spacingBetweenPlants),
        betweenLinesM: Number(spacingBetweenLines),
        necessarySpaceSqm: Number(necessarySpacePerPlant),
      },
      harvest: {
        minKilos: Number(minHarvest),
        maxKilos: Number(maxHarvest),
      },
      wateringFrequencyDays: Number(wateringFrequency),
      keyDates,
    });
    setIsCreateVegView(false);
  };

  const AddKeyDateButton: React.FC = () => (
    <Button variant="outlined" onClick={() => setIsAddKeyDateView(true)}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>{"+ Ajouter une date clé"}</div>
      </div>
    </Button>
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 24,
        }}>
        <h3>Créer une fiche Legume</h3>
        <Button
          variant="outlined"
          onClick={() => setIsCreateVegView(false)}
          style={{ margin: 12 }}>
          x
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 500,
          margin: "auto",
        }}>
        <FormControl>
          <InputLabel htmlFor="my-input">Denomination du legume</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            value={vegName}
            onChange={(e) => setVegName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <InputLabel id="helper2" htmlFor="my-input2">
            Emoji
          </InputLabel>
          <Select
            value={vegEmoji}
            onChange={(e) =>
              setVegEmoji((e.target.value as unknown) as string)
            }>
            {[
              "",
              "🌶",
              "🌽",
              "🍅",
              "🥕",
              "🍆",
              "🥬",
              "🧅",
              "🥦",
              "🍇",
              "🥔",
              "🥒",
              "🧄",
              " 🍉",
              "🍈",
            ].map((emoji) => {
              return <option value={emoji}>{emoji}</option>;
            })}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input111">Description du legume</InputLabel>
          <Input
            id="my-input111"
            aria-describedby="my-helper-text111"
            value={vegDescription}
            onChange={(e) => setVegDescription(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input3">
            Espace entre les plants (m)
          </InputLabel>
          <Input
            id="my-input3"
            aria-describedby="my-helper-text3"
            type="number"
            value={spacingBetweenPlants}
            onChange={handleSpacingBetweenPlants}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input4">
            Espace entre les lignes (m)
          </InputLabel>
          <Input
            id="my-input4"
            aria-describedby="my-helper-text4"
            type="number"
            value={spacingBetweenLines}
            onChange={handleSpacingBetweenLines}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input5">
            Espace par plant necessaire (m2)
          </InputLabel>
          <Input
            id="my-input5"
            aria-describedby="my-helper-text5"
            type="number"
            value={necessarySpacePerPlant}
            onChange={(e) => setNecessarySpacePerPlant(e.target.value)}
          />
        </FormControl>
        <Content flexDirection="row">
          <h4>Recolte par plant (kg)</h4>
          <div style={{ paddingLeft: 16, paddingRight: 16 }}>
            <FormControl>
              <InputLabel htmlFor="my-input8">Min</InputLabel>
              <Input
                id="my-input8"
                aria-describedby="my-helper-text8"
                type="number"
                value={minHarvest}
                onChange={(e) => setMinHarvest(e.target.value)}
              />
            </FormControl>
          </div>
          <FormControl>
            <InputLabel htmlFor="my-input9">Max</InputLabel>
            <Input
              id="my-input9"
              aria-describedby="my-helper-text9"
              type="number"
              value={maxHarvest}
              onChange={(e) => setMaxHarvest(e.target.value)}
            />
          </FormControl>
        </Content>
        <FormControl>
          <InputLabel htmlFor="my-input10">
            Arroser tous les ... jours
          </InputLabel>
          <Input
            id="my-input10"
            aria-describedby="my-helper-text10"
            type="number"
            value={wateringFrequency}
            onChange={(e) => setWateringFrequency(e.target.value)}
          />
        </FormControl>
        <h4>Dates clé:</h4>
        {isAddKeyDateView ? (
          <AddKeyDateForm
            keyDates={keyDates}
            addKeyDate={addKeyDate}
            setIsAddKeyDateView={setIsAddKeyDateView}
          />
        ) : (
          <AddKeyDateButton />
        )}
        {keyDates.map((date, index) => (
          <KeyDateDisplay
            key={index}
            date={date}
            deleteKeyDate={() => deleteKeyDate(index)}
          />
        ))}
        <div style={{ padding: 24, margin: "auto" }}>
          <Button onClick={createVegDoc} variant="contained">
            Creer
          </Button>
        </div>
      </div>
    </div>
  );
};
