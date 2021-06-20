import React from "react";
import { Button } from "@material-ui/core";
import { eventNameTranslation, indexToMonth, KeyDate } from "./types";

export interface KeyDateDisplayProps {
  date: KeyDate;
  deleteKeyDate?: () => void;
}

export const KeyDateDisplay: React.FC<KeyDateDisplayProps> = ({
  date,
  deleteKeyDate,
}) => {
  const getMonthsIntervalDescription = (earliest: number, latest: number) => {
    const monthsArray = Object.values(indexToMonth);
    if (earliest === latest) {
      return `en ${monthsArray[earliest]}`;
    } else if (earliest < latest) {
      return `Entre ${monthsArray[earliest]} et ${monthsArray[latest]}`;
    }
    return "periode inconnue";
  };

  const getDifferenceToDateDescription = () => {
    if (date?.calculationMethod) {
      const event = eventNameTranslation[date.calculationMethod.toEvent];
      return `${date.calculationMethod.differenceInDays} jours apres le/la ${event}`;
    }
  };

  return (
    <div style={keyDateStyle}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div>{eventNameTranslation[date.eventName]}</div>
          <div
            style={{
              fontSize: 12,
            }}>
            {getMonthsIntervalDescription(date.earliest, date.latest)}
          </div>
          <div
            style={{
              fontSize: 12,
            }}>
            {date.description}
          </div>

          <div
            style={{
              fontSize: 12,
            }}>
            {date.calculationMethod ? getDifferenceToDateDescription() : null}
          </div>
        </div>
        {!!deleteKeyDate && (
          <Button style={{ height: 32, minWidth: 32 }} onClick={deleteKeyDate}>
            x
          </Button>
        )}
      </div>
    </div>
  );
};

const keyDateStyle = {
  margin: "6px 0 6px 0",
  padding: 12,
  border: "solid 1px #666",
  borderRadius: 4,
};
