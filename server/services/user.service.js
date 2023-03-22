const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");
const { User } = require("../models/user");
const validatePassword = require("../utills/validatePassword");
const validateEmail = require("../utills/validateEmail");

const findUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

const findUserById = async (_id) => {
  return await User.findById(_id);
};

const updateUserProfile = async (req) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
        },
      },
      { new: true }
    );
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUserEmail = async (req) => {
  const { newEmail } = req.body;

  try {
    if (await User.emailTaken(newEmail)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Sorry email taken");
    }

    validateEmail(newEmail);

    const user = await User.findOneAndUpdate(
      { _id: req.user._id, email: req.user.email },
      {
        $set: {
          email: newEmail,
          verified: false,
        },
      },
      { new: true }
    );
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const updatePassword = async (req) => {
  try {
    const { currentPassword, newPassword } = req.body;

    validatePassword(newPassword);

    const match = await req.user.comparePassword(currentPassword);

    if (!match) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Wrong Password");
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    user.password = newPassword;

    const updatedUser = await user.save();

    return updatedUser;
  } catch (err) {
    throw err;
  }
};
module.exports = {
  findUserByEmail,
  findUserById,
  updateUserProfile,
  updateUserEmail,
  updatePassword,
};
