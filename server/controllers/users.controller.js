const { userService, authService } = require("../services");
const httpStatus = require("http-status");
const mongoose = require("mongoose");
const { ApiError } = require("../middleware/apiError");
const filterUser = require("../utills/filterUserResponse");
const { User } = require("../models/user");
const { sendFriendRequest } = require("../services/user.service");

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

  async getUsers(req, res, next) {
    const input = new RegExp(req.query.input, "i");
    try {
      const users = await User.find({
        $or: [{ firstname: input }, { lastname: input }],
      }).limit(req.query.limit);

      res.json(users);
    } catch (err) {
      next(err);
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
  async updateWorkAndSchool(req, res, next) {
    try {
      const user = await userService.workAndSchool(req);

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
  async verifyAccount(req, res, next) {
    try {
      const token = await userService.validateToken(req.query.validation);
      const user = await userService.findUserById(token.sub);

      if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      if (user.verified)
        throw new ApiError(httpStatus.BAD_REQUEST, "Already verified");

      user.verified = true;
      await user.save();
      res.status(httpStatus.CREATED).send(filterUser(user));
    } catch (error) {
      next(error);
    }
  },

  async sendFriendRequest(req, res, next) {
    try {
      const user = await sendFriendRequest(req);

      res.status(httpStatus.CREATED).send(filterUser(user));
    } catch (err) {
      next(err);
    }
  },
};

module.exports = usersController;
