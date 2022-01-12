const express = require("express");
const { authenticateToken } = require("../utils/jwt");
const router = express.Router();
const productController = require("../controller/productController");

router.get("/getAllProductList", authenticateToken, async (req, res) => {
  const result = await productController.getAllProduct(req);
  return res.send(result);
});

router.get("/getProductPriceAscDesc", authenticateToken, async (req, res) => {
  const result = await productController.getAscDescPrice(req);
  return res.send(result);
})

router.post("/addProduct", authenticateToken, async (req, res) => {
  const result = await productController.createProduct(req);
  return res.send(result);
});

router.delete("/deleteProduct/:id", authenticateToken, async (request, response) => {
  const result = await productController.deleteProduct(request);
  return response.json(result);
});

router.get("/getProductById/:id", authenticateToken, async (request, response) => {
  const result = await productController.getProductById(request);
  return response.json(result);
});

router.put("/updateProductById/:id", authenticateToken, async (req, res) => {
  const result = await productController.updateProduct(req);
  return res.json(result);
});

module.exports = router;