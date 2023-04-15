const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");
const { User } = require("../models/user");
const validatePassword = require("../utills/validatePassword");
const isFifteen = require("../utills/isFifteen");

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
    const birthdayDate = new Date(birthday);
    const ageValid = isFifteen(birthdayDate);
    if (!ageValid)
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "You must be atleast 15 years old!"
      );

    validatePassword(password);
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

const signInWithEmailAndPassword = async (email, password) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Wrong email or password");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  genAuthToken,
  signInWithEmailAndPassword,
};
