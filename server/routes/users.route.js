const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const auth = require("../middleware/auth");

router.route("/profile").get(auth(), usersController.getProfile);

module.exports = router;
