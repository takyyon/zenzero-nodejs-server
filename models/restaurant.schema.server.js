const mongoose = require('mongoose');
const eventSchema = require('./event.schema.server');
const userSchema = require('./event.schema.server');
const offerSchema = require('./offer.schema.server');
const questionSchema = require('./question.schema.server');


const restaurantSchema = mongoose.Schema({
    yelp: String,
    image: String,
    name: String,
    address: String,
    latitude: Number,
    longitude: Number,
    url: String,
    price: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' }
}, {collection: 'restaurant'});

module.exports = restaurantSchema;