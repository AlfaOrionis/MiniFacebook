const filterUser = (user) => {
  // Just clearing response
  delete user._doc.password;
  delete user._doc._id;
  return user;
};

module.exports = filterUser;
