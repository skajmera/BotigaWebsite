const chatController = require("../controller/chatDataController");
const express = require("express");
const { authenticateToken } = require("../utils/jwt");       
const router = express.Router();
  router.post("/getUserById", async (request, response) => {
    const result = await chatController.getData(request);
    return response.send(result);
  });

  router.put(
    "/updateById",
    authenticateToken,
    async (req, res) => {
      const result = await chatController.updateData(req);
      return res.send(result);
    }
  );

  router.delete(
    "/deleteById",
    authenticateToken,
    async (req, res) => {
      const result = await chatController.deleteData(req);
      return res.send(result);
    }
  );

module.exports = router;