const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"]
  },

  roles: {
    type: [String],
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },

  verificationToken: {
    type: String,
    default: null,
  },
  profilePhoto: {
    type: String,
    default: ""
  },
});

module.exports = userSchema;