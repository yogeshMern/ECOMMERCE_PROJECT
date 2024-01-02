const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      isDeleted: { type: Boolean, default: false },
      quantity: { type: Number },
    },
  ],
});

module.exports = new mongoose.model("Cart", cartSchema);
