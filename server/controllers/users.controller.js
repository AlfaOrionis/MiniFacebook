const { userService, authService } = require("../services");
const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");
const filterUser = require("../utills/filterUserResponse");

const usersController = {
  async getProfile(req, res, next) {
    try {
      const user = await userService.findUserById(req.user._id);
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      }
      res.json({ ...user._doc, password: null });
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(req, res, next) {
    try {
      const user = await userService.updateUserProfile(req);

      res.json(filterUser(user));
    } catch (error) {
      next(error);
    }
  },
  async updateUserEmail(req, res, next) {
    try {
      const user = await userService.updateUserEmail(req);
      const token = await authService.genAuthToken(user);

      res.cookie("x-access-token", token).send({
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  },

  async updatePassword(req, res, next) {
    try {
      const user = await userService.updatePassword(req);

      res.status(httpStatus.CREATED).send(filterUser(user));
    } catch (err) {
      next(err);
    }
  },
};

module.exports = usersController;
