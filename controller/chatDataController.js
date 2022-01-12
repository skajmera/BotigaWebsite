const usersDataAccess = require("../dal/chatDataDal");
const {generateAccessToken}=require('../utils/jwt')
require("dotenv").config();

exports.getUser = async (req) => {
  const userId = req.body.userId;
  const users = await usersDataAccess.findUserChatId({userId: userId});
//   const token=generateAccessToken({_id:users._id})
  return {
    error: false,
    sucess: true,
    message: "Get chat data",
    data: users,
    // token:token
  };
};

exports.saveUserChat = async (req) => {
  const { userId, name, message} = req;
  if (!userId || !name || !message) {
    throw new ExpressError(401, "Bad request");
  }
  ////
  const users = await usersDataAccess.findUserChatId({ "userId": userId });
  ////
  const data = {
    name: name,
    message: message,
    msgDate: new Date(),
    msgTime: new Date() ,
    userId:userId
  };
  if(users){
  const storedUserchat = await usersDataAccess.storeUser(data);
  return {
    error: false,
    sucess: true,
    message: "user chat data saved successfully",
    data: storedUserchat,
  }}
  else{
      const storedUserchat = await usersDataAccess.storeUser(data);
      return {
        error: false,
        sucess: true,
        message: "user chat data saved successfully",
        data: storedUserchat,
      }
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.body.userId;
  const updateData = {
    userId,
    toUpdate: {
      name: req.body.name,
    },
  };

  const update = await usersDataAccess.updateUser(updateData);
  return {
    error: false,
    sucess: true,
    message: "updated user name successfully",
    data: update,
  };
};

exports.deleteUser = async (req, res) => {
  const data = await usersDataAccess.deleteUser(req.body);
  return {
    error: false,
    sucess: true,
    message: "delete user successfully",
    data: data,
  };
};