const express = require("express");
const router = express.Router();
const Vegetable = require("../models/Vegetable");

router.get("/", async (req, res) => {
  try {
    const allVeges = await Vegetable.find();
    if (allVeges) {
      res.json(allVeges);
    }
  } catch (error) {
    res.json(err);
  }
});

router.post("/", async (req, res) => {
  const { name, spacing, harvest, wateringFrequencyDays, keyDates } = req.body;
  try {
    const newVeg = await Vegetable.create({
      name,
      spacing,
      harvest,
      wateringFrequencyDays,
      keyDates,
    });
    res.json(newVeg);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
