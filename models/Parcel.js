const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlantOnParcelSchema = new Schema({
  typeOfVegetable: {
    type: Schema.Types.ObjectId,
    ref: "Vegetable",
    required: true,
  },
  seedDate: {
    type: Date,
    required: true,
  },
});

const ParcelSchema = new Schema({
  name: {
    type: String,
  },
  size: {
    lengthM: Number,
    widthM: Number,
    surfaceSQM: Number,
  },
  // plantsOnParcel: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "PlantOnParcel",
  //   },
  // ],
});

const Parcel = mongoose.model("Parcel", ParcelSchema);
module.exports = Parcel;
