const express = require("express");
const router = express.Router();
const Parcel = require("../models/Parcel");

router.get("/", async (req, res) => {
  try {
    const allParcels = await Parcel.find();
    if (allParcels) {
      res.json(allParcels);
    }
  } catch (error) {
    res.json(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const foundParcel = await Parcel.findById(id);
    res.json(foundParcel);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newParcel = await Parcel.create({ name: "test parcel" });
    res.json(newParcel);
  } catch (error) {
    res.json(error);
  }
});

router.patch("/", async (req, res) => {
    try {
      const newParcel = await Parcel.create({ name: "test parcel" });
      res.json(newParcel);
    } catch (error) {
      res.json(error);
    }
  });

module.exports = router;
