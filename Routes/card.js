const cardController = require("../Controllers/card");
const auth = require("../Functions/Authentication");

const express = require("express");

const router = express.Router();


router.post("/", auth, cardController.Add);

router.post("/updateCardStatus", auth, cardController.updateCardStatus);

router.post("/uploadImage",  cardController.uploadImage);


module.exports = router;
