const Product = require("../model/productModel");

const findProduct = async (data) => {
  const product = await Product.findById(data);
  return product;
};

const storeProduct = async (productToStore) => {
  const storedProduct = await Product.create(productToStore);
  return storedProduct;
};

const updateProduct = async (productData) => {
  const product = await Product.findByIdAndUpdate(
    productData._id,
    { $set: productData.toUpdate },
    { new: true }
  );
  return product;
};

const findAllProduct = async (req) => {
const products = await Product.find(req.body)
  return products;
};

const findProdPriceAscDesc = async (req) => {
  const products = await Product.aggregate([
    {
      "$sort": {
        price: req.body.price
      }
    }
  ])
  return products;
};

const findProductByProductName = async (productName) => {
  const product = await Product.findOne(productName);
  return product;
};

const deleteProduct = async (deleteData) => {
  const product = await Product.remove(deleteData);
  return product;
};

module.exports = {
  findProduct,
  storeProduct,
  updateProduct,
  findAllProduct,
  deleteProduct,
  findProductByProductName,
  findProdPriceAscDesc
};
