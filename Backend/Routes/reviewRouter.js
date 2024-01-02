const express = require("express");
const Controller = require("../Controller/reviewController");
const router = express.Router();
const auth = require("../Utils/authMiddleware");

router.post("/create-review", Controller.createReview);
router.get("/get-all-review", Controller.getAllReview);

module.exports = router;
