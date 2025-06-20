const mongoose = require("mongoose");

const reflectionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
}, { timestamps: true });

module.exports = mongoose.model("Reflection", reflectionSchema);
