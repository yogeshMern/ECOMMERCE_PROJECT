const mongoose = require("mongoose");

const placeOrderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    cardNumber: {
      type: String,
      unique: [true, "a user must have a unique card number!"],
    },
    expirationDate: {
      month: { type: String },
      year: { type: String },
      securityCode: { type: String },
    },
    cardName: {
      type: String,
    },
    isCOD: { type: Boolean, default: false },
    CODAmount: { type: Number },
    quantity: { type: Number, default: 0 },
    totalAmount: { type: Number },
    productId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

module.exports = new mongoose.model("PlaceOrder", placeOrderSchema);
