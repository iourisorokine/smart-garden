import React, { SetStateAction, Dispatch } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Select,
} from "@material-ui/core";
import { EventName, eventNameTranslation, indexToMonth } from "../types";

export interface AddKeyDateFormProps {
  newKeyDateEventType: EventName;
  setNewKeyDateEventType: Dispatch<SetStateAction<EventName>>;
  newEventDescription: string;
  setNewEventDescription: Dispatch<SetStateAction<string>>;
  earliestDateMonth: number;
  setEarliestDateMonth: Dispatch<SetStateAction<number>>;
  latestDateMonth: number;
  setLatestDateMonth: Dispatch<SetStateAction<number>>;
  numberDaysLater: number;
  setNumberDaysLater: Dispatch<SetStateAction<number>>;
  referenceEventForKeyDate: EventName;
  setReferenceEventForKeyDate: Dispatch<SetStateAction<EventName>>;
  addKeyDate: () => void;
  setIsAddKeyDateView: Dispatch<SetStateAction<boolean>>;
}

export const AddKeyDateForm: React.FC<AddKeyDateFormProps> = ({
  newKeyDateEventType,
  setNewKeyDateEventType,
  newEventDescription,
  setNewEventDescription,
  earliestDateMonth,
  setEarliestDateMonth,
  latestDateMonth,
  setLatestDateMonth,
  numberDaysLater,
  setNumberDaysLater,
  referenceEventForKeyDate,
  setReferenceEventForKeyDate,
  addKeyDate,
  setIsAddKeyDateView,
}) => {
  console.log(earliestDateMonth, latestDateMonth);
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

      {!!numberDaysLater && (
        <FormControl>
          <InputLabel id="helper16" htmlFor="my-input16">
            jours apres l'évennement suivant:
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
                <option key={eventName} value={eventName}>
                  {eventNameTranslation[eventName]}
                </option>
              );
            })}
          </Select>
        </FormControl>
      )}
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
