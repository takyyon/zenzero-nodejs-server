const mongoose = require('mongoose');
const buyerSchema = require('./buyer.schema.server');

const buyerModel = mongoose.model('BuyerModel', buyerSchema);

module.exports = buyerModel;