const userController = require("../controller/chatDataController");
const express = require("express");
const { authenticateToken } = require("../utils/jwt");       
const router = express.Router();
  router.post("/getUserById", async (request, response) => {
    const result = await userController.getUser(request);
    return response.send(result);
  });

  router.put(
    "/updateById",
    // { preHandler: authenticateToken },
    async (req, res) => {
      const result = await userController.updateUser(req);
      return res.send(result);
    }
  );

  router.delete(
    "/deleteById",
    // { preHandler: authenticateToken },
    async (req, res) => {
      const result = await userController.deleteUser(req);
      return res.send(result);
    }
  );

module.exports = router;