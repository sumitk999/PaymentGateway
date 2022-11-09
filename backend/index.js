const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const paymentRoute = require('./paymentRoute')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://localhost/PaymentGatway', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log("mongodb connected"))

app.use(bodyParser.json())
app.use(cors())

app.use('/api', paymentRoute)



app.get("", (req, res) => {
    console.log('res', res)
    return res.json({
        message: 'app is running'
    })
})


app.listen(5001, () => {
    console.log("Server is running on port 5001");
})