const express = require('express');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer')
const serverMailer = require('./mailer/serverMailer')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extend: false }))

app.post('/api/form', (req, res) => {
    // console.log((req.body))
    serverMailer(req, res)

    
})

module.exports = app;