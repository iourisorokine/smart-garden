export enum EventName {
  PLANT = "PLANT",
  SEED = "SEED",
  CLEAR = "CLEAR",
  PRUNE = "PRUNE",
  HARVEST = "HARVEST",
}

export const eventNameTranslation = {
  [EventName.PLANT]: "Plantage des graines",
  [EventName.SEED]: "Semis en pleine terre",
  [EventName.CLEAR]: "Eclaircissement",
  [EventName.PRUNE]: "Elaguage",
  [EventName.HARVEST]: "Recolte",
};

export const indexToMonth = {
  0: "Janvier",
  1: "Fevrier",
  2: "Mars",
  3: "Avril",
  4: "Mai",
  5: "Juin",
  6: "Juillet",
  7: "Aout",
  8: "Septembre",
  9: "Octobre",
  10: "Novembre",
  11: "Decembre",
};

export interface KeyDate {
  eventName: EventName;
  description: string;
  earliest: number;
  latest: number;
  calculationMethod?: {
    differenceInDays: number;
    toEvent: EventName;
  };
}

export const exampleKeyDate = {
  eventName: EventName.PLANT,
  description:
    "Planter les graines dans un pot et laisser germer par 25 degres",
  earliest: 3,
  latest: 3,
};

export const exampleKeyDate2 = {
  eventName: EventName.SEED,
  description: "Mettre en terre",
  earliest: 4,
  latest: 4,
  calculationMethod: {
    differenceInDays: 30,
    toEvent: EventName.PLANT,
  },
};
