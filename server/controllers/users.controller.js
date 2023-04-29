const { userService, authService } = require("../services");
const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");
const filterUser = require("../utills/filterUserResponse");
const { User } = require("../models/user");
const { ObjectId } = require("mongodb");
const cloudinary = require("cloudinary").v2;
const {
  sendFriendRequest,
  findUserByIdWithError,
} = require("../services/user.service");

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_USER}`,
  api_key: `${process.env.CLOUDINARY_KEY}`,
  api_secret: `${process.env.CLOUDINARY_SECRET}`,
});

const usersController = {
  async getProfile(req, res, next) {
    try {
      const user = await User.findById(req.query._id).populate({
        path: "friends",
        select: "firstname lastname profilePicture",
        options: {
          limit: 8,
        },
      });
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      }

      const result = {
        ...user._doc,
        joinedOn: new ObjectId(user._doc._id).getTimestamp().toDateString(),
        password: "",
      };
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async getUsers(req, res, next) {
    console.log(req.query);
    let input = "";
    if (!req.query.input.includes(" ")) {
      input = new RegExp(req.query.input, "i");
      console.log(input);
      try {
        const users = await User.find({
          $or: [{ firstname: input }, { lastname: input }],
        }).limit(req.query.limit);

        res.json(users);
      } catch (err) {
        next(err);
      }
    }
  },

  async updateDescription(req, res, next) {
    try {
      const user = await findUserByIdWithError(req.user._id);

      user.description = req.body.description;

      await user.save();

      res.json(filterUser(user));
    } catch (error) {
      next(error);
    }
  },
  async updateWork(req, res, next) {
    try {
      console.log(req.body);
      const user = await findUserByIdWithError(req.user._id);

      user.work = req.body.work;

      await user.save();

      res.json(filterUser(user));
    } catch (error) {
      next(error);
    }
  },
  async updateSchool(req, res, next) {
    try {
      const user = await findUserByIdWithError(req.user._id);
      user.education = req.body.education;

      await user.save();

      res.json(filterUser(user));
    } catch (error) {
      next(error);
    }
  },
  async updateLivesIn(req, res, next) {
    try {
      const user = await findUserByIdWithError(req.user._id);
      user.livesIn = req.body.livesIn;

      await user.save();

      res.json(filterUser(user));
    } catch (error) {
      next(error);
    }
  },
  async updateRelationship(req, res, next) {
    try {
      const user = await findUserByIdWithError(req.user._id);
      user.relationship = req.body.relationship;

      await user.save();

      res.json(filterUser(user));
    } catch (error) {
      next(error);
    }
  },

  async updateName(req, res, next) {
    try {
      const user = await findUserByIdWithError(req.user._id);
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;

      await user.save();

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

  async confirmFriendRequest(req, res, next) {
    try {
      const result = await userService.confirmFriendRequest(req);

      res.status(httpStatus.CREATED).send(result);
    } catch (err) {
      next(err);
    }
  },

  async removeFriend(req, res, next) {
    try {
      const result = await userService.removeFriend(req);

      res.status(httpStatus.CREATED).send(result);
    } catch (err) {
      next(err);
    }
  },

  async addNotification(req, res, next) {
    try {
      const user = req.user;
      const friend = await User.findById(req.body._id);
      console.log(req.body);
      user.notifications.push({
        _id: req.body._id,
        category: req.body.category,
        friend: {
          name: `${friend.firstname} ${friend.lastname}`,
          img: friend.profilePicture,
        },
      });
      user.notificationsChecked = false;

      await user.save();

      res.status(httpStatus.CREATED).send(user);
    } catch (err) {
      next(err);
    }
  },
  async removeNotification(req, res, next) {
    try {
      const user = req.user;

      user.notifications = user.notifications.filter(
        (not) => not._id.toString() !== req.body._id
      );

      await user.save();
      res.status(httpStatus.CREATED).send(user);
    } catch (err) {
      next(err);
    }
  },
  async setNotifTrue(req, res, next) {
    try {
      const user = req.user;

      user.notificationsChecked = true;
      await user.save();

      res.status(httpStatus.CREATED).send(user);
    } catch (err) {
      next(err);
    }
  },

  async getFriends(req, res, next) {
    try {
      const user = req.user;
      const populateduser = await User.findById(user._id).populate({
        path: "friends",
        select: "firstname lastname profilePicture",
        options: {
          limit: 8,
        },
      });
      res.json(populateduser.friends);
    } catch (err) {
      next(err);
    }
  },

  async addProfilePicture(req, res, next) {
    try {
      let type;
      if (req.fields.type === "profile") type = "profilePicture";
      if (req.fields.type === "background") type = "backgroundPicture";
      if (req.user[type].url && req.user[type].public_id) {
        await cloudinary.uploader
          .destroy(req.user[type].public_id)
          .then((res) => {
            if (res.result === "not found")
              throw new ApiError(
                httpStatus.BAD_REQUEST,
                "Picture could not be uploaded"
              );
          })
          .catch((err) => {
            throw new ApiError(
              httpStatus.BAD_REQUEST,
              err || "Something went wrong!"
            );
          });
        req.user[type] = { url: "", public_id: "" };
      }

      const user = req.user;
      const upload = await cloudinary.uploader.upload(req.files.file.path, {
        public_id: `${Date.now()}`,
        folder: "minifacebook",
      });

      user[type] = { url: upload.url, public_id: upload.public_id };
      await user.save();

      res.json(user);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = usersController;
