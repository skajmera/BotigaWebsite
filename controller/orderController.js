const orderDataAccess = require("../dal/orderDal");

require("dotenv").config();
const ExpressError = require("../utils/errorGenerator");

exports.getOrderById = async (req) => {
    const _id = req.params.id;
    const order = await orderDataAccess.findAllOrder({ _id });
    return {
        error: false,
        sucess: true,
        message: "Getorder by customer",
        data: order,
    };
};

exports.createOrder = async (req) => {
    const { orderItems } = req.body;
    if (!orderItems) {
        throw new ExpressError(401, "Bad request");
    }
    const customerId = req.token_data._id
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    }
    req.body.customeId = customerId
    const storedOrder = await orderDataAccess.storeOrder(req.body);
    return {
        error: false,
        sucess: true,
        message: "order created successfully",
        data: storedOrder,
    }
};


exports.paymentDetails = async (data) => {
    // const customerId = "61dbe13222c6eea5eb32edb7"//req.token_data._id
    // data.customerId=customerId

    const storedOrder = await orderDataAccess.storeOrder(data);
    return {
        error: false,
        sucess: true,
        message: "payment details successfully saved.",
        data: storedOrder,
    }
};

exports.billing = async (req) => {
    const { billingAddress } = req.body;
    if (!billingAddress) {
        throw new ExpressError(401, "Bad request");
    }
    const customerId = req.token_data._id
    if (billingAddress && billingAddress.length === 0) {
        res.status(400)
        throw new Error('No order items')
    }
    req.body.customerId = customerId
    const updateData = {
        customerId,
        toUpdate: (
            req.body),
    };

    const updateDetails = await orderDataAccess.updateDetails(updateData);
    return {
        error: false,
        sucess: true,
        message: "update details billing successfully",
        data: updateDetails,
    }
};


exports.updateCheckout = async (req) => {
    const { price, quantity, } = req.body;
    if (!price || !quantity) {
        throw new ExpressError(401, "Bad request");
    }
    const customerId = req.token_data._id
    const updateData = {
        customerId,
        toUpdate: {
            totalPrice: price * quantity

        },
    };
    const updateDetails = await orderDataAccess.updateDetails(updateData);
    return {
        error: false,
        sucess: true,
        message: "update details billing successfully",
        data: updateDetails,
    }
};
// exports.updateProduct = async (req, res) => {
//     const _id = req.params.id;
//     const updateData = {
//       _id,
//       toUpdate: {
//           name: req.body.name,
//           category: req.body.category,
//           price: req.body.price,
//           description:req.body.description,
//           brand:req.body.brand,
//           profile:req.body.profile
//       },
//     };

exports.deleteOrder = async (req, res) => {
    const _id = req.params.customerId;
    console.log(_id)
    const deleteOrder = await orderDataAccess.deleteOrder({ customerId: _id });
    return {
        error: false,
        sucess: true,
        message: "delete order successfully",
        data: deleteOrder,
    };
};

exports.deleteOrderById = async (req, res) => {
    const _id = req.params.orderId;
    const deleteOrder = await orderDataAccess.deleteOrder({ _id: _id });
    return {
        error: false,
        sucess: true,
        message: "delete order successfully",
        data: deleteOrder,
    };
};

/*
"billingAddress":[{
        "firstName":"ajmera",
        "lastName":"sk",
        "companyName":"brain Inventory",
        "email":"ajmera@gmail.com",
        "phoneNumber":90092133,
        "houseNumber":"house no 34",
        "streetAddress":"dfdfg",
        "landmark":"df4fc",
        "city":"dewas",
        "state":"madhyapradesh",
        "pincode":455336,
        "country":"india"
    }],"price":20,
    "product":"botal",
    "quantity":2,
    "email":"subhashajmera2@gmail.com",
    "password":"subh@123"}

    */