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
      console.log("EMAIL already on the DB");
      /// throw error;
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

module.exports = {
  createUser,
};
