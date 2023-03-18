const mongoose = require("mongoose");
const validator = require("validator");
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
    trim: true,
  },
  firstname: {
    type: String,
    maxLength: 100,
    trim: true,
    default: "",
  },
  lastname: {
    type: String,
    maxLength: 100,
    trim: true,
    default: "",
  },
  birthday: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  currentTown: {
    type: String,
    required: false,
    maxLength: 50,
  },
  work: [{ type: String, maxLength: 100 }],
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

const User = mongoose.model("User", userSchema);
module.exports = { User };
