const Order = require("../model/orderModel");

const storeOrder = async (productToStore) => {
  const storedProduct = await Order.create(productToStore);
  console.log(storedProduct)
  return storedProduct;
};

const findAllOrder = async (data) => {
  const products = await Order.find(data);
  return products;
};

const deleteOrder = async (deleteData) => {
  const product = await Order.remove(deleteData);
  return product;
};

const updateDetails = async (updateData) => {
  const details = await Order.findOneAndUpdate(
    updateData.customerId,
    { $set: updateData.toUpdate },
    { new: true }
  );
  return details;
};

//   const updateProduct = async (productData) => {
//     const product = await Product.findByIdAndUpdate(
//       productData._id,
//       { $set: productData.toUpdate },
//       { new: true }
//     );
//     return product;
//   };

module.exports = {
  storeOrder,
  findAllOrder,
  deleteOrder,
  updateDetails,
};
