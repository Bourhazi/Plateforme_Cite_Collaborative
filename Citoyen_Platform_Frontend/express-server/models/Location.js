const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: String,
  latitude: Number,
  longitude: Number,
  imageUrl: String,
});

module.exports = mongoose.model('Location', locationSchema);
