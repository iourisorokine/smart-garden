import React, { useState, SetStateAction, Dispatch } from "react";
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
} from "../types";
import { AddKeyDateArgs } from "./AddNewVegForm";

export interface AddKeyDateFormProps {
  keyDates: KeyDate[];
  addKeyDate: (args: AddKeyDateArgs) => void;
  setIsAddKeyDateView: Dispatch<SetStateAction<boolean>>;
}

export const AddKeyDateForm: React.FC<AddKeyDateFormProps> = ({
  keyDates,
  addKeyDate,
  setIsAddKeyDateView,
}) => {
  const [newKeyDateEventType, setNewKeyDateEventType] = useState<EventName>(
    EventName.SEED
  );
  const [newEventDescription, setNewEventDescription] = useState<string>("");
  const [earliestDateMonth, setEarliestDateMonth] = useState(0);
  const [latestDateMonth, setLatestDateMonth] = useState(0);
  const [numberDaysLater, setNumberDaysLater] = useState(0);
  const [referenceEventForKeyDate, setReferenceEventForKeyDate] = useState<
    EventName
  >(EventName.PLANT);

  const handleOnAddKeyDateClick = () => {
    addKeyDate({
      newKeyDateEventType,
      newEventDescription,
      earliestDateMonth,
      latestDateMonth,
      numberDaysLater,
      referenceEventForKeyDate,
    });
  };

  const alreadyCreatedEvents = keyDates.length
    ? keyDates.map((date) => date.eventName)
    : [];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 12,
        border: "1px #777 solid",
        borderRadius: 4,
      }}>
      <h4>Nouvelle date clé:</h4>
      <FormControl>
        <InputLabel id="helper11" htmlFor="my-input11">
          Type:
        </InputLabel>
        <Select
          onChange={(e) =>
            setNewKeyDateEventType(e.target.value as SetStateAction<EventName>)
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
              <option value={eventName} key={eventName}>
                {eventNameTranslation[eventName]}
              </option>
            );
          })}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input12">Description:</InputLabel>
        <Input
          id="my-input12"
          aria-describedby="my-helper-text12"
          type="text"
          value={newEventDescription}
          onChange={(e) => setNewEventDescription(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel id="helper13" htmlFor="my-input13">
          Au plus tôt en:
        </InputLabel>
        <Select
          onChange={(e) => setEarliestDateMonth(Number(e.target.value))}
          value={earliestDateMonth}>
          {Object.values(indexToMonth).map((month, index) => {
            return (
              <option key={index} value={index}>
                {month}
              </option>
            );
          })}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="helper14" htmlFor="my-input14">
          Au plus tard en:
        </InputLabel>
        <Select
          onChange={(e) => setLatestDateMonth(Number(e.target.value))}
          value={latestDateMonth}>
          {Object.values(indexToMonth).map((month, index) => {
            return (
              <option key={index} value={index}>
                {month}
              </option>
            );
          })}
        </Select>
      </FormControl>
      {!!keyDates.length && (
        <FormControl>
          <InputLabel htmlFor="my-input15">
            {"(Optionnel) nombre de jours apres un autre évennement"}
          </InputLabel>
          <Input
            id="my-input15"
            aria-describedby="my-helper-text15"
            type="number"
            value={numberDaysLater}
            onChange={(e) => setNumberDaysLater(Number(e.target.value))}
          />
        </FormControl>
      )}

      {!!numberDaysLater && (
        <FormControl>
          <InputLabel id="helper16" htmlFor="my-input16">
            jours apres l'évennement suivant:
          </InputLabel>
          <Select
            onChange={(e) =>
              setReferenceEventForKeyDate(
                (e.target.value as unknown) as EventName
              )
            }
            value={referenceEventForKeyDate}>
            {alreadyCreatedEvents.map((eventName, index) => {
              return (
                <option key={index} value={eventName}>
                  {eventNameTranslation[eventName]}
                </option>
              );
            })}
          </Select>
        </FormControl>
      )}
      <div style={{ display: "flex", justifyContent: "center", padding: 12 }}>
        <Button variant="outlined" onClick={handleOnAddKeyDateClick}>
          Ajouter
        </Button>
        <Button variant="outlined" onClick={() => setIsAddKeyDateView(false)}>
          Annuler
        </Button>
      </div>
    </div>
  );
};
