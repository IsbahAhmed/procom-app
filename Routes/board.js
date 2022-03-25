const boardController = require("../Controllers/board");
const auth = require("../Functions/Authentication");

const express = require("express");

const router = express.Router();


router.post("/", auth, boardController.Add);

router.get("/list", auth, boardController.list);

router.post("/addMembers", auth, boardController.addMembers);


module.exports = router;
