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
    const friend = await User.findOne({ _id: req.body._id });
    if (!friend) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    for (const i in user.friendsRequest) {
      if (user.friendsRequest[i]._id.toString() === req.body._id) {
        //If this request already exists, it means the user wants to cancel it, so i will delete it
        user.friendsRequest.splice(i, 1);
        friend.friendsRequest = friend.friendsRequest.filter(
          (request) => request._id.toString() !== user._id.toString()
        );

        await friend.save();
        await user.save();
        return friend;
      }
    }
    // for (const id in user.friends) {
    //   if (user.friends[id].toString() === req.body.id)
    //     throw new ApiError(
    //       httpStatus.BAD_REQUEST,
    //       "This user is already your friend"
    //     );
    // }

    //Creating request
    user.friendsRequest.push({ started: true, _id: friend._id });
    friend.friendsRequest.push({ started: false, _id: user._id });

    await friend.save();
    await user.save();
    //I will return friend to frontend so i can update the page
    return friend;
  } catch (err) {
    throw err;
  }
};

const confirmFriendRequest = async (req) => {
  const user = req.user;
  try {
    const friend = await User.findOne({ _id: req.body._id });
    if (!friend) throw new ApiError(httpStatus.NOT_FOUND, "User not found");

    friend.friendsRequest = friend.friendsRequest.filter(
      (request) => request._id.toString() !== user._id.toString()
    );
    friend.friends.push(user._id);

    user.friendsRequest = user.friendsRequest.filter(
      (request) => request._id.toString() !== friend._id.toString()
    );
    user.friends.push(friend._id);
    await friend.save();
    await user.save();

    return { user, friend };
  } catch (err) {
    throw err;
  }
};
module.exports = {
  confirmFriendRequest,
  findUserByEmail,
  findUserById,
  updateUserEmail,
  updatePassword,
  sendFriendRequest,
  validateToken,
  findUserByIdWithError,
};
