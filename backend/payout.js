const axios = require('axios')
const CircularJSON = require('circular-json')
var username = process.env.KEY_ID;
var password = process.env.KEY_SECRET
var auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

exports.contacts = async (req, res) => {
    const userDetails = {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9123456789",
        "type": "employee",
        "reference_id": "Acme Contact ID 12345",
        "notes": {
            "notes_key_1": "Tea, Earl Grey, Hot",
            "notes_key_2": "Tea, Earl Grey… decaf."
        }
    }
    const header = {
        "Content-Type": "application/json",
        "Authorization": auth
    }
    const datas = await axios.post("https://api.razorpay.com/v1/contacts", userDetails, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": auth
        }
    })
    res.json(datas.data)
}

exports.fundAccount = async (req, res) => {

    const accountDetails = {
        "contact_id": req.body.contact,
        "account_type": "bank_account",
        "bank_account": {
            "name": "Gaurav Kumar",
            "ifsc": "HDFC0000053",
            "account_number": "765432123456789"
        }
    }

    const datas = await axios.post("https://api.razorpay.com/v1/fund_accounts", accountDetails, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": auth
        }
    })

    res.json(datas.data)
}

exports.payouts = async (req,res)=>{
  const payout =  {
        "account_number": "7878780080316316",
        "fund_account_id": req.body.account,
        "amount": 1000000,
        "currency": "INR",
        "mode": "IMPS",
        "purpose": "refund",
        "queue_if_low_balance": true,
        "reference_id": "Acme Transaction ID 12345",
        "narration": "Acme Corp Fund Transfer",
        "notes": {
          "notes_key_1":"Tea, Earl Grey, Hot",
          "notes_key_2":"Tea, Earl Grey… decaf."
        }
    }

    const datas = await axios.post("https://api.razorpay.com/v1/payouts", payout, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": auth
        }
    })

    res.json(datas.data)
}