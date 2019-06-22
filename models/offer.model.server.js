const mongoose = require('mongoose');
const offerSchema = require('./offer.schema.server');

const offerModel = mongoose.model('OfferModel', offerSchema);

module.exports = offerModel;