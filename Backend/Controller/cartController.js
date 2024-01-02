const Cart = require("../Model/Cart");
const Product = require("../Model/Product");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const mongoose = require("mongoose");

exports.addToCart = catchAsync(async (req, res, next) => {
  const { productId, userId, quantity } = req.body;
  if (!productId || !userId || !quantity) {
    return next(new AppError("Product, UserId, or quantity not found", 400));
  }

  const product = await Product.findOne({ _id: productId });
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  try {
    let userCart = await Cart.findOne({ userId });
    if (!userCart) {
      // If the user doesn't have a cart, create a new one
      userCart = await Cart.create({ userId, product: [] });
    }

    // Check if the product is already in the cart
    const existingProductIndex = userCart.product.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingProductIndex !== -1) {
      // If the product is already in the cart, update the quantity
      userCart.product[existingProductIndex].quantity += quantity;
    } else {
      // If the product is not in the cart, add a new product
      userCart.product.push({ productId, quantity });
    }

    // Save the changes to the cart
    await userCart.save();

    res.status(200).json({
      status: "success",
      message: "Product added to cart!",
      data: userCart,
    });
  } catch (error) {
    return next(new AppError("Error processing the request", 500));
  }
});

exports.cartItems = catchAsync(async (req, res, next) => {
  const imgUrl = `${req.protocol}://${req.get("host")}/products_images/`;

  const userId = req.params.id;
  if (!userId) {
    return next(new AppError("User is not Autherized!"), 400);
  }

  const data = await Cart.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $unwind: "$product",
    },
    {
      $lookup: {
        from: "products",
        localField: "product.productId",
        foreignField: "_id",
        as: "productInfo",
      },
    },
    {
      $addFields: {
        "product.productInfo": { $arrayElemAt: ["$productInfo", 0] },
      },
    },
    {
      $sort: {
        "product.productInfo.createdAt": -1, // Sort in descending order
      },
    },
    {
      $group: {
        _id: "$_id",
        product: {
          $push: {
            _id: "$product.productInfo._id",
            productName: "$product.productInfo.productName",
            quantity: "$product.quantity",
            newPrice: "$product.productInfo.newPrice",
            oldPrice: "$product.productInfo.oldPrice",
            category: "$product.productInfo.category",
            productImage: {
              $concat: [imgUrl, "$product.productInfo.productImage"],
            },
            description: "$product.productInfo.description",
          },
        },
      },
    },
  ]);

  if (!data || data.length === 0) {
    return res.status(400).json({ message: "Cart list is empty!", data: [] });
  }

  res.status(200).json({
    status: "success",
    message: "User Added Items in Cart!",
    userId: userId,
    data,
  });
});

exports.removeAllCartItems = catchAsync(async (req, res, next) => {
  const data = await Cart.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Cart Item Deleted!",
  });
});

exports.removeItems = catchAsync(async (req, res, next) => {
  const { userId, productIdToRemove } = req.body;
  if (!userId || !productIdToRemove) {
    return next(new AppError("User ID or product ID is missing!", 400));
  }

  const filter = { userId: new mongoose.Types.ObjectId(userId) };
  const update = {
    $pull: {
      product: {
        productId: new mongoose.Types.ObjectId(productIdToRemove),
      },
    },
  };

  const updatedCart = await Cart.findOneAndUpdate(filter, update, {
    new: true, // Return the modified document
  });

  if (!updatedCart) {
    return next(new AppError("User doesn't match or product not found!", 400));
  }

  res.status(200).json({
    status: "success",
    message: "Product removed from the Cart!",
  });
});

exports.updateCartItems = catchAsync(async (req, res, next) => {
  const { productId, userId, quantity } = req.body;
  if (!productId || !userId || !quantity) {
    return next(new AppError("Product, UserId, or quantity not found", 400));
  }

  let userCart = await Cart.findOne({ userId });
  if (!userCart) {
    return next(new AppError("Cart not found", 404));
  }

  const existingProductIndex = userCart.product.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (existingProductIndex !== -1) {
    // If the product is in the cart, update the quantity
    userCart.product[existingProductIndex].quantity = quantity;
    await userCart.save();

    res.status(200).json({
      status: "success",
      message: "Cart updated successfully!",
      data: userCart,
    });
  }
});
