const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: String,
    text: String,
    start: String,
    end: String,
    created: {type: Date, default: Date.now},
}, {collection: 'event'});

module.exports = eventSchema;