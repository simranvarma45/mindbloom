const express = require('express');
const router = express.Router();
const Emotion = require('../models/emotionModel');
const protect = require("../middleware/authMiddleware");

// Get user entries
router.get('/', protect,async (req, res) => {
  try {
    const entries = await Emotion.find({userId: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add entry
router.post('/', protect, async (req, res) => {
  const { text, date } = req.body;

  if (!text || !date) {
    return res.status(400).json({ message: "Text and date are required" });
  }

  try {
    const newEntry = new Emotion({
      text,
      date,
      userId: req.user.id, // Now this will be defined
    });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Update entry
router.put('/:id',protect, async (req, res) => {
  try {
    const updated = await Emotion.findOneAndUpdate( { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete entry
router.delete('/:id',protect, async (req, res) => {
  try {
    await Emotion.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
