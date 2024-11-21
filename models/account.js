const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

// Define account schema
const accountSchema = new Schema({
  username: String,
  password: String
});

// Use passport-local-mongoose for authentication-related fields and methods
accountSchema.plugin(passportLocalMongoose);

// Export the model
module.exports = mongoose.model('Account', accountSchema);
