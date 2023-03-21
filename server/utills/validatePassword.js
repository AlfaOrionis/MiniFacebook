const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");

const validatePassword = (password) => {
  const regex = /^\S+$/;
  if (password.length < 6) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Password must be atleast 6 characters"
    );
  }
  if (regex.test(password)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Password must not contain empty spaces"
    );
  }
};

module.exports = validatePassword;
