const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  orders: {
    type: Array,
    default: [],
  },
  razorpay_order_id:{
    type:String
  }
});

module.exports = mongoose.model("Order", orderSchema);
