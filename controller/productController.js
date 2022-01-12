const productDataAccess = require("../dal/productDal");
require("dotenv").config();
const ExpressError = require("../utils/errorGenerator");

exports.getAllProduct = async (req) => {
  const products = await productDataAccess.findAllProduct(req);
  return {
    error: false,
    sucess: true,
    message: "Get all products",
    data: products,
  };
};

exports.getAscDescPrice = async (req) => {
  const products = await productDataAccess.findProdPriceAscDesc(req);
  return {
    error: false,
    sucess: true,
    message: "Get all products",
    data: products,
  };
};

exports.getProductById = async (req) => {
  const _id = req.params.id;
  const product = await productDataAccess.findProduct({ _id: _id });
  return {
    error: false,
    sucess: true,
    message: "Get product",
    data: product,
  };
};

exports.createProduct = async (req) => {
  const { name, category, price, profile, brand, description } = req.body;
  if (!name || !category || !price || !profile || !brand || !description) {
    throw new ExpressError(401, "Bad request");
  }
  const userId = req.token_data._id
  //   const New = await productDataAccess.findProductByProductName({ userId: prodid })
  //   console.log(!New)
  //   if(!New){
  const data = {
    userId: userId,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    profile: req.body.profile,
    description: req.body.description,
    brand: req.body.brand
  };
  const storedProduct = await productDataAccess.storeProduct(data);
  return {
    error: false,
    sucess: true,
    message: "product created successfully",
    data: storedProduct,
  }
  // }
  //   else{
  //     return ("product with this token already exist")
  //   }
};

exports.updateProduct = async (req, res) => {
  const _id = req.params.id;
  const updateData = {
    _id,
    toUpdate: {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      brand: req.body.brand,
      profile: req.body.profile
    },
  };

  const update = await productDataAccess.updateProduct(updateData);
  return {
    error: false,
    sucess: true,
    message: "updated product successfully",
    data: update,
  };
};

exports.deleteProduct = async (req, res) => {
  const _id = req.params.id;
  const deleteProduct = await productDataAccess.deleteProduct({ _id: _id });
  return {
    error: false,
    sucess: true,
    message: "updated product successfully",
    data: deleteProduct,
  };
};



