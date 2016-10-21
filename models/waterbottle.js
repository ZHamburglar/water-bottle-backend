const mongoose = require('mongoose');

var waterSchema = {
  brand: String,
  phLevel: Number,
  cost: Number,
  userId: String
}

var Water = mongoose.model('Water', waterSchema);

module.exports = Water;
