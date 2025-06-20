const Affirmation = require("../models/affirmationModel");

// Add a new affirmation
exports.addAffirmation = async (req, res) => {
  try {
    const { text } = req.body;
    const newAffirmation = new Affirmation({
      userId: req.userId,
      text,
    });
    await newAffirmation.save();
    res.status(201).json(newAffirmation);
  } catch (error) {
    res.status(500).json({ message: "Failed to save affirmation", error });
  }
};

// Get all affirmations for logged-in user
exports.getAffirmations = async (req, res) => {
  try {
    const affirmations = await Affirmation.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(affirmations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching affirmations", error });
  }
};

// Delete a specific affirmation
exports.deleteAffirmation = async (req, res) => {
  try {
    const deleted = await Affirmation.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!deleted) return res.status(404).json({ message: "Affirmation not found" });
    res.status(200).json({ message: "Affirmation deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
};
