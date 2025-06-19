const express = require("express");
const router = express.Router();
const Reflection = require("../models/Reflection");
const protect = require("../middleware/authMiddleware");

// GET reflections for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const reflections = await Reflection.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(reflections);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reflections", error });
  }
});

// POST new reflection (for logged-in user)
router.post("/", protect, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Content is required" });

    const newReflection = new Reflection({ content, userId: req.user.id });
    await newReflection.save();
    res.status(201).json(newReflection);
  } catch (error) {
    res.status(500).json({ message: "Error saving reflection", error });
  }
});

// PUT (edit) a reflection (only by owner)
router.put("/:id", protect, async (req, res) => {
  try {
    const { content } = req.body;
    const updated = await Reflection.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { content },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Reflection not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating reflection", error });
  }
});

// DELETE a reflection (only by owner)
router.delete("/:id", protect, async (req, res) => {
  try {
    const deleted = await Reflection.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ message: "Reflection not found" });
    res.json({ message: "Reflection deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting reflection", error });
  }
});

module.exports = router;
