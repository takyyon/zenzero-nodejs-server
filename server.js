var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
require('./models/db');

var app = express();

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'zenzero#'
 }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

 

const userController = require('./controllers/user.controller.server');
userController(app);

const restaurantController = require('./controllers/restaurant.controller.server');
restaurantController(app);

const offerController = require('./controllers/offer.controller.server');
offerController(app);

const eventController = require('./controllers/event.controller.server');
eventController(app);

const questionController = require('./controllers/question.controller.server');
questionController(app);


app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});
// app.listen(8080);