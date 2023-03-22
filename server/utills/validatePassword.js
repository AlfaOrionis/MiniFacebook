const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");

const validatePassword = (password) => {
  const regex = /^\S+$/;
  if (password.length < 6 || password.length > 19) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Password must have between 6 and 20 characters"
    );
  }
  if (!regex.test(password)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Password must not contain empty spaces"
    );
  }
};

module.exports = validatePassword;
