const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  manufacturingYear: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Car",carSchema);
