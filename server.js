var express = require('express');
var bodyParser = require('body-parser');
const yelp = require('yelp-fusion');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/hello', (req, res) => {
    res.send('Hello World!!');
});

app.listen(8080);