const filterUser = (user) => {
  // Just clearing response off password and email
  delete user._doc.password;
  delete user._doc._id;
  return user;
};

module.exports = filterUser;
