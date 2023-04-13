const filterUser = (user) => {
  // Just clearing response
  delete user._doc.password;
  return user;
};

module.exports = filterUser;
