const express = require("express");
const { authenticateToken } = require("./utils/jwt");
const router = express.Router();
const orderController = require("./controller/orderController");
const paypal = require('paypal-rest-sdk');
require('dotenv').config()
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.client_id,
    'client_secret': process.env.client_secret
});
router.get('/d',(req,res)=>{
    res.send("hello")
})

router.get('/', (req, res) => res.sendFile(__dirname + "/index.html"));

router.post('/pay', (req, res) => {
    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:3001/payments/success",
          "cancel_url": "http://localhost:3001/payments/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "Redhock Bar Soap",
                  "sku": "001",
                  "price": "25.00",
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": "25.00"
          },
          "description": "Washing Bar soap"
      }]
  };
  
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === 'approval_url'){
              console.log("link",payment.links[i].href)
            res.redirect(payment.links[i].href);
          }
        }
    }
  });
  });

  router.get('/success', (req, res) => {
      console.log("ok")
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": "25.00"
          }
      }]
    };
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          let data=JSON.stringify(payment)
          data.customer="61dbe13222c6eea5eb32edb7"
          const data2={
              paymentMethod:data
          }
//           let data={
//     "currency":"USD", //req.body.currency,
// "totalPrice":24000,// req.body.totalAmount,
// "paidAt":new Date(),
// "productPurchase":"laptop",//req.body.product,
// "payerId":payerId,
// "isPaid":true,
// "paymentMethod":"paypal",
// "paymentResult": {
//     "id": paymentId,
//     "status":true,
//     "update_time":new Date(),
//     "email_address": "sss",//req.body.email
// },
// }

const result = orderController.paymentDetails(data2);
        return  res.send(result);
      }
  });
  });

router.get('/cancel', (req, res) => res.send('Cancelled'));

module.exports = router



// sb-whjap10785749@business.example.com

