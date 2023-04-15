const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const auth = require("../middleware/auth");

router
  .route("/profile")
  .get(usersController.getProfile)
  .patch(auth(), usersController.updateDescription)
  .patch(auth(), usersController.updateWork)
  .patch(auth(), usersController.updateSchool)
  .patch(auth(), usersController.updateLivesIn)
  .patch(auth(), usersController.updateRelationship)
  .patch(auth(), usersController.updateName)
  .patch(auth(), usersController.updatePassword);
router.patch("/email", auth(), usersController.updateUserEmail);
router.patch("/password", auth(), usersController.updatePassword);
router.post("/sendFriendRequest", auth(), usersController.sendFriendRequest);
router.get("/verify", usersController.verifyAccount);
router.get("/users", usersController.getUsers);

module.exports = router;
