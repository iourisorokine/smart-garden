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
  const {
    name,
    description,
    emoji,
    spacing,
    harvest,
    wateringFrequencyDays,
    keyDates,
  } = req.body;
  try {
    const newVeg = await Vegetable.create({
      name,
      description,
      emoji,
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

router.delete("/:id", async (req, res) => {
  const id = req.params ? req.params.id : req.body ? req.body.id : null;
  if (!id) {
    throw new Error("no id was provided");
  }
  try {
    await Vegetable.findByIdAndDelete(id);
    res.json({ message: "Successfully deleted one vegetable data" });
  } catch (error) {
    res.json(err);
  }
});

module.exports = router;
