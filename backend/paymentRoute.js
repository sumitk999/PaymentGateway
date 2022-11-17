const router = require('express').Router()
const {createOrder,paymentCallback, getLogo,getPayment} = require('./paymentController')
const {contacts,fundAccount,payouts} = require('./payout')

router.get('/',(req,res)=>{
    res.send("Hello")
})

router.get('/createOrder', createOrder)
router.get('/payment/callback',paymentCallback)
router.get('/payments/:paymentId',getPayment)
router.get('/logo',getLogo)
router.post('/contact',contacts)
router.post('/fund_account',fundAccount)
router.post('/payouts',payouts)

module.exports=router;