const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  message: { type: String },
  ratings: { type: Number, default: 0, min: 0, max: 5 },
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = new mongoose.model("Review", reviewSchema);
