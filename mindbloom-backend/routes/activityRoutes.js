const express = require("express");
const router = express.Router();
const Activity = require("../models/activityModel");
const protect = require("../middleware/authMiddleware");

// Get activities for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch activities" });
  }
});

// Add new activity (linked to user)
router.post("/", protect, async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const newActivity = new Activity({ title, userId: req.user.id });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add activity' });
  }
});

// Update activity (only if user owns it)
router.put('/:id', protect, async (req, res) => {
  try {
    const updated = await Activity.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title: req.body.title },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Activity not found or unauthorized" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update activity' });
  }
});

// Delete activity (only if user owns it)
router.delete('/:id', protect, async (req, res) => {
  try {
    const deleted = await Activity.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ error: "Activity not found or unauthorized" });

    res.json({ message: 'Activity deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete activity' });
  }
});

module.exports = router;
