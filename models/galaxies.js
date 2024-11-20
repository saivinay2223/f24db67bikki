const mongoose = require("mongoose");

// Define the Galaxy schema
const galaxySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Galaxy name is required"], // Adding a custom error message
    trim: true, // Trims any extra spaces around the name
  },
  year: {
    type: Number,
    required: [true, "Year is required"], // Custom error message
    min: [1900, "Year must be later than 1900"], // Validation for valid year
    max: [new Date().getFullYear(), "Year must not be in the future"], // Ensuring the year isn't in the future
  },
  inventor: {
    type: String,
    required: [true, "Inventor is required"], // Custom error message
    trim: true, // Trims spaces
  },
  distance: {
    type: Number,  // Distance in light-years
    required: [true, "Distance is required"], // Custom error message
    min: [0, "Distance must be a positive number"], // Ensuring distance is positive
  },
  type: {
    type: String,
    required: [true, "Type of galaxy is required"], // Custom error message
    enum: ["Spiral", "Elliptical", "Irregular", "Lenticular"], // Restricting types to common galaxy types
  },
  created_at: {  // New field to track when the galaxy was created
    type: Date,
    default: Date.now
  }
});

// Export the model based on the schema
module.exports = mongoose.model("Galaxy", galaxySchema);
