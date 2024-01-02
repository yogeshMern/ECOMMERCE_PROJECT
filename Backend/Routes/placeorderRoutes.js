const express = require("express");
const router = express.Router();
const Controller = require("../Controller/placeOrderController");
const auth = require("../Utils/authMiddleware");

router.post("/place-order", Controller.placeOrder);
router.post("/cod-delivery", Controller.cashOnDelivery);
router.get("/placed-order", Controller.placedOrder);
router.post("/cancel-order/:id", Controller.cancelOrder);

module.exports = router;
