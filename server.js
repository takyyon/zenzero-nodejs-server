var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
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

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'zenzero#'
 }));
 

const userController = require('./controllers/user.controller.server');
userController(app);

const restaurantController = require('./controllers/restaurant.controller.server');
restaurantController(app);

app.listen(8080);