const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const Review = require("../Model/Review");
const User = require("../Model/User");

exports.createReview = catchAsync(async (req, res, next) => {
  const { message, ratings, users } = req.body;
  if (!message || !ratings || !users) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const existingUser = await User.find({ user: users });

  const data = await Review.create({ message, ratings });

  res.status(201).json({
    success: true,
    message: "Review created successfully!",
    data,
  });
});

exports.getAllReview = catchAsync(async (req, res, next) => {
  const data = await Review.find();
  if (data.length === 0) {
    return res.status(400).json({ message: "Reviews not found!", data: [] });
  }

  res.status(201).json({
    success: true,
    message: "Review list!",
    data,
  });
});
