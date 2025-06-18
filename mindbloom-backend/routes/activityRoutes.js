const express = require('express');
const router = express.Router();
const Activity = require('../models/activityModel');

// Get all activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// Add new activity
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    const newActivity = new Activity({ title });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add activity' });
  }
});

// Update activity
router.put('/:id', async (req, res) => {
  try {
    const updated = await Activity.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update activity' });
  }
});

// Delete activity
router.delete('/:id', async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: 'Activity deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete activity' });
  }
});

module.exports = router;
