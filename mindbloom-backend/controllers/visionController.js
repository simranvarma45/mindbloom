const VisionItem = require('../models/visionModel');

// GET all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await VisionItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST new item
exports.createItem = async (req, res) => {
  const { title, image, achieved } = req.body;
  try {
    const newItem = new VisionItem({ title, image, achieved });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update item
exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { title, image, achieved } = req.body;
  try {
    const updateData = { title };

if (typeof image !== 'undefined') {
  updateData.image = image;
}
if (typeof achieved !== 'undefined') {
  updateData.achieved = achieved;
}
    const updated = await VisionItem.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );


    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE item
exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    await VisionItem.findByIdAndDelete(id);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
