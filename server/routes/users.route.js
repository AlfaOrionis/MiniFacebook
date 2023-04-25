const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const auth = require("../middleware/auth");

router.route("/profile").get(usersController.getProfile);
router.patch("/update/description", auth(), usersController.updateDescription);
router.patch("/update/work", auth(), usersController.updateWork);
router.patch("/update/education", auth(), usersController.updateSchool);
router.patch("/update/livesIn", auth(), usersController.updateLivesIn);
router.patch(
  "/update/relationship",
  auth(),
  usersController.updateRelationship
);
router.patch("/update/names", auth(), usersController.updateName);
router.patch("/email", auth(), usersController.updateUserEmail);
router.patch("/password", auth(), usersController.updatePassword);
router.post("/sendFriendRequest", auth(), usersController.sendFriendRequest);
router.post(
  "/confirmFriendRequest",
  auth(),
  usersController.confirmFriendRequest
);
router.post("/removeFriend", auth(), usersController.removeFriend);
router.get("/verify", usersController.verifyAccount);
router.get("/users", usersController.getUsers);

module.exports = router;
