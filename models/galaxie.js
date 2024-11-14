const mongoose = require("mongoose")
const galaxieSchema = mongoose.Schema({
Name: String,
Distance: Number,
Type: String
})
module.exports = mongoose.model("galaxie",
galaxieSchema)