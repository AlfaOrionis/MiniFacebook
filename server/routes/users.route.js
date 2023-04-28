const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const auth = require("../middleware/auth");
const formidableMiddleware = require("express-formidable");
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
router.patch("/setNotifTrue", auth(), usersController.setNotifTrue);
router.patch("/addNotification", auth(), usersController.addNotification);
router.patch("/removeNotification", auth(), usersController.removeNotification);
router.post("/removeFriend", auth(), usersController.removeFriend);
router.get("/verify", usersController.verifyAccount);
router.get("/users", usersController.getUsers);
router.get("/userFriends", auth(), usersController.getFriends);

router.post(
  "/uploadPicture",
  auth(),
  formidableMiddleware(),
  usersController.addPicture
);

module.exports = router;
