const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  /// NAME SCHEMA
  fname: {
    type: String,
    minimumLength: [3, "firstname must be at least 3 characters"],
  },
  lname: {
    type: String,
    minimumLength: [3, "firstname must be at least 3 characters"],
  },
  username: {
    type: String,
    required: true,
    minimumLength: [3, "firstname must be at least 3 characters"],
    maxLength: [20, "username must not exceed 20 characters"],
    lowercase: true,
  },

  nameChangedAt: Date,

  /// EMAIL SCHEMA
  email: {
    type: String,
    required: [true, "Please enter your email address"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },

  emailVerified: {
    type: Boolean,
    default: false,
  },

  emailChangedAt: Date,

  /// PASSWORD SCHEMA
  password: {
    type: String,
    required: [true, "Please enter your password"],
    // removes password from query results
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      /// NB:This only works on CREATE and on SAVE!!
      validator: function (passwordValue) {
        return passwordValue === this.password;
      },
      message: "Passwords do not match! Please try again",
    },
  },

  /// WALLET SCHEMA
  walletAddress: {
    type: String,
    validate: [
      validator.isEthereumAddress,
      "Please provide a valid ETH address",
    ],
  },

  /// SCORE SCHEMA
  score: {
    type: Number,
    default: 0,
  },

  quizCount: {
    type: Number,
    default: 0,
  },

  scoreUpdatedAt: Date,

  /// PROFILE DETAILS SCHEMA
  avatar: {
    public_id: String,
    url: String,
  },
  coverPhoto: {
    public_id: String,
    url: String,
  },

  photo: String,

  gender: String,

  state: String,

  country: String,

  town: String,

  interests: {
    type: Array,
    default: [],
  },

  dob: String,

  about: String,

  profession: {
    type: String,
    maxlength: 100,
  },

  location: {
    type: String,
  },
  website: {
    type: String,
  },

  /// ACCOUNT STATUS SCHEMA
  accountStatus: {
    type: String,
    enum: [
      "active",
      "inactive",
      "deactivated",
      "suspended",
      "blocked",
      "deleted",
      "banned",
      "reported",
      "pending",
      "withheld",
      "restricted",
    ],
    default: "active",
  },

  /// ADDITIONAL DATA FOR USERS ///
  isValid: {
    type: Boolean,
    default: false,
  },

  isPrivate: {
    type: Boolean,
    default: false,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },

  deletedAt: {
    type: Date,
    default: null,
  },

  deletionRequest: {
    type: Boolean,
    default: false,
  },

  deletionRequestedAt: {
    type: Date,
    default: null,
  },

  showOnlineStatus: {
    type: Boolean,
    default: true,
  },

  lastSeen: {
    type: Date,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// encrypting the password with the "bcrypt" hashing algorithm
UserSchema.pre("save", async function (next) {
  // only run this function if the password was actually modified
  if (!this.isModified("password")) return next();

  // hash password
  this.password = await bcrypt.hash(this.password, 12);

  // set passwordConfirmat to undefined to NOT persis to DB
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
