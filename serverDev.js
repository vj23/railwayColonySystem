'use strict';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const accountSid = 'ACa96460e2ea783a1aa6cba214062242a4';
const authToken = '24786511e125ab2940fef076c1c69669';
const client = require('twilio')(accountSid, authToken);
var bodyParser = require('body-parser');
var loginJson = require('./loginJson');
const { Op } = require('sequelize');
console.log(loginJson);
var urlencodedParser = bodyParser.urlencoded({ extended: true })

var moment = require('moment')

const app = express();
const compiler = webpack(config);
const models = require('./models')

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

// app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.post('/updateWork', urlencodedParser, function (req, res) {

  console.log(req.body)
  let task = models.task.build(/* {
    incharge: req.body.incharge,
    gang: req.body.gang,
    unit: req.body.unit,
    compliance:req.body.compliance,
    materialreq:req.body.materialreq,
    grievance:req.body.materialreq
  } */
    req.body
  )
  task.save().then(function () { })

  let msg = req.body.incharge + "  Task1 Status: " + req.body.id
  client.messages
    .create({
      body: msg,
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+918588897294'
    })
    .then(message => console.log(message.sid))
    .done();

  client.messages
    .create({
      body: msg,
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+919106427762'
    })
    .then(message => console.log(message.sid))
    .done();

  res.status(200).send("updated")
})

app.post('/loginAuthentication', urlencodedParser, function (req, res) {

  console.log(req.body)
  let username = req.body.username
  let response = {}

  if (loginJson[username]) {
    if (loginJson[username]['password'] == req.body.password) {
      console.log("Validating id and password")
      response['role'] = loginJson[username]['role']
      response['gangs'] = loginJson[username]['gangs']
      response['unit'] = loginJson[username]['unit']
      response['incharge'] = loginJson[username]['incharge']
      response['error'] = "authorised"
    } else {
      console.log("Wrong password")
      response['error'] = 'Wrong password'
    }
  }
  else {
    console.log("Wrong username")
    response['error'] = 'Username not availble'
  }
  res.end(JSON.stringify(response))
})

app.post('/getAllForAdmin', urlencodedParser, function (req, res) {
  let startDate = req.body.startDate
  let endDate = req.body.endDate
  console.log(startDate)
  console.log(endDate)
  if (startDate == undefined) {
    models.task.findAll().then(function (data) {
      res.end(JSON.stringify(data))

    })
  }
  else {
    models.task.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate]
        }
      }
    }).then(function (data) {
      res.end(JSON.stringify(data))

    })
  }

})


app.get('*', function (req, res) {
  console.log('inside serving request');
  res.sendFile(path.join(__dirname, '/index.html'));
});


app.listen(9500, 'localhost', function (err) {
  if (err) {
    console.log('printing error::::::::::');
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:9500');
});
