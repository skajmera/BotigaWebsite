const chatUser = require("../model/chatDataModel");

// const findUser = async (data) => {
//   const userData = await chatUser.findById(data);
//   return userData;
// };

const storeUser = async (userToStore) => {
  const storedUser = await chatUser.create(userToStore);
  return storedUser;
};

const updateUser = async (userData) => {
  const user = await chatUser.findOneAndUpdate(
    userData.userId,
    { $set: userData.toUpdate },
    { new: true }
  );
  return user;
};

const deleteUser = async (data) => {
  const user = await chatUser.deleteMany({ userId: data.userId });
  return user;
};


const findUserChatId = async (data) => {
    const userData = await chatUser.find(data);
    return userData;
  };
module.exports = {  storeUser, updateUser, deleteUser, findUserChatId };
