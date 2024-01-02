const express = require("express");
const router = express.Router();
const Controller = require("../Controller/userController");
const auth = require("../Utils/authMiddleware");

router.post("/register-user", Controller.registerUser);
router.post("/login-user", Controller.loginUser);
router.post("/logout-user", Controller.logoutUser);

module.exports = router;
