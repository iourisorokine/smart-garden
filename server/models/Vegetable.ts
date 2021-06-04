import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

enum EventName {
  PLANTING = "PLANTING", // plantage
  SEED = "SEED", // semis
  CLEAR = "CLEAR", // eclaircissement (retirer les pousses)
  CUTTING = "CUTTING", // taille
  HARVEST = "HARVEST", // recolte
}

const KeyDateSchema = new Schema({
  eventName: EventName,
  description: String,
  earliest: Date,
  latest: Date,
  calculationMethod: {
    differenceInDays: Number,
    toEvent: {
      type: String,
      enum: Object.values(EventName),
    },
  },
});

const VegetableSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  emoji: {
    type: String,
  },
  spacing: {
    betweenPlantsM: Number,
    betweenLinesM: Number,
    necessarySpaceSqM: Number,
  },
  harvest: {
    minPieces: Number,
    maxPieces: Number,
    minKilos: Number,
    maxKilos: Number,
  },
  keyDates: {
    type: [KeyDateSchema],
  },
  wateringFrequencyDays: Number,
});

export const Vegetable = mongoose.model("Vegetable", VegetableSchema);
