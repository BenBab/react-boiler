const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const serverMailer = require('./mailer/serverMailer');

const {Provider} = require('react-redux')
const {renderToString} = require('react-dom/server')
const {StaticRouter} = require('react-router-dom')

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extend: false }))

app.get('/timestamp', (request, response) => {
    response.send(`${Date.now()}`);
})

app.post('*/api/mailer', (req, res) => {
    serverMailer(req, res)
})



exports.app = functions.https.onRequest(app);
