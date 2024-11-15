const mongoose = require("mongoose");

// Define the Galaxy schema
const galaxySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  inventor: {
    type: String,
    required: true
  },
  distance: {
    type: Number,  // Distance in light-years
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

// Export the model based on the schema
module.exports = mongoose.model("Galaxy", galaxySchema);
