const mongoose = require('mongoose');

const reflectionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Reflection', reflectionSchema); // ✅ CommonJS export
