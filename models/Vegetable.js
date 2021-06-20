const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const EventName = {
//   PLANTING = "PLANTING", // plantage
//   SEED = "SEED", // semis en pleine terre
//   CLEAR = "CLEAR", // eclaircissement (retirer les pousses)
//   PRUNING = "PRUNING", // taille
//   HARVEST = "HARVEST", // recolte
// }

const eventNames = ["PLANT", "SEED", "CLEAR", "PRUNE", "HARVEST"];

const KeyDateSchema = new Schema({
  eventName: {
    type: String,
    enum: eventNames,
  },
  description: String,
  earliest: Date,
  latest: Date,
  calculationMethod: {
    differenceInDays: Number,
    toEvent: {
      type: String,
      enum: eventNames,
      // enum: Object.values(EventName),
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

const Vegetable = mongoose.model("Vegetable", VegetableSchema);
module.exports = Vegetable;
