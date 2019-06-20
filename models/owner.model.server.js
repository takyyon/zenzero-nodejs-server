const mongoose = require('mongoose');
const ownerSchema = require('./owner.schema.server');

const ownerModel = mongoose.model('OwnerModel', ownerSchema);

module.exports = ownerModel;