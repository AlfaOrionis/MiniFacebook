const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const auth = require("../middleware/auth");

router
  .route("/profile")
  .get(auth(), usersController.getProfile)
  .patch(auth(), usersController.updateProfile);

router.patch("/email", auth(), usersController.updateUserEmail);
router.patch("/password", auth(), usersController.updatePassword);
router.post("/sendFriendRequest", auth(), usersController.sendFriendRequest);

module.exports = router;
