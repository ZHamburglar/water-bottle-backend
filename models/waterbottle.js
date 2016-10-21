const mongoose = require('mongoose');

var waterSchema = {
  brand: String,
  phLevel: Number,
  cost: Number,
  photoname: String
}

var Water = mongoose.model('Water', waterSchema);

module.exports = Water;
