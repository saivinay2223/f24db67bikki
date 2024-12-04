const mongoose = require("mongoose");

// Define the Galaxy schema
const galaxySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Galaxy name is required"], // Custom error message
    trim: true, // Trims any extra spaces around the name
    unique: true, // Ensures that galaxy names are unique
    index: true, // Adds an index for optimized search
  },
  year: {
    type: Number,
    required: [true, "Year of discovery is required"], // Custom error message
    min: [1900, "Year must be 1900 or later"], // Validation for valid year
    max: [new Date().getFullYear(), "Year must not be in the future"], // Ensuring the year isn't in the future
  },
  inventor: {
    type: String,
    required: [true, "Inventor name is required"], // Custom error message
    trim: true, // Trims spaces
  },
  distance: {
    type: Number, // Distance in light-years
    required: [true, "Distance is required"], // Custom error message
    min: [0, "Distance must be a positive number"], // Ensuring distance is positive
  },
  type: {
    type: String,
    required: [true, "Galaxy type is required"], // Custom error message
    enum: {
      values: ["Spiral", "Elliptical", "Irregular", "Lenticular"], // Allowed types
      message: "Type must be one of: Spiral, Elliptical, Irregular, Lenticular", // Error message for invalid types
    },
  },
  description: {
    type: String,
    maxlength: [500, "Description must not exceed 500 characters"], // Ensures the description isn't too long
    trim: true, // Trims spaces
  },
  created_at: {
    type: Date,
    default: Date.now, // Automatically sets the current date/time
    immutable: true, // Prevents this field from being changed once set
  },
  updated_at: {
    type: Date,
    default: Date.now, // Automatically sets the current date/time
  },
});

// Middleware to update `updated_at` field on save
galaxySchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

// Middleware to log schema events for debugging
galaxySchema.post("save", function (doc) {
  console.log(`Galaxy ${doc.name} was successfully saved.`);
});

// Export the model based on the schema
module.exports = mongoose.models.Galaxy || mongoose.model("Galaxy", galaxySchema);
