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
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    offers: [ { type: mongoose.Schema.Types.ObjectId, ref: 'OfferModel' } ],
    questions: [ { type: mongoose.Schema.Types.ObjectId, ref: 'QuestionModel' } ],
    events: [ { type: mongoose.Schema.Types.ObjectId, ref: 'EventModel' } ]
}, {collection: 'restaurant'});

module.exports = restaurantSchema;