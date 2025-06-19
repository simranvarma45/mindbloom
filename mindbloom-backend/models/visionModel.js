const mongoose = require('mongoose');

const visionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  achieved: {
    type: Boolean,
    default: false,
  },
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, 
    },
}, { timestamps: true });

module.exports = mongoose.model('VisionItem', visionSchema);
