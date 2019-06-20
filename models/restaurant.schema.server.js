const mongoose = require('mongoose');
const eventSchema = require('./event.schema.server');
const offerSchema = require('./offer.schema.server');
const questionSchema = require('./question.schema.server');


const restaurantSchema = mongoose.Schema({
    restaurantId: String,
    offers: [offerSchema],
    questions: [questionSchema],
    events: [eventSchema]
}, {collection: 'restaurant'});

module.exports = restaurantSchema;