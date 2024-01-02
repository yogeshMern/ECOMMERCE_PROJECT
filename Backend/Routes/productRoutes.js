const express = require("express");
const router = express.Router();
const Controller = require("../Controller/productController");
const upload = require("../Common/upload");
const auth = require("../Utils/authMiddleware");

router.post(
  "/create-product",
  upload.single("productImage"),
  Controller.createProduct
);
router.get("/get-all-product", Controller.getAllProduct);
router.get("/get-single-product/:id", auth, Controller.getSingleProduct);
router.put("/update-product/:id", auth, Controller.updateProductDetails);
router.get("/women", Controller.popularInWomens);
router.get("/new-collection", Controller.newCollections);
router.get("/more-products", Controller.moreProducts);
// router.delete("/delete-product/:id", auth, Controller.deleteProduct);

module.exports = router;
