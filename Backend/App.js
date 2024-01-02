const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AppError = require("./Utils/appError");
const globalErrorHandler = require("./Controller/errController");
const productRouter = require("./Routes/productRoutes");
const reviewRouter = require("./Routes/reviewRouter");
const userRouter = require("./Routes/userRoutes");
const placeOrderRouter = require("./Routes/placeorderRoutes");
const cartRouter = require("./Routes/cartRoutes");
require("dotenv").config({ path: "./Config/Config.env" });

app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.JWT_SECRET_KEY));
app.use("/api/v1", productRouter);
app.use("/api/v1", reviewRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", placeOrderRouter);
app.use("/api/v1", cartRouter);

// Serve Products images folder
app.use("/products_images", express.static("products_images"));

// Route error handling middleware...
// app.get("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`), 404);
// });

// Global error handling middleware...
app.use(globalErrorHandler);

module.exports = app;
