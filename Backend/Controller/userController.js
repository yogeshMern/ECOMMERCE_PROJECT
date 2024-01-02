const User = require("../Model/User");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = catchAsync(async (req, res, next) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const hashedPasword = await bcrypt.hash(password, 10);
  if (!hashedPasword) {
    return res.status(400).json({ message: "Password is not crypted!" });
  }

  const userExist = await User.findOne({ $or: [{ email }, { userName }] });
  if (userExist) {
    return next(
      new AppError("User already exists with this email or userName!", 400)
    );
  }

  const data = await User.create({ userName, email, password: hashedPasword });

  res.status(201).json({
    success: true,
    message: "Registration Successfullty!",
    data,
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const existUser = await User.findOne({ email }).select("+password").lean();
  if (!existUser) {
    next(new AppError("User not Registered with this email!"));
  }

  const isVaidPAssword = await bcrypt.compare(password, existUser.password);
  if (!isVaidPAssword) {
    return res.status(400).json({ message: "Invalid email or password!" });
  }

  const token = jwt.sign({ __id: existUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "10h",
  });

  delete existUser.password;

  // if (req.headers.cookie) {
  //   return res.status(200).json({ message: "You are already logged In!" });
  // }

  res.cookie("authToken", token, {
    expires: new Date(Date.now() + 30 * 24 * 3600000),
    path: "/",
    secure: false, // Use "true" for HTTPS
    // sameSite: "next", // For cross-site cookies
    signed: true,
  });
  res.status(200).json({
    succes: true,
    message: "Login successfuly!",
    existUser,
  });
});

exports.logoutUser = catchAsync(async (req, res, next) => {
  res.clearCookie("authToken");

  res.status(200).json({
    success: true,
    message: "User Logged out successfully!",
  });
});
