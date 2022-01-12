const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    // customer: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required:true,
    //     ref: 'Customer'
    // },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            // product: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'},
            customerId: { type: String },
            prodId: { type: String }
        }
    ],
    billingAddress: [{
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        companyName: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        houseNumber: { type: String, required: true },
        streetAddress: { type: String, required: true },
        landmark: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        country: { type: String, required: true }
    }],
    paymentMethod: {
        type: String,
        // required: true
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date,
    },
    productPurchase: {
        type: String
    },

}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order

////////////

// ,
//     "shippingAddress": {
//         "houseNumber":"23",
//         "streetNumber":"112",
//         "landmark":"",
//         "city":"dewas",
//         "state":"madhyapradesh",
//         "pincode":"455336",
//         "country":"USA"
//     }
//61dc0f3e8429a4a358b80016