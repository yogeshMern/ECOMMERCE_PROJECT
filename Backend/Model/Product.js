const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "a product must have name!"],
      minlength: [5, "a product must have minimum 5 character of name!"],
    },
    newPrice: {
      type: Number,
      required: [true, "a product must have price!"],
    },
    oldPrice: {
      type: Number,
      required: [true, "a product must have price!"],
    },
    category: {
      type: String,
      required: [true, "a product must have category!"],
    },
    productImage: {
      type: String,
      required: [true, "a product must have a image!"],
    },
    description: {
      type: String,
      required: [true, "a product must have a description!"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Product", productSchema);
