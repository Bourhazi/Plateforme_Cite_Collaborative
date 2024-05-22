const mongoose = require('mongoose');

const ReclamationSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
    accuracy: Number,
    altitude: Number,
    altitudeAccuracy: Number,
    heading: Number,
    speed: Number
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Reclamation = mongoose.model('Reclamation', ReclamationSchema);

module.exports = Reclamation;
