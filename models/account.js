const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

// Define Galaxy schema
const galaxySchema = new Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  inventor: { type: String, required: true },
  distance: { type: Number, required: true },
  type: { type: String, required: true },
});

// Use passport-local-mongoose for user authentication functionality
galaxySchema.plugin(passportLocalMongoose);

// Export the model
module.exports = mongoose.model('Galaxy', galaxySchema);
