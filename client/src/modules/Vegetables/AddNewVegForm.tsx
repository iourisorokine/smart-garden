import React, { useState, useEffect, SetStateAction } from "react";
import { Content } from "../../ui";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Select,
} from "@material-ui/core";
import {
  EventName,
  eventNameTranslation,
  indexToMonth,
  KeyDate,
} from "./types";
import { KeyDateDisplay } from "./KeyDate";

export interface AddNewVegFormProps {
  setIsCreateVegView: (v: React.SetStateAction<boolean>) => void;
}

export const AddNewVegForm: React.FC<AddNewVegFormProps> = ({
  setIsCreateVegView,
}) => {
  const [vegName, setVegName] = useState<string>("");
  const [vegEmoji, setVegEmoji] = useState<string>("");
  const [spacingBetweenPlants, setSpacingBetweenPlants] = useState("0");
  const [spacingBetweenLines, setSpacingBetweenLines] = useState("0");
  const [necessarySpacePerPlant, setNecessarySpacePerPlant] = useState("0");
  const [minHarvest, setMinHarvest] = useState("0");
  const [maxHarvest, setMaxHarvest] = useState("0");
  const [wateringFrequency, setWateringFrequency] = useState("0");
  const [keyDates, setKeyDates] = useState<KeyDate[]>([]);
  const [isAddKeyDateView, setIsAddKeyDateView] = useState<boolean>(false);

  const [newKeyDateEventType, setNewKeyDateEventType] = useState<EventName>(
    EventName.SEED
  );
  const [newEventDescription, setNewEventDescription] = useState<string>("");
  const [earliestDateMonth, setEarliestDateMonth] = useState(0);
  const [latestDateMonth, setLatestDateMonth] = useState(0);
  const [numberDaysLater, setNumberDaysLater] = useState(0);
  const [referenceEventForKeyDate, setReferenceEventForKeyDate] = useState(
    EventName.SEED
  );

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

  const addKeyDate = () => {
    const newKeyDate = {
      eventName: newKeyDateEventType,
      description: newEventDescription,
      earliest: earliestDateMonth,
      latest: latestDateMonth,
      calculationMethod: {
        differenceInDays: numberDaysLater,
        toEvent: referenceEventForKeyDate,
      },
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
    const newlyCreatedVeg = await axios.post("api/vegetable", {
      name: vegName,
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

  const AddKeyDateForm: React.FC = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: 12,
          padding: 12,
          border: "1px black solid",
          borderRadius: 4,
        }}>
        <h4>Nouvelle date clé:</h4>
        <FormControl>
          <InputLabel id="helper10" htmlFor="my-input10">
            Type:
          </InputLabel>
          <Select
            onChange={(e) =>
              setNewKeyDateEventType(
                e.target.value as SetStateAction<EventName>
              )
            }
            value={newKeyDateEventType}>
            {[
              EventName.SEED,
              EventName.PLANT,
              EventName.PRUNE,
              EventName.CLEAR,
              EventName.HARVEST,
            ].map((eventName) => {
              return (
                <option value={eventName}>
                  {eventNameTranslation[eventName]}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input11">Description:</InputLabel>
          <Input
            id="my-input11"
            aria-describedby="my-helper-text11"
            value={newEventDescription}
            onChange={(e) => setNewEventDescription(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <InputLabel id="helper12" htmlFor="my-input12">
            Au plus tôt en:
          </InputLabel>
          <Select
            onChange={(e) => setEarliestDateMonth(Number(e.target.value))}
            value={earliestDateMonth}>
            {Object.values(indexToMonth).map((month, index) => {
              return <option value={index}>{month}</option>;
            })}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="helper12" htmlFor="my-input12">
            Au plus tard en:
          </InputLabel>
          <Select
            onChange={(e) => setLatestDateMonth(Number(e.target.value))}
            value={latestDateMonth}>
            {Object.values(indexToMonth).map((month, index) => {
              return <option value={index}>{month}</option>;
            })}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input13">
            {"(Optionnel) nombre de jours"}
          </InputLabel>
          <Input
            id="my-input13"
            aria-describedby="my-helper-text13"
            type="number"
            value={numberDaysLater}
            onChange={(e) => setNumberDaysLater(Number(e.target.value))}
          />
        </FormControl>
        <FormControl>
          <InputLabel id="helper10" htmlFor="my-input10">
            apres l'évennement suivant:
          </InputLabel>
          <Select
            onChange={(e) =>
              setReferenceEventForKeyDate(
                e.target.value as SetStateAction<EventName>
              )
            }
            value={referenceEventForKeyDate}>
            {[
              EventName.SEED,
              EventName.PLANT,
              EventName.PRUNE,
              EventName.CLEAR,
              EventName.HARVEST,
            ].map((eventName) => {
              return (
                <option value={eventName}>
                  {eventNameTranslation[eventName]}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <div style={{ display: "flex", justifyContent: "center", padding: 12 }}>
          <Button variant="outlined" onClick={addKeyDate}>
            Ajouter
          </Button>
          <Button variant="outlined" onClick={() => setIsAddKeyDateView(false)}>
            Annuler
          </Button>
        </div>
      </div>
    );
  };

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
          fermer
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
            {["", "🌶", "🌽", "🍅", "🥕", "🍆"].map((emoji) => {
              return <option value={emoji}>{emoji}</option>;
            })}
          </Select>
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
        {isAddKeyDateView ? <AddKeyDateForm /> : <AddKeyDateButton />}
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
