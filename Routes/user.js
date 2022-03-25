const userController = require("../Controllers/user");
const auth = require("../Functions/Authentication");

const express = require("express");

const router = express.Router();


router.post("/", userController.signUp);

router.post("/signIn", userController.signIn);

router.post("/list", auth, userController.list);

module.exports = router;
