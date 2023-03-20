const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const isFifteen = require("../utills/isFifteen");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  firstname: {
    type: String,
    maxLength: 100,
    minLength: 2,
    trim: true,
    default: "",
  },
  lastname: {
    type: String,
    maxLength: 100,
    minLength: 2,
    trim: true,
    default: "",
  },
  birthday: {
    type: Date,
    required: true,
    validate(value) {
      if (!validator.isDate(value)) {
        throw new Error("Birthday must be type of Date");
      }

      const ageValid = isFifteen(value);
      if (!ageValid) throw new Error("You must be atleast 15 years old!");
    },
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  currentTown: {
    type: String,
    required: false,
    maxLength: 50,
  },
  work: { type: String, maxLength: 100 },
  education: {
    type: String,
    required: false,
    maxLength: 100,
  },

  phone: {
    type: String,
    required: false,
    maxLength: 30,
    minLength: 9,
  },

  verified: {
    type: Boolean,
    default: false,
  },
  relationship: {
    type: String,
    required: false,
    enum: [
      "Single",
      "In a relationship",
      "Engaged",
      "Married",
      "Divorced",
      "Widowed",
    ],
  },
});

userSchema.pre("save", async function (next) {
  let user = this;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }

  next();
});

userSchema.methods.generateAuthToken = function () {
  let user = this;
  const userObj = { sub: user._id.toHexString() };
  const token = jwt.sign(userObj, process.env.DB_SECRET, { expiresIn: "1d" });
  return token;
};

userSchema.statics.emailTaken = async function (email) {
  const user = await this.findOne({ email });
  return !!user;
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  const match = await bcrypt.compare(candidatePassword, user.password);
  return match;
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
