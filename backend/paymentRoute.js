const router = require('express').Router()
const {createOrder,paymentCallback, getLogo,getPayment} = require('./paymentController')
const {cancelOrder} = require('./cancelOrder')

router.get('/',(req,res)=>{
    res.send("Hello")
})

router.get('/createOrder', createOrder)
router.get('/payment/callback',paymentCallback)
router.get('/payments/:paymentId',getPayment)
router.get('/logo',getLogo)
router.post('/cancelOrder',cancelOrder)

module.exports=router;