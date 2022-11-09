const Razorpay = require('razorpay')
require('dotenv').config()
const uniqID = require('uniqid')
const path = require('path')
const Formidable = require('formidable')
const crypto = require('node:crypto')
const orderSchema = require('./orderSchema')
const request = require('request')
let orderId

var instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});



exports.createOrder = (req, res) => {
  var options = {
    amount: 50000,  // amount in the smallest currency unit
    currency: "INR",
    receipt: uniqID()
  };
  instance.orders.create(options, function (err, order) {
    if (err) {
      console.log(err);
      return res.status(500).json({ Error: err })
    }
    orderId = order.id
    res.json(order)
    
  })
}

exports.paymentCallback = (req, res) => {
  
  let f;
  console.log("RES",orderId);
  
    if (req.query) {
     
      const hash = crypto.createHmac('sha256', process.env.KEY_SECRET)
        .update(req.query.razorpay_order_id + "|" + req.query.razorpay_payment_id)
        .digest('hex');
      if (req.query.razorpay_signature === hash) {
        const info = {
          _id: req.query.razorpay_payment_id,
          razorpay_order_id: req.query.razorpay_order_id
        }
// console.log(req.query);
        const order = new orderSchema(info)
        order.save((err, data) => {
          if (err) {
            return res.status(400).json({ error: "Details are not saved" })
          }
          else {
            res.redirect(`${process.env.FRONTEND}/payment/status/${req.query.razorpay_payment_id}`)
          }
        })
      }
    }
    else {
      return res.send("Error")
    }
  

}

exports.getLogo = (req, res) => {
  res.sendFile(path.join(__dirname, 'comp.png'))
}

exports.getPayment = async (req, res) => {
  const data = await orderSchema.findById(req.params.paymentId)
  if (!data) {
    return res.status(404).json({ error: "No payment found!" })
  }
  else {
    request(
      `https://${process.env.KEY_ID}:${process.env.KEY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}`,
      function (error, response, body) {
        if (body) {
          console.log(body);
          const result = JSON.parse(body);
          res.status(200).json(result);
        }
      }
    );
  };

}