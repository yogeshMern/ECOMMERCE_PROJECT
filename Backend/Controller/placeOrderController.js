const Order = require("../Model/PlaceOrder");
const Product = require("../Model/Product");
const User = require("../Model/User");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");

exports.placeOrder = catchAsync(async (req, res, next) => {
  const {
    email,
    cardNumber,
    expirationDate,
    cardName,
    quantity,
    totalAmount,
    productId,
    isCOD,
  } = req.body;

  if (!productId || !quantity) {
    return next(new AppError("Product and Quantity not found", 400));
  }
  // Check if the email exists in the User model
  const user = await User.findOne({ email });
  if (!user) {
    // If the email doesn't exist in the User model, check the Cart model
    const cart = await Order.findOne({ email });
    if (!cart) {
      // If the email doesn't exist in the Cart model, throw an error
      return next(new AppError("User not found!"));
    }
  }

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const existOrder = await Order.findOne({ productId });
  if (existOrder) {
    return next(new AppError("Item already in the Queue!"));
  }

  const newOrder = await Order.create({
    email,
    cardNumber,
    expirationDate,
    cardName,
    quantity,
    totalAmount,
    isCOD,
    productId: product._id,
  });

  res.status(201).json({
    status: "success",
    message: "Order Placed Successfully!",
    savedOrder: newOrder,
  });
});

exports.cashOnDelivery = catchAsync(async (req, res, next) => {
  const { email, isCOD, CODAmount, quantity, productId } = req.body;
  if (!email || !isCOD || !CODAmount || !quantity || !productId) {
    return res.status(400).json({ message: "All fields are required for COD" });
  }

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const existOrder = await Order.findOne({ productId });
  if (existOrder) {
    return next(new AppError("Item already in the Queue!"));
  }

  const newOrder = await Order.create({
    email,
    isCOD,
    CODAmount,
    quantity,
    productId: product._id,
  });

  res.status(201).json({
    status: "success",
    message: "COD Order Placed Successfully!",
    savedOrder: newOrder,
  });
});

exports.placedOrder = catchAsync(async (req, res, next) => {
  const { userEmail } = req.query;
  const imgUrl = `${req.protocol}://${req.get("host")}/products_images/`;

  const data = await Order.aggregate([
    {
      $match: { email: userEmail },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails",
    },
    {
      $project: {
        quantity: 1,
        totalAmount: 1,
        createdAt: 1,
        productName: "$productDetails.productName",
        newPrice: "$productDetails.newPrice",
        category: "$productDetails.category",
        productImage: {
          $concat: [imgUrl, "$productDetails.productImage"],
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        quantity: { $first: "$quantity" },
        totalAmount: { $first: "$totalAmount" },
        createdAt: { $first: "$createdAt" },
        productDetails: { $push: "$$ROOT" }, // Push entire document into productDetails array
      },
    },
    {
      $project: {
        productDetails: {
          $map: {
            input: "$productDetails",
            as: "productDetail",
            in: {
              _id: "$$productDetail._id",
              quantity: "$$productDetail.quantity",
              totalAmount: "$$productDetail.totalAmount",
              createdAt: "$$productDetail.createdAt",
              productName: "$$productDetail.productName",
              newPrice: "$$productDetail.newPrice",
              category: "$$productDetail.category",
              productImage: "$$productDetail.productImage",
            },
          },
        },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    message: "Placed Order list!",
    data,
  });
});

exports.cancelOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Order has been Canceled!",
  });
});
