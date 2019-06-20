const mongoose = require('mongoose');

const offerSchema = mongoose.Schema({
    code: String,
    text: String,
    start: String,
    end: String,
    created: {type: Date, default: Date.now},
}, {collection: 'offer'});

module.exports = offerSchema;