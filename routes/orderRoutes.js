const express = require("express");
const { authenticateToken } = require("../utils/jwt");
const router = express.Router();
const orderController = require("../controller/orderController");

router.post("/addOrder", authenticateToken, async (req, res) => {
    const result = await orderController.createOrder(req);
    return res.send(result);
});

router.put("/billingDetails", authenticateToken, async (req, res) => {
    const result = await orderController.billing(req);
    return res.send(result);
});

router.delete("/deleteOrder/:customerId", authenticateToken, async (request, response) => {
    const result = await orderController.deleteOrder(request);
    return response.json(result);
});

router.delete("/deleteOrderBy/:orderId", authenticateToken, async (request, response) => {
    const result = await orderController.deleteOrderById(request);
    return response.json(result);
});

router.get("/getOrderById/:id", authenticateToken, async (request, response) => {
    const result = await orderController.getOrderById(request);
    return response.json(result);
});

// router.put("/updateOrderById/:CustomerId", authenticateToken, async (req, res) => {
//     const result = await orderController.updateProduct(req);
//     return res.json(result);
// });

router.put("/checkout/:CustomerId", authenticateToken, async (req, res) => {
    const result = await orderController.updateCheckout(req);
    return res.json(result);
});

module.exports = router;



// "prodId": "61d97bd8a15dc0f3fc84d2c3",
// "_id": "61dc0762e4dbc9a39270cc61"
// }
// ],
// "_id": "61dc0762e4dbc9a39270cc60",
// "__v": 0
// }

////////////

// {
//     "orderItems":[
//         {
//             "name": "ajmera",
//             "qty": 2,
//             "image":"/image/df.png.",
//             "price":213,
//             "product":"61d97bd8a15dc0f3fc84d2c3",
//             "customerId":"61dbe13222c6eea5eb32edb7",
//             "prodId":"61d97bd8a15dc0f3fc84d2c3",
//             "customer":"61dbe13222c6eea5eb32edb7"
//         }
//     ],
//     "customer":"61dbe13222c6eea5eb32edb7"
// }