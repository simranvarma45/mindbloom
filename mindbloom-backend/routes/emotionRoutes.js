const express = require('express');
const router = express.Router();
const Emotion = require('../models/emotionModel');

// Get all entries
router.get('/', async (req, res) => {
  try {
    const entries = await Emotion.find();
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add entry
router.post('/', async (req, res) => {
  const { text, date } = req.body;
  try {
    const newEntry = new Emotion({ text, date });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update entry
router.put('/:id', async (req, res) => {
  try {
    const updated = await Emotion.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete entry
router.delete('/:id', async (req, res) => {
  try {
    await Emotion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
