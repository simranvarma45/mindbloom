const mongoose = require("mongoose");

const emotionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, 
  },
});

module.exports = mongoose.model("Emotion", emotionSchema);
