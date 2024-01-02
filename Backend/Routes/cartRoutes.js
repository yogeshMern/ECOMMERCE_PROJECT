const express = require("express");
const router = express.Router();
const Controller = require("../Controller/cartController");
const auth = require("../Utils/authMiddleware");

router.post("/cart", Controller.addToCart);
router.get("/cart-items/:id", Controller.cartItems);
router.post("/remove-items", Controller.removeItems);
router.post("/remove-all-items/:id", Controller.removeAllCartItems);
router.post("/update-cart-items", Controller.updateCartItems);

module.exports = router;
