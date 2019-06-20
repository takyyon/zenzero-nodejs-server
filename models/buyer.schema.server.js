const mongoose = require('mongoose');
const eventSchema = require('./event.schema.server');
const offerSchema = require('./offer.schema.server');
const questionSchema = require('./question.schema.server');

const buyerSchema = mongoose.Schema({
    offers: [offerSchema],
    questions: [questionSchema],
    events: [eventSchema]
}, {collection: 'buyer'});

module.exports = buyerSchema;