const mongoose = require('mongoose');

const galaxieSchema = new mongoose.Schema({
  Name: String,
  Distance: Number,
  Type: String
});

const Galaxie = mongoose.model('Galaxie', galaxieSchema);
module.exports = Galaxie;
