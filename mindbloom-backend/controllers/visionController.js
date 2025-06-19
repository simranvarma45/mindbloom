const VisionItem = require('../models/visionModel');

// GET all items (only for logged-in user)
exports.getAllItems = async (req, res) => {
  try {
    const items = await VisionItem.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST new item (linked to user)
exports.createItem = async (req, res) => {
  const { title, image, achieved } = req.body;
  try {
    const newItem = new VisionItem({
      title,
      image,
      achieved,
      userId: req.user.id, // ✅ Secure the data
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update item (only if user owns it)
exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { title, image, achieved } = req.body;

  const updateData = {};
  if (typeof title !== 'undefined') updateData.title = title;
  if (typeof image !== 'undefined') updateData.image = image;
  if (typeof achieved !== 'undefined') updateData.achieved = achieved;

  try {
    const updated = await VisionItem.findOneAndUpdate(
      { _id: id, userId: req.user.id }, // ✅ Only update if user owns it
      updateData,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found or unauthorized" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE item (only if user owns it)
exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await VisionItem.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ message: "Not found or unauthorized" });
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
