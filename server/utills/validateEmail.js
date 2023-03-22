const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Please enter valid email adress"
    );
  }
};

module.exports = validateEmail;
