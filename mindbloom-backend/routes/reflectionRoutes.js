const express = require('express');
const router = express.Router();
const Reflection = require('../models/Reflection');


// GET all reflections
router.get("/", async (req, res) => {
  try {
    const reflections = await Reflection.find().sort({ createdAt: -1 });
    res.json(reflections);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reflections", error });
  }
});

// POST new reflection
router.post("/", async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Content is required" });

    const newReflection = new Reflection({ content });
    await newReflection.save();
    res.status(201).json(newReflection);
  } catch (error) {
    res.status(500).json({ message: "Error saving reflection", error });
  }
});

// PUT (edit) a reflection
router.put("/:id", async (req, res) => {
  try {
    const { content } = req.body;
    const updated = await Reflection.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating reflection", error });
  }
});

// DELETE a reflection
router.delete("/:id", async (req, res) => {
  try {
    await Reflection.findByIdAndDelete(req.params.id);
    res.json({ message: "Reflection deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting reflection", error });
  }
});

module.exports= router;
