const axios = require('axios')
var request = require('request');

exports.cancelOrder = async(req, res) => {
    const data = req.body

    var username = process.env.KEY_ID;
    var password = process.env.KEY_SECRET
    var auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
    const body= {"account_number": "7878780080316316",
    "amount": 1000000,
    "currency": "INR",
    "mode": "NEFT",
    "purpose": "refund",
    "fund_account": {
        "account_type": "bank_account",
        "bank_account": {
            "name": "Gaurav Kumar",
            "ifsc": "HDFC0001234",
            "account_number": "1121431121541121"
        },
        "contact": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9876543210",
            "type": "vendor",
            "reference_id": "Acme Contact ID 12345",
            "notes": {
                "notes_key_1": "Tea, Earl Grey, Hot",
                "notes_key_2": "Tea, Earl Grey… decaf."
            }
        }
    },
    "queue_if_low_balance": true,
    "reference_id": "Acme Transaction ID 12345",
    "narration": "Acme Corp Fund Transfer",
    "notes": {
        "notes_key_1": "Beam me up Scotty",
        "notes_key_2": "Engage"
    }
}
    
   const resp = await axios.post('https://api.razorpay.com/v1/payouts',body,{headers: {'Authorization': auth,
    "Content-Type": "application/json",}
    
}, )
console.log(resp.data);
res.send(resp.data)

// let contactId;
    
// let contactUrl = "https://api.razorpay.com/v1/contacts" 
// let fundAccountUrl = "https://api.razorpay.com/v1/fund_accounts"
// request.get( {
//     url : contactUrl,
//     headers : {
//         "Content-Type": "application/json",
//         "Authorization" : auth
//     },
   
//   }, function(error, response, bod) {
//       console.log('body1 : ',JSON.parse(bod).items[0]);
//       contactId = JSON.parse(bod).items[0].id
//       res.send(bod.id)
//   } );

//   let fund_accountsId;
//   request.get( {
//     url : fundAccountUrl,
//     headers : {
//         "Content-Type": "application/json",
//         "Authorization" : auth
//     }
//   }, function(error, response, body) {
//       console.log('body2 : ',JSON.parse(body).items[0]);
//       fund_accountsId = JSON.parse(body).items[0].id
//       res.send(body.id)
//   } );
}