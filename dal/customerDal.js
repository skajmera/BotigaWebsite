const Customer = require("../model/customerModel");
require("../utils/jwt");

const findUser = async (data) => {
  const customer = await Customer.findById(data);
  return customer;
};

const storeUser = async (userToStore) => {
  const storedUser = await Customer.create(userToStore);
  return storedUser;
};

const findUserByUsername = async (username) => {
  const customer = await Customer.findOne(username);
  return customer;
};

const updateUser = async (userData) => {
  const user = await Customer.findByIdAndUpdate(
    userData._id,
    { $set: userData.toUpdate },
    { new: true }
  );
  return user;
};

const findAll = async () => {
  const user = await Customer.find({});
  return user;
};

const deleteAll = async () => {
  const user = await Customer.remove({});
  return user;
};

module.exports = {
  findUser,
  storeUser,
  findUserByUsername,
  updateUser,
  findAll,
  deleteAll,
};
