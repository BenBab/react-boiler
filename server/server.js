const express = require('express');
const bodyParser = require('body-parser');
const serverMailer = require('./mailer/serverMailer')

const path = require('path');
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extend: false }))

app.post('*/api/mailer', (req, res) => {
    serverMailer(req, res)
})

//Static file declaration
app.use(express.static(path.join(__dirname, '/build')));


//production mode
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '/build')));
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname = '/build/index.html'));
    });
  }

//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'));
})

  
module.exports = app;