var express = require('express');
var bodyParser = require('body-parser');
const yelp = require('yelp-fusion');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const yelpService = require('./services/yelp.service.server');
yelpService(app, yelp);

app.listen(8080);