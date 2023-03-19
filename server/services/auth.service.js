const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");
const { User } = require("../models/user");

const createUser = async (
  email,
  password,
  firstname,
  lastname,
  birthday,
  gender
) => {
  try {
    if (await User.emailTaken(email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Sorry email taken");
    }
    console.log(birthday);
    const user = new User({
      email,
      password,
      firstname,
      lastname,
      birthday,
      gender,
    });
    console.log(user);

    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const genAuthToken = (user) => {
  const token = user.generateAuthToken();
  return token;
};

module.exports = {
  createUser,
  genAuthToken,
};
