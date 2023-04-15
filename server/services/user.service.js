const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
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
const findUserByIdWithError = async (_id) => {
  const user = await User.findById(_id);
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  return user;
};
const validateToken = async (token) => {
  return jwt.verify(token, process.env.DB_SECRET);
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

const sendFriendRequest = async (req) => {
  const user = req.user;
  try {
    const friend = await User.findOne({ _id: req.body.id });
    if (!friend) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    for (const id in user.friendsRequest) {
      if (user.friendsRequest[id].toString() === req.body.id)
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "You already sent friend request to this user"
        );
    }
    for (const id in user.friends) {
      if (user.friends[id].toString() === req.body.id)
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "This user is already your friend"
        );
    }

    user.friendsRequest.push(friend._id);
    friend.friendsRequest.push(user.id);
    await friend.save();
    await user.save();
    return user;
  } catch (err) {
    throw err;
  }
};
module.exports = {
  findUserByEmail,
  findUserById,
  updateUserEmail,
  updatePassword,
  sendFriendRequest,
  validateToken,
  findUserByIdWithError,
};
