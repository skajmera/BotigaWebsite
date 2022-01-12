const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({

  isVerified: {
    type: Boolean,
    default: false,
  },
  profileImage: {
    type: String,
  },
  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },
  contact: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
  }
});

const User = mongoose.model("UserBotiga", UserSchema);
module.exports = User;
