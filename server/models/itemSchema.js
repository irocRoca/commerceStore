const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, require: true },
  imagePath: String,
  price: { type: Number, required: true },
});

module.exports = itemSchema;
