const mongoose = require('mongoose');
const ownerSchema = require('./owner.schema.server');
const buyerSchema = require('./buyer.schema.server');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    created: {type: Date, default: Date.now},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'OwnerModel' },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'BuyerModel' }
}, {collection: 'user'});

module.exports = userSchema;