const { User } = require("../models/user");
require("dotenv").config();

const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const jwtOptions = {
  secretOrKey: process.env.DB_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    const user = await User.findById(payload.sub)
      .populate({
        path: "notifications._id",
        select: "firstname lastname profilePicture",
      })
      .populate({
        path: "friends._id",
        select: "firstname lastname profilePicture",
      });
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
