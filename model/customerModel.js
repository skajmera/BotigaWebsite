const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({

  // subscriptionId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'subscription'
  // },

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
  },
  inviteLink: {
    type: Boolean
  }
});

const Customer = mongoose.model("customers", UserSchema);
module.exports = Customer;
