const mongoose = require("mongoose");
const UserChat = new mongoose.Schema({
  name: {
    type: String,
  },

  userId: {
    type: String,
  },
  message: {
    type: String
  },
  msgTime: {
    type: String,
  },
  msgDate: {
    type: String,
  }
});

const chatUser = mongoose.model("chatBotiga", UserChat);
module.exports = chatUser;