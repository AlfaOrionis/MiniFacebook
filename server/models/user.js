const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
    minLength: 6,
    trim: true,
  },
  firstname: {
    type: String,
    maxLength: 100,
    minLength: 2,
    trim: true,
    required: true,
  },
  lastname: {
    type: String,
    maxLength: 100,
    minLength: 2,
    trim: true,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
    validate(value) {
      console.log(value);
      if (!validator.isDate(value)) {
        throw new Error("Birthday must be type of Date");
      }
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
  description: {
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
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  ],
  friendsRequest: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  ],
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
  const token = jwt.sign(userObj, process.env.DB_SECRET, { expiresIn: "2h" });
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
