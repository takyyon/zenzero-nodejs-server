var express = require('express');
var bodyParser = require('body-parser');
require('./models/db');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const yelpService = require('./services/yelp.service.server');
yelpService(app);

const userController = require('./controllers/user.controller.server');
userController(app);

app.listen(8080);